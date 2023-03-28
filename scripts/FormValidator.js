class FormValidator {
    constructor (options, form, submitElement){
      this._form = form;
      this._options = options;
      this._submitElement = submitElement;
  }
  _hideError (errorElement,imputElement) {
    imputElement.classList.remove(this._options.imputInvalidClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  };
  _showError = (errorElement,imputElement) => {
    imputElement.classList.add(this._options.imputInvalidClass);
    errorElement.classList.add(this._options.errorClass);
    errorElement.textContent = imputElement.validationMessage;
  };
  _enabelButton = () => {
    this._submitElement.removeAttribute('disabled');
    this._submitElement.classList.remove(this._options.inactiveButtonClass);
  };
  _disabledButton = () => {
    this._submitElement.disabled = 'true';
    this._submitElement.classList.add(this._options.inactiveButtonClass);
  };
  _toggleButtonState = (imputs, buttonSubmit) => {
    const formIsValid = imputs.every((imputElement) => imputElement.validity.valid);
    if (formIsValid) {
      this._enabelButton(buttonSubmit);
    } else {
      this._disabledButton(buttonSubmit);
    }
  };
  _toggleEroroState = (imputElement) => {
    const isValid = imputElement.validity.valid;
    const imputSectionElement = imputElement.closest(this._options.inputSectionSelector);
    const errorElement = imputSectionElement.querySelector(this._options.errorSelector);
    if (isValid) {
      this._hideError(errorElement,imputElement);
    }
    else {
      this._showError(errorElement,imputElement);
    }
  };
  _setEventListeners = (form) => {
    const buttonSubmit = form.querySelector(this._options.submitButtonSelector);
    const imputs = Array.from(form.querySelectorAll(this._options.inputSelector));
    this._toggleButtonState (imputs, buttonSubmit);
    imputs.forEach((imputElement, i) => {
      imputElement.addEventListener('input', () => {
        this._toggleEroroState(imputElement);
        this._toggleButtonState(imputs, buttonSubmit);
      });
    });

  };

  enableValidation = () => {
    const form = this._form;
    this._setEventListeners(form);
  };

}
export default FormValidator;














