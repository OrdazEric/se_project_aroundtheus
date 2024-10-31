const formValidationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  // { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  // { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  // { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  // { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  // { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  // { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const cardListEl = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = document.forms["profile-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["modal-form-card"];
const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const nameInput = document.querySelector("#profile-name-input");
const descriptionInput = document.querySelector("#profile-description-input");
const avatarEditButton = document.querySelector(".profile__edit-image-button");
const avatarEditModal = document.querySelector("#change-avatar-modal");
const avatarEditForm = document.forms["avatar-form"];

export {
  formValidationSettings,
  initialCards,
  cardListEl,
  editProfileModal,
  editProfileForm,
  addCardForm,
  addCardModal,
  addCardButton,
  profileEditButton,
  profileTitle,
  profileDescription,
  nameInput,
  descriptionInput,
  avatarEditButton,
  avatarEditModal,
  avatarEditForm
};
