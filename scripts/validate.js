const hiddenError = (errorElement, errorClass) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const showError = (errorElement, message, errorClass) => {
  errorElement.classList.add(errorClass);
  errorElement.textContent = message;
};

const enabelButton = (buttonSubmit, inactiveButtonClass) => {
  buttonSubmit.removeAttribute('disabled');
  buttonSubmit.classList.remove(inactiveButtonClass);
};

const disabledButton = (buttonSubmit, inactiveButtonClass) => {
  buttonSubmit.disabled = 'true';
  buttonSubmit.classList.add(inactiveButtonClass);
};

const toggleButtonState = (imputs, buttonSubmit, inactiveButtonClass) => {
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
  const errorElement = imputSectionElement.querySelector(options.errorSelector);
  if (isValid) {
    imputElement.classList.remove(options.imputInvalidClass);
    hiddenError(errorElement, options.errorClass);
  } else {
    imputElement.classList.add(options.imputInvalidClass);
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

};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};
