 import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector){
    super (popupSelector);
    this._popupImg = this._popup.querySelector('.popup__photo-zoom');
    this._popupTitle = this._popup.querySelector('.popup__copyright');
  }

  open(name, link) {
    super.open();
    this._popupTitle.textContent = name;
    this._popupImg.alt = name;
    this._popupImg.src = link;
  }
  close(){
    super.close();
  }
}
