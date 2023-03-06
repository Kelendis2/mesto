const hiddenError = (errorElement, errorClass) => {
  imputElement.classList.remove(errorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const showError = (errorElement, message, errorClass) => {
  imputElement.classList.add(errorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = message;
};

const enabelButton = (buttonSubmit, inactiveButtonClass) => {
  buttonSubmit.disabled = '';
  buttonSubmit.classList.remove(inactiveButtonClass);
};

const disabledButton = (buttonSubmit, inactiveButtonClass) => {
  buttonSubmit.disabled = 'true';
  buttonSubmit.classList.add(inactiveButtonClass);
};

const toggleButtonState = (imputs, buttonSubmit, options) => {
  const formIsValid = imputs.every((imputElement) => imputElement.validity.valid);
  if (formIsValid) {
    enabelButton(buttonSubmit, inactiveButtonClass);
  } else {
    disabledButton(buttonSubmit, inactiveButtonClass);
  }
};

const toggleEroroState = (imputElement, options) => {
  const isValid = imputElement.validity.valid;
  const imputSectionElement = imputElement.closest(options.inputSectionSelector);
  const errorElement = imputSectionElement.querySelector(options.inputErrorClass);
  if (isValid) {
    hiddenError(errorElement, options.errorClass);
  } else {
    showError(errorElement, imputElement.validationMessage, options.errorClass);
  }
};

const setEventListeners = (form, options) => {
  const buttonSubmit = form.querySelector(options.submitButtonSelector);
  const imputs = Array.from(form.querySelectorAll(options.inputSelector));

  imputs.forEach((imputElement, i) => {
    imputElement.addEventListener('input', () => {
      toggleEroroState(imputElement, options);
      toggleButtonState(imputs, buttonSubmit, options.inactiveButtonClass);
    });
  });
  toggleButtonState(imputs, buttonSubmit, options.inactiveButtonClass);
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};

const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__field',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: '.form__button-save_inactive',
  inputErrorClass: 'form__inpute-error',
  errorClass: 'form__input-error_active',
};

enableValidation(options);
