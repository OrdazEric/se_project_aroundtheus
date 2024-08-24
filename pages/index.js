import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const formValidationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
}, {name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
}, {name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
}, {name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
}, {name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
}, {name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
}];

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", openPicturePopup);
  return card.getView();
}

const profileEditForm = document.forms["profile-form"];
const addCardForm = document.forms["card-form"];
const profileEditButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector('.profile__add-button');
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector('#add-card-modal');
const previewImageModal = document.querySelector('#modal__preview-card');
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = profileEditModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileEditModal.querySelector("#profile-description-input");
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = document.querySelector('.modal__input_type_url');



const profileEditModalForm = document.forms["modal-form-profile"];
const addCardModalForm = document.forms["modal-form-card"];
const popUpImage = document.querySelector(".modal__preview-image");
const popUpTitle = document.querySelector(".modal__preview-title");
const allModals = document.querySelectorAll(".modal");
const profileCloseButton = profileEditModal.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector('#add-modal-close');
const previewCloseButton = previewImageModal.querySelector('.modal__close');
//const previewCardTitle = document.querySelector('.modal__preview-title');
//const previewImage = document.querySelector('.modal__preview-image');

const profileFormValidator = new FormValidator(
  formValidationSettings,
  profileEditForm
);
const cardFormValidator = new FormValidator(
  formValidationSettings,
  addCardForm
);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

profileEditButton.addEventListener("click", () => {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileFormValidator.resetValidation();
    openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileFormValidator.disableButton();
  closeModal(profileEditModal);
});

allModals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const openPicturePopup = (imageSrc, imageTitle) => {
  popUpImage.src = imageSrc;
  popUpImage.alt = imageTitle;
  popUpTitle.textContent = imageTitle;

  openModal(previewImageModal);
};


initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardListEl.append(cardElement);
});

previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardModalForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = cardTitleInput.value;
  const url = cardUrlInput.value;
  const cardElement = createCard({ name: title, link: url });
  cardListEl.prepend(cardElement);
  cardFormValidator.disableButton();
  addCardModalForm.reset();
  closeModal(addCardModal);
});