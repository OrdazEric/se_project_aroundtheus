export default class UserInfo {
  constructor(titleElement, descriptionElement) {
    //
    this._titleElement = titleElement;
    this._descriptionElement = descriptionElement;
  }

  getUserInfo() {
    return {
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(title, description) {
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }
}