export default class Popup {
    constructor(popupSelector) {
      this.modalElement = document.querySelector(popupSelector); // Asegúrate de que esto esté bien definido
      this.closeButton = this.modalElement.querySelector(".modal__close");
  
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this.modalElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this.modalElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    setEventListeners() {
      this.closeButton.addEventListener("click", () => {
        this.close();
      });
      this.modalElement.addEventListener("click", (evt) => {
        if (evt.target === this.modalElement) {
          this.close();
        }
      });
    }
  }
  