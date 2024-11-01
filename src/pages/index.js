// Importamos estilos e imágenes
import "../pages/index.css";
import logo from '../images/logo.svg';
import avatar from '../images/jacques-cousteau.png';
import editIcon from '../images/Edit_pencil.svg';

document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').src = avatar;
document.querySelector('.profile__edit-image-icon').src = editIcon;

import { 
    editProfileForm,
    addCardForm,
    addCardButton,
    profileEditButton,
    profileTitle,
    profileDescription,
    nameInput,
    descriptionInput,
    formValidationSettings
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const api = new Api({
    baseUrl: 'https://around-api.en.tripleten-services.com/v1',
    headers: {
        authorization: "77f6fa17-673a-40ba-89df-6b222f24f8b5",
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(profileTitle, profileDescription, document.querySelector('.profile__image'));

// Inicializar perfil
api.getUserInfo()
    .then(userData => {
        userInfo.setUserInfo(userData);
        userInfo.setAvatar(userData.avatar); 
    })
    .catch(err => console.error('Error loading user info:', err));

// Crear cards usando el método renderItems de Section
const section = new Section(
    {
        items: [],
        renderer: (cardData) => {
            const cardElement = createCard(cardData);
            if (cardElement) {
                section.addItem(cardElement);
            }
        }
    },
    ".cards__list"
);

api.getInitialCards()
    .then(cardsData => {
        section._items = cardsData; // Asignar datos obtenidos a _items
        section.renderItems(); // Renderizar tarjetas usando renderItems
    })
    .catch(err => console.error('Error loading cards from API:', err));

function createCard(cardData) {
    const card = new Card({
        cardData,
        cardSelector: "#card-template",
        handleImageClick,
        handleDeleteClick: (cardId, cardElement) => handleDeleteCard(cardId, cardElement),
        userId: userInfo.getUserInfo()._id,
        handleLikeButton: (cardId, isLiked) => handleLikeClick(cardId, isLiked)
    });
    return card.getView();
}

const imageModal = new PopupWithImage("#modal__preview-card");
imageModal.setEventListeners();

function handleImageClick(cardData) {
    imageModal.open(cardData);
}

const profileModal = new PopupWithForm("#profile-edit-modal", (data) => {
    profileModal.renderLoading(true);
    api.setUserInfo({ name: data.title, about: data.description })
        .then(updatedData => {
            userInfo.setUserInfo(updatedData);
            profileModal.close(); // Cierre solo tras respuesta exitosa
        })
        .catch(err => console.error("Error updating profile:", err))
        .finally(() => profileModal.renderLoading(false));
});

profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    descriptionInput.value = userData.about;
    profileModal.open();
    profileFormValidator.resetValidation(); // Resetear validación al abrir el modal
});

const newCardModal = new PopupWithForm("#add-card-modal", (data) => {
    newCardModal.renderLoading(true);
    api.createCard({ name: data.title, link: data.url })
        .then((newCardData) => {
            const cardElement = createCard(newCardData);
            section.addItem(cardElement);
            newCardModal.close();
        })
        .catch(err => console.error("Error creating card:", err))
        .finally(() => newCardModal.renderLoading(false));
});

newCardModal.setEventListeners();
addCardButton.addEventListener("click", () => {
    newCardModal.open();
    addCardFormValidator.resetValidation(); // Resetear validación al abrir el modal
});

const deleteCardPopup = new PopupWithConfirmation("#confirm-delete-modal");
deleteCardPopup.setEventListeners();

function handleDeleteCard(cardId, cardElement) {
    deleteCardPopup.open(() => {
        api.deleteCard(cardId)
            .then(() => {
                cardElement.remove();
                deleteCardPopup.close();
            })
            .catch(err => console.error("Error deleting card:", err));
    });
}

const avatarModal = new PopupWithForm("#change-avatar-modal", (data) => {
    avatarModal.renderLoading(true, "Updating avatar...");
    api.changeAvatar(data.url)
        .then((updatedData) => {
            userInfo.setAvatar(updatedData.avatar);
            avatarModal.close();
        })
        .catch((err) => console.error("Error updating avatar:", err))
        .finally(() => avatarModal.renderLoading(false));
});

avatarModal.setEventListeners();

document.querySelector(".profile__edit-image-button").addEventListener("click", () => {
    avatarModal.open();
    avatarFormValidator.resetValidation(); // Resetear validación al abrir el modal
});

function handleLikeClick(cardId, isLiked) {
    return isLiked
        ? api.removeLike(cardId).then(() => false) // Devuelve false cuando se remueve el like
        : api.addLike(cardId).then(() => true); // Devuelve true cuando se agrega el like
}

const profileFormValidator = new FormValidator(formValidationSettings, editProfileForm);
const addCardFormValidator = new FormValidator(formValidationSettings, addCardForm);
const avatarFormValidator = new FormValidator(formValidationSettings, document.querySelector("#modal-form-avatar"));

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
