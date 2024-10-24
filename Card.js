import { api } from '../pages/index.js';  // Aseguramos que api esté disponible en Card.js

export default class Card {
    constructor({ name, link, _id, likes = 0, owner }, cardSelector, handleImageClick, handleDeleteCard, currentUserId) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._likesCount = likes;  // Inicializamos el contador con el valor inicial de likes (si existe)
        this._owner = owner;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleDeleteCard = handleDeleteCard;
        this._currentUserId = currentUserId;
        this._isLiked = false;  // Estado del like inicial
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardTemplate;
    }

    // Manejo de likes
    _handleLikeIcon() {
        if (this._isLiked) {
            // Si el usuario ya ha dado like, lo elimina
            api.removeLike(this._id)
                .then(() => {
                    console.log("Like removed.");
                    if (this._likesCount > 0) {
                        this._likesCount--;  // Disminuimos el contador de likes
                    }
                    this._isLiked = false;  // El usuario ha quitado su like
                    this._updateLikesView();
                })
                .catch(err => console.error("Error removing like:", err));
        } else {
            // Si el usuario no ha dado like, lo añade
            api.addLike(this._id)
                .then(() => {
                    console.log("Like added.");
                    this._likesCount++;  // Aumentamos el contador de likes
                    this._isLiked = true;  // El usuario ha dado like
                    this._updateLikesView();
                })
                .catch(err => console.error("Error adding like:", err));
        }
    }

    // Actualización de la vista de likes
    _updateLikesView() {
        console.log("Updating likes view. Total likes:", this._likesCount);  // Log para depuración
        this._likeCountElement.textContent = this._likesCount;  // Actualizamos el contador manualmente

        // Cambiar el estado del botón según si el usuario ha dado like
        this._likeButton.classList.toggle("card__like-button_active", this._isLiked);
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

        this._updateLikesView();  // Actualizamos la vista al cargar
        this._setEventListeners();  // Configuramos los eventos

        return this._element;
    }
}
