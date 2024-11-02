export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  // Método privado para manejar todas las solicitudes y el procesamiento de respuestas
  _request(url, options) {
      return fetch(url, options).then(this._processResponse);
  }

  _processResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
      return this._request(`${this._baseUrl}/users/me`, {
          headers: this._headers,
      });
  }

  setUserInfo({ name, about }) {
      return this._request(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({ name, about }),
      });
  }

  getInitialCards() {
      return this._request(`${this._baseUrl}/cards`, {
          headers: this._headers,
      });
  }

  createCard({ name, link }) {
      return this._request(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({ name, link }),
      });
  }

  deleteCard(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}`, {
          method: "DELETE",
          headers: this._headers,
      });
  }

  addLike(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "PUT",
          headers: this._headers,
      });
  }

  removeLike(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: "DELETE",
          headers: this._headers,
      });
  }

  changeAvatar(avatarUrl) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({ avatar: avatarUrl }),
      });
  }
}
