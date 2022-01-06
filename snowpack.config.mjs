export default {
  root: "src",
  alias: {
    "@app": "./src/app",
    "@hooks": "./src/hooks",
    "@lib": "./src/lib",
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
  },
  buildOptions: {
    out: "dist",
  },
  optimize: {
    entrypoints: [
      "index.html",
    ],
    bundle: true,
    minify: true,
    treeshake: true,
    target: "es2018",
  },
  plugins: [
    "@snowpack/plugin-postcss",
  ],
};
