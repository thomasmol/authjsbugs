import "@auth/sveltekit"

declare module "@auth/sveltekit" {
  interface User {
    id: string;
  }
}