export interface ApiValidationErrors {
  message: string;
  errorMap: { [id: string]: string[] }
  errors: string[];
}

export function parseApiValidationErrors(errors?: ApiValidationErrors): string[] {
  if (errors?.errors?.length) {
    return errors.errors;
  } else if (errors.message) {
    try {
      const jsonError = JSON.parse(errors.message);
      return [jsonError.message];
    } catch (e) {
      return [errors.message];
    }
  }
}
