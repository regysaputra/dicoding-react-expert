import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "kcxkam",
  allowCypressEnv: false,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
