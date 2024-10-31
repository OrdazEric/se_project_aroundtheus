import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageEl = this._modalElement.querySelector(".modal__preview-image");
        this._titleEl = this._modalElement.querySelector(".modal__preview-title");
    }

    open({ name, link }) {
        this._imageEl.src = link;
        this._imageEl.alt = name;
        this._titleEl.textContent = name;
        super.open();
    }
}
