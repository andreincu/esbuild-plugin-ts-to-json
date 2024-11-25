interface Manifest {
  name: string;
  description: string;
  freeze: boolean;
}

export default {
  name: "Manifest",
  description: "Test the manifest file",
  freeze: true,
} satisfies Manifest;
