export interface ApiValidationErrors {
  message: string;
  errorMap: {[id: string]: string[]}
  errors: string[];
}
