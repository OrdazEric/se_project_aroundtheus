export default class UserInfo {
  constructor(nameElement, descriptionElement, avatarElement) {
    this._nameElement = nameElement;
    this._descriptionElement = descriptionElement;
    this._avatarElement = avatarElement;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._descriptionElement.textContent,
      id: this._id,
    };
  }

  setUserInfo({ name, about, _id }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._id = _id;
  }

  setAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
