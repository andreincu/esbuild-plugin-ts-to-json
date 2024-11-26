import { defineManifestConfig } from "flugin-manifest-config";

export default defineManifestConfig({
  name: "Plugin starter",
  id: "333",
  main: "./sandbox/index.js",
  ui: "./ui/index.html",
  editorType: ["figma", "figjam"],
});
