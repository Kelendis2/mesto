class FormValidator {
    constructor (options, form){
      this._form = form;
      this._options = options;
      this._submitElement = this._form.querySelector(this._options.submitButtonSelector);
      this._inputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));
  }
  _hideError (inputElement) {
    inputElement.classList.remove(this._options.inputInvalidClass);
    this._getErrorElement(inputElement).classList.remove(this._options.errorClass);
    this._getErrorElement(inputElement).textContent = '';
  };
  _showError (errorElement,inputElement) {
    inputElement.classList.add(this._options.inputInvalidClass);
    this._getErrorElement(inputElement).classList.add(this._options.errorClass);
    this._getErrorElement(inputElement).textContent = inputElement.validationMessage;
  };
  _enableButton () {
    this._submitElement.removeAttribute('disabled');
    this._submitElement.classList.remove(this._options.inactiveButtonClass);
  };
  _disabledButton () {
    this._submitElement.disabled = 'true';
    this._submitElement.classList.add(this._options.inactiveButtonClass);
  };
  _getErrorElement(inputElement) {
    return this._form.querySelector(`.${inputElement.id}-error`)
  }
  _toggleButtonState () {
    const formIsValid = this._inputs.every((inputElement) => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButton();
    } else {
      this._disabledButton();
    }
  };
  _toggleErrorState (inputElement) {
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(this._options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(this._options.errorSelector);
    if (isValid) {
      this._hideError(errorElement,inputElement);
    }
    else {
      this._showError(errorElement,inputElement);
    }
  };
  cleanValidation() {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
  _setEventListeners (form)  {
    this._toggleButtonState ();
    this._inputs.forEach((inputElement, i) => {
      inputElement.addEventListener('input', () => {
        this._toggleErrorState(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation ()  {
    const form = this._form;
    this._setEventListeners(form);
  };

}
export default FormValidator;














