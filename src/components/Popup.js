export default class Popup {
  constructor(popupSelector) {
    this._modalElement = document.querySelector(popupSelector);
    
    if (!this._modalElement) {
      throw new Error(`Element with selector ${popupSelector} not found in the DOM`);
    }

    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._modalElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
