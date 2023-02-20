const editButton = document.querySelector ('.profile__edit-button');
const popup = document.querySelector ('.popup');
const closeButton = popup.querySelector ('.popup__close-button');
const myName = document.querySelector('.profile__info-title');
const aboutPerson = document.querySelector('.profile__info-subtitle');
const myForm = document.querySelector('.form');
const formName = document.querySelector('.form__input_type_name');
const formAbout = document.querySelector('.form__input_type_about');
const handleEditButtonClick = () =>  {
  popup.classList.add('popup_opened');
  formName.value = myName.textContent;
  formAbout.value = aboutPerson.textContent;
}
const handleClose = () =>  {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', handleClose);

function handleMyFormSubmit(evt) {
  evt.preventDefault();
  myName.textContent = formName.value;
  aboutPerson.textContent = formAbout.value;
  handleClose ();

}
//buttonSave.addEventListener('click', handleMyFormSubmit);
myForm.addEventListener('submit', handleMyFormSubmit);








