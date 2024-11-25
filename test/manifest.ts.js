import { defineManifestConfig } from "flugin-manifest-config";
export default defineManifestConfig({
    name: "Plugin starter",
    id: "0000000000000000000",
    main: "./sandbox/index.js",
    ui: "./ui/index.html",
    editorType: ["figma", "figjam"],
});
// export default {
//   name: "Plugin starter",
//   id: "0000000000000000000",
//   main: "./sandbox/index.js",
//   ui: "./ui/index.html",
//   editorType: ["figma", "figjam"],
// };
