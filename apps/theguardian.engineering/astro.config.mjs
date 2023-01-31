import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import { defineConfig } from "astro/config";
// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default defineConfig({
  integrations: [react(), svelte()],
  build: {
    site: "https://theguardian.engineering/",
    format: "file",
  },
});
