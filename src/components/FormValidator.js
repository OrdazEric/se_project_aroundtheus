export default class FormValidator {
  constructor(settings, formElement) {
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;

    this.form = formElement;
    this.inputEls = [...this.form.querySelectorAll(this.inputSelector)];
    this.submitButton = this.form.querySelector(this.submitButtonSelector);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this.form.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this.errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this.form.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _hasInvalidInput() {
    return !this.inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
      return;
    }
    this.enableSubmitButton();
  }

  _setEventListeners() {
    this.inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableSubmitButton() {
    this.submitButton.classList.remove(this.inactiveButtonClass);
    this.submitButton.disabled = false;
  }

  disableSubmitButton() {
    this.submitButton.classList.add(this.inactiveButtonClass);
    this.submitButton.disabled = true;
  }

  resetValidation() {
    this._toggleButtonState();
    this.inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
