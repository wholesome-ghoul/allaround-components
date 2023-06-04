import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "src/packages/*/tests/*.spec.tsx",
    excludeSpecPattern: "**/dist/**",
    port: 6969,
  },
});
