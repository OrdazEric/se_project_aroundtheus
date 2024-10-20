import { api } from '../pages/index.js';  // Aseguramos que api esté disponible en Card.js

export default class Card {
    constructor({ name, link, _id, likes = [] }, cardSelector, handleImageClick, handleDeleteCard) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likes = likes;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteCard = handleDeleteCard;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardTemplate;
    }

    _handleLikeIcon() {
        const isLiked = this._likeButton.classList.contains("card__like-button_active");

        if (isLiked) {
            api.removeLike(this._id)
                .then(updatedCard => {
                    this._likes = updatedCard.likes || [];  // Aseguramos que `likes` siempre sea un array
                    this._updateLikesView();
                })
                .catch(err => console.error("Error removing like:", err));
        } else {
            api.addLike(this._id)
                .then(updatedCard => {
                    this._likes = updatedCard.likes || [];  // Aseguramos que `likes` siempre sea un array
                    this._updateLikesView();
                })
                .catch(err => console.error("Error adding like:", err));
        }
    }

    _updateLikesView() {
        this._likeCountElement.textContent = this._likes.length || 0;  // Aseguramos que `length` sea válido
        this._likeButton.classList.toggle("card__like-button_active", this._likes.some(like => like._id === userInfo.getUserId()));
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleLikeIcon());
        this._deleteButton.addEventListener("click", () => this._handleDeleteCard(this._id, this._element));
        this._cardImage.addEventListener("click", () => this._handleImageClick({ name: this._name, link: this._link }));
    }

    getView() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector(".card__image");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._likeCountElement = this._element.querySelector(".card__like-count");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector(".card__title").textContent = this._name;

        this._updateLikesView(); // Actualizamos los likes
        this._setEventListeners(); // Configuramos los eventos

        return this._element;
    }
}
