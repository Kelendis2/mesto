const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_profile');
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__close-button_place_profile');
const popupAddContentCard = document.querySelector('.popup_type_content');
const buttonClosePopupAddCard = document.querySelector('.popup__close-button_place_content');
const userName = document.querySelector('.profile__info-title');
const userDescription = document.querySelector('.profile__info-subtitle');
const formEditProfile = document.querySelector('.form');
const formEditNameProfile = document.querySelector('.form__input_type_name');
const formEditDescroptionProfile = document.querySelector('.form__input_type_about');
const buttonAddContentCard = document.querySelector('.profile__add-button');
const popupOpenZoomPhoto = document.querySelector('.popup_type_photo');
const buttonClosePopupOpenZoomPhoto = document.querySelector('.popup__close-button_place_photo');
const itemListWrapper = document.querySelector('.element');
const cardTemplate = document.querySelector('.card-template');
const formAddCard = document.querySelector('.form_type_content');
const inputCardPhoto = document.querySelector('form__input_type_link');
const inputCardTitle = document.querySelector('form__input_type_title');
const popupZoomImg = document.querySelector('.popup__photo-zoom');
const popupZoomImgCopyright = popupOpenZoomPhoto.querySelector('.popup__copyright');
const openPopup = (popup) => {
	popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
};

const togglelikeButton = (evt) => {
	evt.target.classList.toggle('element__like_activ');
};

const handleTrash = (evt) => {
	evt.target.closest('.element__item').remove();
	evt.preventDefault();
};

const createCard = (data) => {
	const cardElement = cardTemplate.content.cloneNode(true);
	const cardPhoto = cardElement.querySelector('.element__photo');
	cardPhoto.src = data.link;
	cardPhoto.alt = data.title;
	cardPhoto.addEventListener('click', (evt) => {
		evt.preventDefault();
		popupZoomImg.src = cardPhoto.src;
		popupZoomImg.alt = cardTitle.textContent;
		popupZoomImgCopyright.textContent = cardTitle.textContent;
		openPopup(popupOpenZoomPhoto);
	});
	const cardTitle = cardElement.querySelector('.element__title');
	cardTitle.textContent = data.title;
	const buttonTrash = cardElement.querySelector('.element__trash');
	buttonTrash.addEventListener('click', handleTrash);
	const cardLike = cardElement.querySelector('.element__like');
	cardLike.addEventListener('click', togglelikeButton);
	return cardElement;
};

const renderCard = (element) => {
	itemListWrapper.prepend(createCard(element));
};

function handleFormEditProfileSubmit(evt) {
	evt.preventDefault();
	userName.textContent = formEditNameProfile.value;
	userDescription.textContent = formEditDescroptionProfile.value;
	closePopup(popupEditProfile);
};

formAddCard.addEventListener('submit', (evt) => {
	evt.preventDefault();
	renderCard({
		title: evt.target.title.value,
		link: evt.target.link.value,
	})
	closePopup(popupAddContentCard);
	evt.target.reset();
});

initialCards.forEach((element) => {
	itemListWrapper.append(createCard(element));
});

buttonEditProfile.addEventListener('click', (evt) => {
	evt.preventDefault();
	formEditNameProfile.value = userName.textContent;
	formEditDescroptionProfile.value = userDescription.textContent;
	openPopup(popupEditProfile);
});

buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonAddContentCard.addEventListener('click', () => openPopup(popupAddContentCard));
buttonClosePopupAddCard.addEventListener('click', () => closePopup(popupAddContentCard));
buttonClosePopupOpenZoomPhoto.addEventListener('click', () => closePopup(popupOpenZoomPhoto));
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
