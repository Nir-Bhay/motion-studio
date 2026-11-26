import { Config } from "@remotion/cli/config";

// Render defaults: high-quality H.264, JPEG frames (fast), audio AAC-ready output.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");

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
