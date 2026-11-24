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
