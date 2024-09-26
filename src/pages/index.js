import "../pages/index.css";

import {initialCards,
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
  formValidationSettings,
} from "../utils/constants.js";

import FormValidator from "../components/FormValidator.js";

import Card from "../components/Card.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list"
);

section.renderItems();


function createCard(data) {
  const cardElement = getCardElement(data);
  section.addItem(cardElement);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(cardData) {
  imageModal.open(cardData);
}

function handleAddCardFormSubmit(inputData) {
  const cardData = {
    name: inputData.title,
    link: inputData.url,
  };

  createCard(cardData);
  newCardModal.close();
  addCardForm.reset();
  addCardFormValidator.disableSubmitButton();
}

function handleProfileFormSubmit(userData) {
  const title = userData.title;
  const description = userData.description;
  userInfo.setUserInfo(title, description);
  profileModal.close();
}

const userInfo = new UserInfo(profileTitle, profileDescription);


profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.title;
  descriptionInput.value = userData.description;
  profileFormValidator.resetValidation();
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});


const addCardFormValidator = new FormValidator(formValidationSettings, addCardForm);
const profileFormValidator = new FormValidator(
  formValidationSettings,
  editProfileForm
);

addCardFormValidator.enableValidation();
profileFormValidator.enableValidation();


const imageModal = new PopupWithImage("#modal__preview-card");

imageModal.setEventListeners();


const newCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

newCardModal.setEventListeners();


const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);

profileModal.setEventListeners();