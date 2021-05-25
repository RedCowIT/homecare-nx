export function assertTrue(condition: boolean, message?: string) {
  if (!condition) {
    throw new Error(message)
  }
}

export function assertNonNull(subject: any, message?: string) {
  if (!subject) {
    throw new Error(message)
  }
}
