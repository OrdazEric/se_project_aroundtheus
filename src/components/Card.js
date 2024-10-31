export default class Card {
    constructor({ cardData, cardSelector, handleImageClick, handleDeleteClick, userId, handleLikeButton }) {
        this._name = cardData.name;
        this._link = cardData.link;
        this._isLiked = cardData.isLiked || false;
        this._cardId = cardData._id;
        this._userId = userId;
        this._ownerId = cardData.owner._id;
        this._handleImageClick = handleImageClick;
        this._handleDeleteClick = handleDeleteClick;
        this._cardSelector = cardSelector;
        this._handleLikeButton = handleLikeButton;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    _toggleLike() {
        this._likeButton.classList.toggle("card__like-button_active");
    }

    updateLikes(isLiked) {
        this._isLiked = isLiked;
        this._toggleLike();
    }

    _setEventListeners() {
        this._cardImage.addEventListener("click", () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });

        this._likeButton.addEventListener("click", () => {
            this._isLiked = !this._isLiked;
            this._handleLikeButton(this._cardId, this._isLiked);
            this.updateLikes(this._isLiked);
        });

        if (this._userId === this._ownerId) {
            this._deleteButton.addEventListener("click", () => {
                this._handleDeleteClick(this._cardId, this._element);
            });
        } else {
            this._deleteButton.remove();
        }
    }

    getView() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardTitle = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();
        if (this._isLiked) this._toggleLike();
        return this._element;
    }
}
