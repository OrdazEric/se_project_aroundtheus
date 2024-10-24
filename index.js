// Importamos las imágenes
import "../pages/index.css";
import logo from '../images/logo.svg';
import avatar from '../images/jacques-cousteau.png';
import editIcon from '../images/Edit_pencil.svg';

// Asignamos las imágenes a los elementos HTML correspondientes
document.querySelector('.header__logo').src = logo;
document.querySelector('.profile__image').src = avatar;
document.querySelector('.profile__edit-image-icon').src = editIcon;

// Importamos los módulos y clases necesarios
import { 
    cardListEl,
    editProfileForm,
    addCardForm,
    addCardButton,
    profileEditButton,
    profileTitle,
    profileDescription,
    nameInput,
    descriptionInput,
    formValidationSettings,
    initialCards
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

// Instanciamos la API
export const api = new Api({
    baseUrl: 'https://around-api.en.tripleten-services.com/v1',
    headers: {
        authorization: '0424f10c-244b-497e-9d48-9865212a1b68',
        'Content-Type': 'application/json'
    }
});

// Instanciamos la clase UserInfo para manejar el perfil
const userInfo = new UserInfo(profileTitle, profileDescription, document.querySelector('.profile__image'));

// Cargar la información del usuario y las tarjetas al iniciar la aplicación
api.getUserInfo().then(userData => {
    userInfo.setUserInfo(userData); // Actualiza el nombre, descripción y guarda el ID
    document.querySelector('.profile__image').src = userData.avatar; // Actualiza la imagen de perfil
}).catch(err => console.error('Error loading user info:', err));

// Inicializamos `section` con las tarjetas predeterminadas (`initialCards`)
let section = new Section(
    {
        items: initialCards,  // Tarjetas cargadas de `constants.js`
        renderer: createCard
    },
    ".cards__list"
);

// Renderizamos las tarjetas predeterminadas de `constants.js`
section.renderItems();

// Luego, renderizamos las tarjetas obtenidas de la API
api.getInitialCards().then(cardsData => {
    cardsData.forEach(cardData => {
        const cardElement = createCard(cardData);
        section.addItem(cardElement);  // Agregamos las tarjetas obtenidas de la API a la misma sección
    });
}).catch(err => console.error('Error loading cards:', err));

// Función para crear una tarjeta
function createCard(cardData) {
    const card = new Card(
        {
            name: cardData.name,
            link: cardData.link,
            _id: cardData._id,
            likes: cardData.likes,
            owner: cardData.owner
        },
        "#card-template", 
        handleImageClick, 
        handleDeleteCard,
        userInfo.getUserId() // Obtenemos el ID del usuario actual para gestionar los likes
    );
    const cardElement = card.getView();
    return cardElement;
}

// Definimos `handleImageClick` para abrir el popup con la imagen de la tarjeta
function handleImageClick(cardData) {
    imageModal.open(cardData); // Abrimos el popup de imagen
}

// Popup de imagen para las tarjetas
const imageModal = new PopupWithImage("#modal__preview-card");
imageModal.setEventListeners();

// Función para manejar el envío del formulario de editar perfil
function handleProfileFormSubmit(userData) {
    const title = userData.title;
    const description = userData.description;

    api.setUserInfo({ name: title, about: description })
        .then(updatedData => {
            userInfo.setUserInfo(updatedData); // Actualizamos los datos en el DOM
            profileModal.close();  // Cerrar el modal
        })
        .catch(err => console.error('Error updating profile:', err));
}

// Validación del formulario de edición del perfil
const profileFormValidator = new FormValidator(formValidationSettings, editProfileForm);
profileFormValidator.enableValidation();

// Popup para editar el perfil
const profileModal = new PopupWithForm("#profile-edit-modal", handleProfileFormSubmit);
profileModal.setEventListeners();

// Evento para abrir el popup de editar perfil
profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.title;
    descriptionInput.value = userData.description;
    profileModal.open();
});

// Función para manejar el envío del formulario de agregar tarjeta
function handleAddCardFormSubmit(inputData) {
    const cardData = {
        name: inputData.title,
        link: inputData.url,
    };

    // Llamada a la API para crear una tarjeta
    api.createCard(cardData)
        .then((newCard) => {
            const newCardElement = createCard(newCard);  // Crea la tarjeta en el DOM
            section.addItem(newCardElement);  // Agrega la tarjeta creada a la sección
            newCardModal.close();  // Cierra el popup
            addCardForm.reset();  // Resetea el formulario
            addCardFormValidator.disableSubmitButton();  // Desactiva el botón de envío
        })
        .catch((err) => console.error("Error creating card:", err));
}

// Validación del formulario de agregar tarjeta
const addCardFormValidator = new FormValidator(formValidationSettings, addCardForm);
addCardFormValidator.enableValidation();

// Popup para agregar nuevas tarjetas
const newCardModal = new PopupWithForm("#add-card-modal", handleAddCardFormSubmit);
newCardModal.setEventListeners();

// Evento para abrir el modal de agregar tarjeta
addCardButton.addEventListener("click", () => {
    newCardModal.open();
});

// Popup de confirmación para eliminar una tarjeta
const deleteCardPopup = new PopupWithConfirmation("#confirm-delete-modal");
deleteCardPopup.setEventListeners();

function handleDeleteCard(cardId, cardElement) {
    deleteCardPopup.open(() => {
        api.deleteCard(cardId)
            .then(() => {
                cardElement.remove();  // Eliminamos el elemento del DOM
                deleteCardPopup.close();  // Cerramos el popup
            })
            .catch(err => console.error('Error deleting card:', err));
    });
}

// Función para validar URL
function isValidUrl(url) {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocolo
        '((([a-zA-Z0-9$-_@.&+!*\\(\\),]|(%[0-9a-fA-F]{2}))+)+)'+ // dominio
        '(\\:[0-9]{2,5})?' + // puerto (opcional)
        '(\\/[-a-zA-Z0-9()@:%_+.~#?&/=]*)?$', 'i');
    return !!urlPattern.test(url);
}

// Validación del formulario de avatar
const avatarFormValidator = new FormValidator(formValidationSettings, document.querySelector('#modal-form-avatar'));
avatarFormValidator.enableValidation();

// Evento para abrir el modal de cambio de imagen de perfil
const editAvatarButton = document.querySelector('.profile__edit-image-button'); // Botón para editar imagen de perfil
const changeAvatarModal = new PopupWithForm("#change-avatar-modal", (inputData) => {
    const avatarUrl = inputData.url; // Obtenemos el valor del campo con name="url"

    if (isValidUrl(avatarUrl)) {  // Aseguramos que la URL sea válida
        // Enviamos la URL a la API
        api.setUserAvatar(avatarUrl)
            .then((updatedUser) => {
                document.querySelector('.profile__image').src = updatedUser.avatar; // Actualizamos la imagen en el DOM
                changeAvatarModal.close(); // Cerramos el popup
            })
            .catch(err => console.error('Error updating avatar:', err));
    } else {
        console.error('URL no válida.');  // Mensaje si la URL no es válida
        avatarFormValidator._showInputError(document.querySelector('#avatar-url-input')); // Mostramos error en el campo
    }
});

editAvatarButton.addEventListener('click', () => {
    changeAvatarModal.open(); // Abrimos el popup para cambiar la imagen de perfil
});

changeAvatarModal.setEventListeners();
