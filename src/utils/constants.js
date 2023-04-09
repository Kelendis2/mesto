const initialCards = [
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

const formEditProfile = document.querySelector('.form_type_profile');
const formAddCard = document.querySelector('.form_type_content');
const cardTemplate = document.querySelector('.card-template');

// Назначение объектов
const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputSectionSelector: '.form__field',
  imputInvalidClass:'form__input_invalid',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  errorSelector: '.form__inpute-error',
  errorClass: 'form__input-error_active',
};

