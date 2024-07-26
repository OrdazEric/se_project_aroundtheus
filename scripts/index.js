const initialCards = [{name: "Yosemite Valley",
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

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

// Elements
const cardListEl = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector('#add-card-modal');
const profileEditForm = profileEditModal.querySelector("#modal-form-profile");
const addCardFormElement = addCardModal.querySelector('#modal-form-card');
const previewImageModal = document.querySelector('#modal__preview-card');

// Buttons And Nodes
const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditModal.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector('#add-modal-close');
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const addNewCardButton = document.querySelector('.profile__add-button');
const previewCloseButton = previewImageModal.querySelector('.modal__close');
const previewCardTitle = document.querySelector('.modal__preview-title');
const previewImage = document.querySelector('.modal__preview-image');

// Data
const profileNameInput = profileEditModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileEditModal.querySelector("#profile-description-input");
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');
const allModals = document.querySelectorAll(".modal");

//Functions

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
    openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

allModals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListEl.append(cardElement);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const popUpImage = document.querySelector(".modal__preview-image");
  const popUpTitle = document.querySelector(".modal__preview-title");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardImageElement.addEventListener("click", () => {
    openModal(previewImageModal);
    popUpImage.src = data.link;
    popUpImage.alt = data.name;
    popUpTitle.textContent = data.name;
  });

  cardTitleElement.textContent = data.name;
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  return cardElement;
}

previewCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardFormElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  addCardFormElement.reset();
  closeModal(addCardModal);
});