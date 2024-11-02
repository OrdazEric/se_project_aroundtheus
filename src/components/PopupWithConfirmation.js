import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.confirmButton = this.modalElement?.querySelector(".modal__button");
  }

  open(handleConfirm) {
    this.handleConfirm = handleConfirm;
    super.open();
  }

  setEventListeners() {
    if (this.confirmButton) {
      this.confirmButton.addEventListener("click", () => {
        if (typeof this.handleConfirm === "function") {
          this.handleConfirm();
        } else {
          console.error("Error: handleConfirm no es una función");
        }
      });
    }
    super.setEventListeners();
  }
}
