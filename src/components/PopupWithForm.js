import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.popupForm = this.modalElement.querySelector(".modal__form");
    this.handleFormSubmit = handleFormSubmit;
    this.submitButton = this.popupForm.querySelector(".modal__button");
    this.submitButtonText = this.submitButton.textContent;
    this.inputList = this.popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this.formValues = {};
    this.inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
    });
    return this.formValues;
  }

  setEventListeners() {
    this.popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });

    this.inputList.forEach((input) => {
      input.addEventListener("input", () => this.toggleSubmitButtonState());
    });

    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this.submitButton.textContent = isLoading ? loadingText : this.submitButtonText;
  }

  open() {
    super.open();
    this.toggleSubmitButtonState();
  }

  close() {
    this.popupForm.reset();
    super.close();
  }

  toggleSubmitButtonState() {
    const isFormValid = this.popupForm.checkValidity();
    if (isFormValid) {
      this.submitButton.removeAttribute("disabled");
      this.submitButton.classList.remove("modal__button_disabled");
    } else {
      this.submitButton.setAttribute("disabled", "true");
      this.submitButton.classList.add("modal__button_disabled");
    }
  }
}
