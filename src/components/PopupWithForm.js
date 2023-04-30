import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector,{submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputs = Array.from(this._form.querySelectorAll('.form__input'));
    this._buttonSubmit = this._popup.querySelector('.form__button-save');
    this.defaultText = this._buttonSubmit.textContent;
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
      // Метод отображения загрузки
      renderLoading(isLoading, loadingText) {

        if (isLoading) {
          this._buttonSubmit.textContent = loadingText;
        } else {
          this._buttonSubmit.textContent = this.defaultText;

        }
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

