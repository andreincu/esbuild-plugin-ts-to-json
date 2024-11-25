interface Manifest {
  name: string;
  description: string;
  freeze: boolean;
}

function defineManifestConfig(config: Manifest) {
  return config;
}

export default defineManifestConfig({
  name: "Manifest",
  description: "Test the manifest file",
  freeze: true,
});
