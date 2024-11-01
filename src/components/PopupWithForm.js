import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");

    console.log("Formulario seleccionado:", this._popupForm); // Verifica si se selecciona el formulario
    console.log("Botón de submit seleccionado:", this._submitButton); // Verifica si el botón es seleccionado
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Función para habilitar o deshabilitar el botón de envío
  _toggleSubmitButtonState() {
    const isFormValid = this._popupForm.checkValidity();
    if (isFormValid) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.remove("modal__button_disabled");
    } else {
      this._submitButton.setAttribute("disabled", "true");
      this._submitButton.classList.add("modal__button_disabled");
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
      console.log("Formulario enviado"); // Verificar que el envío se activa
      this._handleFormSubmit(this._getInputValues());
    });

    // Detecta cambios en los inputs para actualizar el estado del botón
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => this._toggleSubmitButtonState());
    });

    super.setEventListeners();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this._submitButton.textContent = isLoading ? loadingText : this._submitButtonText;
  }

  open() {
    super.open();
    this._toggleSubmitButtonState(); // Restablece el estado del botón al abrir el modal
  }

  close() {
    this._popupForm.reset();
    this._toggleSubmitButtonState(); // Restablece el estado del botón al cerrar el modal
    super.close();
  }
}
