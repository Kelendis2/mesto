import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,{submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
  }
  _getInputValues () {
    this._formValues = {};
    this._inputs.forEach(
      (input) => {
        this._formValues[input.name] = input.value
      });
    return this._formValues;
  }

  setInputValues(userData) {
    this._inputs.forEach((input) => {
      input.value = userData[input.name];

    });
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
  close(){
    super.close();
    this._form.reset();
  }
}

