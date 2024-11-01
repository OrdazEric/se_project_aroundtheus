import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Modificación para verificar la validez del formulario completo
  _toggleSubmitButtonState() {
    const isFormValid = this._popupForm.checkValidity();
    if (isFormValid) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove("button--disabled");
    } else {
      this._submitButton.setAttribute("disabled", "true");
      this._submitButton.classList.add("button--disabled");
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
    this._toggleSubmitButtonState(); // Asegura que el botón esté en el estado correcto al abrir el popup
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    
    // Listener para verificar el estado del botón en cada cambio de input
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._toggleSubmitButtonState());
    });

    super.setEventListeners();
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading ? "Saving..." : this._submitButtonText;
  }

  close() {
    this._popupForm.reset();
    this._toggleSubmitButtonState(); // Asegura que el botón vuelva a estar deshabilitado
    super.close();
}

}
