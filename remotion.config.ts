import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";

// Render defaults: best-quality H.264, high-quality JPEG frames, crisp AAC audio.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCrf(16);
Config.setAudioBitrate("320k");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");

// Use preinstalled headless Chromium in sandbox so Studio Render never tries downloading chrome-headless-shell.
if (existsSync("/tmp/chromium")) {
  Config.setBrowserExecutable("/tmp/chromium");
}

// Prevent mid-session lazyCompilation rebuilds & noisy directory watching in Studio.
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    experiments: {
      ...currentConfiguration.experiments,
      lazyCompilation: false,
    },
    watchOptions: {
      ...currentConfiguration.watchOptions,
      aggregateTimeout: 300,
      ignored: /(?:^|[\\/])(?:\.git|\.turbo|node_modules|productions|public|scripts|docs)[\\/]/,
    },
  };
});
