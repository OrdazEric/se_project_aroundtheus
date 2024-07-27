function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInputs(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
  return;
}

function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
  return;
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass }
) {
  if (hasInvalidInputs(inputElements)) {
    enableButton(submitButton, { inactiveButtonClass });
  } else {
    disableButton(submitButton, { inactiveButtonClass });
  }
}

function setEventListners(formElement, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);