import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._modalElement.querySelector('.modal__button');
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._handleConfirm();
      this.close();
    });

    super.setEventListeners();
  }
}
