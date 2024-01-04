const hasInvalidInput = (elementList) => {
  return elementList.some((element) => !element.validity.valid);
};

const toggleButtonState = (inputElements, buttonElement, settings) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage || inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    const customErrorMessage = inputElement.dataset.customError;

    if (customErrorMessage && inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, customErrorMessage, settings);
    } else {
      showInputError(formElement, inputElement, null, settings);
    }
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  if (buttonElement) {
    toggleButtonState(inputElements, buttonElement, settings);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputElements, buttonElement, settings);
      });
    });
  }
};

export const enableValidation = (settings) => {
  const formElements = Array.from(document.querySelectorAll(settings.formSelector));
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetElements = Array.from(formElement.querySelectorAll(settings.contentSelector));
    fieldsetElements.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement, settings);
    });
  });
};

export const clearValidation = (formElement, settings) => {
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  toggleButtonState(inputElements, buttonElement, settings);
};