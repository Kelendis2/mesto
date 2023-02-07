const editButton = document.querySelector ('.profile__edit-button');
const popup = document.querySelector ('.popup');
const closeButton = popup.querySelector ('.form__close-button');


const handleEditButtonClick = () =>  {
  popup.classList.add('popup__opened');
}
const handleCloseButtonClick = () =>  {
  popup.classList.remove('popup__opened');
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);

let myName = document.querySelector('.profile__info-title');
let aboutPerson = document.querySelector('.profile__info-subtitle');
let myForm = document.querySelector('.form');
let buttonSave = document.querySelector ('.form__button-save');
let formName = document.querySelector('.form__input_name');
let formAbout = document.querySelector('.form__input_about');

function handleMyFormSubmit(evt) {
  evt.preventDefault();
  myName.textContent = formName.value;
  aboutPerson.textContent = formAbout.value;
}
buttonSave.addEventListener('click', handleMyFormSubmit);

const likeButton = document.querySelector ('.element__like');

const togglelikeButton = () =>  {
  likeButton.classList.toggle ('element__like_activ');
}
likeButton.addEventListener ('click', togglelikeButton);








