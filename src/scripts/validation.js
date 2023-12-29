const hasInvalidInput = (elementList) => {
  return elementList.some((element) => !element.validity.valid);
};

const toggleButtonState = (inputElements, buttonElement) => {
  if (hasInvalidInput(inputElements)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage || inputElement.validationMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    const customErrorMessage = inputElement.dataset.customError;

    if (customErrorMessage && inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, customErrorMessage);
    } else {
      showInputError(formElement, inputElement);
    }
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  if (buttonElement) {
    toggleButtonState(inputElements, buttonElement);

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputElements, buttonElement);
      });
    });
  }
};

export const enableValidation = () => {
  const formElements = Array.from(document.querySelectorAll('.popup'));
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetElements = Array.from(formElement.querySelectorAll('.popup__content'));
    fieldsetElements.forEach((fieldsetElement) => {
      setEventListeners(fieldsetElement);
    });
  });
};

export const clearValidation = (formElement) => {
  const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputElements.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputElements, buttonElement);
};