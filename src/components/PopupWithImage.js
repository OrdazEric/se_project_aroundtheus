import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageEl = this._modalElement.querySelector(".modal__preview-image");
    this._titleEl = this._modalElement.querySelector(".modal__preview-title");
  }

  open(cardData) {
    this._imageEl.src = cardData.link;
    this._imageEl.alt = cardData.name;
    this._titleEl.textContent = cardData.name;

    super.open();
  }
}