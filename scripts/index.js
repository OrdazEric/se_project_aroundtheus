let firstcard = {name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
};

let secondCard = {name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
};

let thirdCard = {name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
};

let fourthCard = {name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
};

let fifthCard = {name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
};

let sixthCard = {name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
};

let initialCards = [firstcard, secondCard, thirdCard, fourthCard, fifthCard, sixthCard];
console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const profileCloseButton = document.querySelector(".modal__close");

profileEditButton.addEventListener("click", () => {
    profileEditModal.classList.add("modal__opened");
});

profileCloseButton.addEventListener("click", () => {
    profileEditModal.classList.remove("modal__opened");
});
