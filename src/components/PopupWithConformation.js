import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  // Открытие попапа с айди
  openConfirmation(card) {
    super.open();
    this.cardId = card.cardId;
    this.card = card;
  }

  // Слушатель
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitCallback(this);
    });
  }
}
