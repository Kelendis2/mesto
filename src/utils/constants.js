export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//Формы
export const formEditProfile = document.querySelector('.form_type_profile');
export const formAddCard = document.querySelector('.form_type_content');
export const formAvatar = document.querySelector('.popup_type_avatar')

//Теплейт
export const cardTemplate = document.querySelector('.card-template');


//Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddContentCard = document.querySelector('.profile__add-button');
export const buttonAddAvatar = document.querySelector('.profile__button-avatar');


// Назначение объектов
export const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__field',
  inputInvalidClass:'form__input_invalid',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  errorSelector: '.form__input-error',
  errorClass: 'form__input-error_active',
};

