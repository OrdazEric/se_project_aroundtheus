const formValidationSettings = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button-disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  };
  
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
  
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];  

const cardListEl = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = document.forms["modal-form-profile"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = document.forms["modal-form-card"];


const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");


const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");


const nameInput = editProfileModal.querySelector("#profile-name-input");
const descriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
  export {
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
    formValidationSettings
  };