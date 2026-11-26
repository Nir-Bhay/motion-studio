import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const validateFile = path.join(
  root,
  "node_modules/@remotion/studio-server/dist/preview-server/validate-same-origin.js"
);
if (existsSync(validateFile)) {
  const src = readFileSync(validateFile, "utf8");
  const target = "if (originUrl.origin !== `http://${host}`) {";
  const replacement =
    "if (originUrl.origin !== `http://${host}` && originUrl.origin !== `https://${host}`) {";
  if (src.includes(target)) {
    writeFileSync(validateFile, src.replace(target, replacement));
    console.log("Patched validate-same-origin.js for HTTPS reverse proxy.");
  }
}

const originPolicyFile = path.join(
  root,
  "node_modules/@remotion/studio-server/dist/preview-server/studio-protocol/origin-policy.js"
);
if (existsSync(originPolicyFile)) {
  const src = readFileSync(originPolicyFile, "utf8");
  const target = "refererUrl.origin === `http://${host}`";
  const replacement =
    "(refererUrl.origin === `http://${host}` || refererUrl.origin === `https://${host}`)";
  if (src.includes(target) && !src.includes(replacement)) {
    writeFileSync(originPolicyFile, src.replace(target, replacement));
    console.log("Patched origin-policy.js for HTTPS reverse proxy.");
  }
}

const liveEventsFile = path.join(
  root,
  "node_modules/@remotion/studio-server/dist/preview-server/live-events.js"
);
if (existsSync(liveEventsFile)) {
  let src = readFileSync(liveEventsFile, "utf8");
  let changed = false;
  if (!src.includes("'x-accel-buffering': 'no'")) {
    src = src.replace(
      "'cache-control': 'no-cache',",
      "'cache-control': 'no-cache',\n            'x-accel-buffering': 'no',"
    );
    changed = true;
  }
  if (!src.includes("flushHeaders")) {
    src = src.replace(
      "        response.writeHead(200, headers);\n        response.write('\\n');",
      "        response.writeHead(200, headers);\n        if (typeof response.flushHeaders === 'function') { response.flushHeaders(); }\n        response.write(': ' + ' '.repeat(2048) + '\\n\\n');"
    );
    changed = true;
  }
  if (!src.includes("': ping\\n\\n'")) {
    src = src.replace(
      "        clients.push(newClient);",
      "        clients.push(newClient);\n        const pingTimer = setInterval(() => { try { response.write(': ping\\n\\n'); } catch (_e) {} }, 5000);"
    );
    src = src.replace(
      "        request.on('close', () => {",
      "        request.on('close', () => {\n            clearInterval(pingTimer);"
    );
    changed = true;
  } else if (src.includes("}, 15000);")) {
    src = src.replace("}, 15000);", "}, 5000);");
    changed = true;
  }
  if (changed) {
    writeFileSync(liveEventsFile, src);
    console.log("Patched live-events.js with SSE keepalive, padding & no-buffering.");
  }
}

const routesFile = path.join(
  root,
  "node_modules/@remotion/studio-server/dist/routes.js"
);
if (existsSync(routesFile)) {
  let src = readFileSync(routesFile, "utf8");
  let changed = false;
  const target = "    response.setHeader('content-type', 'text/html');";
  const replacement =
    "    response.setHeader('content-type', 'text/html');\n    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');\n    response.setHeader('Pragma', 'no-cache');";
  if (src.includes(target) && !src.includes("no-store, no-cache, must-revalidate, max-age=0")) {
    src = src.replace(target, replacement);
    changed = true;
  }
  const htmlTarget = "        studioRuntimeConfig: getStudioRuntimeConfig(),\n    }));";
  const htmlReplacement =
    "        studioRuntimeConfig: getStudioRuntimeConfig(),\n    }).replace('src=\"/bundle.js\"', `src=\"/bundle.js?v=${hash}\"`));";
  if (src.includes(htmlTarget) && !src.includes("/bundle.js?v=${hash}")) {
    src = src.replace(htmlTarget, htmlReplacement);
    changed = true;
  }
  if (changed) {
    writeFileSync(routesFile, src);
    console.log("Patched routes.js to disable caching on index.html & cache-bust bundle.js.");
  }
}

const devMiddlewareFile = path.join(
  root,
  "node_modules/@remotion/studio-server/dist/preview-server/dev-middleware/middleware.js"
);
if (existsSync(devMiddlewareFile)) {
  let src = readFileSync(devMiddlewareFile, "utf8");
  const target = "            if (!res.getHeader('Accept-Ranges')) {";
  const replacement =
    "            if (!res.getHeader('Cache-Control')) {\n                (0, compatible_api_1.setHeaderForResponse)(res, 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');\n                (0, compatible_api_1.setHeaderForResponse)(res, 'Pragma', 'no-cache');\n            }\n            if (!res.getHeader('Accept-Ranges')) {";
  if (src.includes(target) && !src.includes("no-store, no-cache, must-revalidate, max-age=0")) {
    src = src.replace(target, replacement);
    writeFileSync(devMiddlewareFile, src);
    console.log("Patched dev-middleware/middleware.js to disable caching on bundle.js & HMR assets.");
  }
}

const studioEsmEventsFile = path.join(
  root,
  "node_modules/@remotion/studio/dist/esm/index-kwxewaaz.mjs"
);
if (existsSync(studioEsmEventsFile)) {
  let src = readFileSync(studioEsmEventsFile, "utf8");
  const oldBlock = `var openEventSource = () => {
  if (source) {
    return;
  }
  source = new EventSource("/events");
  source.addEventListener("message", (event) => {
    try {
      const newEvent = JSON.parse(event.data);
      dispatch(newEvent);
    } catch {}
  });
  source.addEventListener("open", () => {
    source?.addEventListener("error", () => {
      connectionState = { type: "disconnected" };
      notifyConnectionState();
      source?.close();
      source = null;
      setTimeout(() => {
        openEventSource();
      }, 1000);
    }, { once: true });
  });
};`;
  const newBlock = `var disconnectNoticeTimer = null;
var reconnectAttempts = 0;
var openEventSource = () => {
  if (source) {
    return;
  }
  source = new EventSource("/events");
  source.addEventListener("message", (event) => {
    try {
      const newEvent = JSON.parse(event.data);
      if (newEvent.type === "init" && disconnectNoticeTimer) {
        clearTimeout(disconnectNoticeTimer);
        disconnectNoticeTimer = null;
      }
      reconnectAttempts = 0;
      dispatch(newEvent);
    } catch {}
  });
  source.addEventListener("open", () => {
    reconnectAttempts = 0;
    if (disconnectNoticeTimer) {
      clearTimeout(disconnectNoticeTimer);
      disconnectNoticeTimer = null;
    }
  });
  source.addEventListener("error", () => {
    source?.close();
    source = null;
    if (!disconnectNoticeTimer && connectionState.type === "connected") {
      disconnectNoticeTimer = setTimeout(() => {
        disconnectNoticeTimer = null;
        if (!source || source.readyState !== 1) {
          connectionState = { type: "disconnected" };
          notifyConnectionState();
        }
      }, 6000);
    }
    const delay = Math.min(5000, 1000 + reconnectAttempts * 1000);
    reconnectAttempts += 1;
    setTimeout(() => {
      openEventSource();
    }, delay);
  }, { once: true });
};`;
  if (src.includes(oldBlock)) {
    src = src.replace(oldBlock, newBlock);
    writeFileSync(studioEsmEventsFile, src);
    console.log("Patched @remotion/studio ESM EventSource reconnect/debounce for proxy stability.");
  }
}

const studioEsmHmrFile = path.join(
  root,
  "node_modules/@remotion/studio/dist/esm/index-8rkngfmh.mjs"
);
if (existsSync(studioEsmHmrFile)) {
  let src = readFileSync(studioEsmHmrFile, "utf8");
  const oldReloadBlock = `    if (options.warn) {
      console.warn("[Fast refresh] Update check failed: " + (err.stack || err.message));
      reloadUrl();
    }
  }
  function performReload() {
    if (!reload) {
      return;
    }
    if (options.warn)
      console.warn("[Fast refresh] Reloading page");
    reloadUrl();
  }`;
  const newReloadBlock = `    if (options.warn) {
      console.warn("[Fast refresh] Update check failed: " + (err.stack || err.message));
      performReload();
    }
  }
  function performReload() {
    if (!reload) {
      return;
    }
    try {
      const key = "remotion.lastHmrReloadAt";
      const last = Number(window.sessionStorage.getItem(key) || "0");
      if (Date.now() - last < 15000) {
        console.warn("[Fast refresh] Suppressed rapid reload loop.");
        return;
      }
      window.sessionStorage.setItem(key, String(Date.now()));
    } catch {}
    if (options.warn)
      console.warn("[Fast refresh] Reloading page");
    reloadUrl();
  }`;
  if (src.includes(oldReloadBlock)) {
    src = src.replace(oldReloadBlock, newReloadBlock);
    writeFileSync(studioEsmHmrFile, src);
    console.log("Patched @remotion/studio ESM HMR reload loop guard.");
  }
}
