export interface FormValidator {
  titleInput: InputValidator;
  dueDateInput: InputValidator;
}

export interface InputValidator {
  field: HTMLElement;
  isValid: boolean;
}
