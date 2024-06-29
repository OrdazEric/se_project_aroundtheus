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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector('.modal__form');
const previewImageModal = document.querySelector('#modal__preview-card');

// Buttons And Nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = profileEditModal.querySelector("#modal-close-button");
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
const profileName = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const addNewCardButton = document.querySelector('.profile__add-button');
const previewCloseButton = previewImageModal.querySelector('.modal__close');
const previewCardTitle = document.querySelector('.modal__preview-title');
const previewImage = document.querySelector('.modal__preview-image');

// Data
const profileNameInput = profileEditModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileEditModal.querySelector("#profile-description-input");
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');



function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
}

function fillProfileForm() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
}

function renderCard(cardData, cardListEl) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardNameEl = cardElement.querySelector(".card__title");
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteCardButton = cardElement.querySelector('.card__delete-button');

    deleteCardButton.addEventListener('click', () => cardElement.remove());

    cardImageEl.addEventListener('click', () => {
        previewImage.src = cardData.link;
        previewCardTitle.textContent = cardData.name;
        previewImage.alt = cardData.name;
        openModal(previewImageModal);
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });

    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    cardNameEl.textContent = cardData.name;
    return cardElement;
}

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closeModal(profileEditModal);
}

function handleAddCardSubmit(ev) {
    ev.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link }, cardListEl);
    closeModal(addCardModal);
}

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

profileEditButton.addEventListener("click", () => {
    fillProfileForm();
    openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () => closeModal(profileEditModal));
previewCloseButton.addEventListener('click', () => closeModal(previewImageModal));

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
