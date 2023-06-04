import { defineConfig } from "cypress";
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';

export default defineConfig({
  video: false,
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: "src/packages/*/tests/*.spec.tsx",
    excludeSpecPattern: "**/dist/**",
    port: 6969,
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
    }
  },
});
