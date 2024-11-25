import { defineManifestConfig } from "flugin-manifest-config";

export default defineManifestConfig({
  name: "Plugin starter",
  id: "000",
  main: "./sandbox/index.js",
  ui: "./ui/index.html",
  editorType: ["figma", "figjam"],
});
