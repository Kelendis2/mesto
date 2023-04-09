class FormValidator {
    constructor (options, form){
      this._form = form;
      this._options = options;
      this._submitElement = this._form.querySelector(this._options.submitButtonSelector);
      this._imputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
  }
  _hideError (errorElement,imputElement) {
    imputElement.classList.remove(this._options.imputInvalidClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  };
  _showError (errorElement,imputElement) {
    imputElement.classList.add(this._options.imputInvalidClass);
    errorElement.classList.add(this._options.errorClass);
    errorElement.textContent = imputElement.validationMessage;
  };
  _enableButton () {
    this._submitElement.removeAttribute('disabled');
    this._submitElement.classList.remove(this._options.inactiveButtonClass);
  };
  _disabledButton () {
    this._submitElement.disabled = 'true';
    this._submitElement.classList.add(this._options.inactiveButtonClass);
  };
  _toggleButtonState () {
    const formIsValid = this._imputs.every((imputElement) => imputElement.validity.valid);
    if (formIsValid) {
      this._enableButton();
    } else {
      this._disabledButton();
    }
  };
  _toggleErrorState (imputElement) {
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
  _setEventListeners (form)  {
    this._toggleButtonState ();
    this._imputs.forEach((imputElement, i) => {
      imputElement.addEventListener('input', () => {
        this._toggleErrorState(imputElement);
        this._toggleButtonState();
      });
    });
  };
  cleanValidation() {
    this._toggleButtonState();
    this._imputs.forEach((inputElement) => {
      this._hideError(errorElement,imputElement);
    });
  }

  enableValidation ()  {
    const form = this._form;
    this._setEventListeners(form);
  };

}
export default FormValidator;














