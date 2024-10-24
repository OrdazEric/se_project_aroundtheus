export default class UserInfo {
  constructor(nameElement, aboutElement, avatarElement) {
    this._nameElement = nameElement;
    this._aboutElement = aboutElement;
    this._avatarElement = avatarElement;
  }

  setUserInfo({ name, about, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._userId = _id;  // Guardamos el ID del usuario
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._aboutElement.textContent,
      _id: this._userId,  // Retornamos el ID del usuario junto a los datos
    };
  }

  getUserId() {
    return this._userId;  // Devolvemos el ID del usuario almacenado
  }

  setAvatar(avatarUrl) {
    this._avatarElement.src = avatarUrl;
  }
}
