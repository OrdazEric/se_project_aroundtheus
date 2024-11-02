import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this.modalElement?.querySelector(".modal__preview-image");
    this.imageTitleElement = this.modalElement?.querySelector(".modal__preview-title");

    if (!this.imageElement || !this.imageTitleElement) {
      console.error(`Error: No se pudo encontrar el elemento de imagen o título en el popup ${popupSelector}`);
    }
  }

  open({ name, link }) {
    if (this.imageElement && this.imageTitleElement) {
      this.imageElement.src = link;
      this.imageElement.alt = name;
      this.imageTitleElement.textContent = name;
    }
    super.open();
  }
}
