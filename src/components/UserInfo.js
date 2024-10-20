export default class UserInfo {
  constructor(titleElement, descriptionElement) {
    this._titleElement = titleElement;
    this._descriptionElement = descriptionElement;
  }

  // Obtener la información del usuario desde el DOM
  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  // Establecer la información del usuario en el DOM
  setUserInfo(title, description) {
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}
