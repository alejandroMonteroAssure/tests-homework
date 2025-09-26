export function getUserGreeting(name?: string): string {
  if (name) {
    return `Hello ${name}!`;
  } else {
    return "Hello user!";
  }
}