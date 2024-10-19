export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Obtener las tarjetas iniciales
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Obtener la información del usuario
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Actualizar la información del usuario
    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._checkResponse);
    }

    // Actualizar el avatar del usuario
    setUserAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarUrl  // Asegúrate de enviar el campo "avatar"
            })
        })
        .then(this._checkResponse);
    }
    

    // Crear una nueva tarjeta
    createCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    // Eliminar una tarjeta
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Añadir un like a una tarjeta
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Quitar un like de una tarjeta
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponse);
    }

    // Método para revisar la respuesta del servidor
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }
}
