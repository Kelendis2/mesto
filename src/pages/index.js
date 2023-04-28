import {initialCards,formEditProfile,formAddCard,cardTemplate,buttonEditProfile,buttonAddContentCard,options,buttonAddAvatar,formAvatar} from '../utils/constants.js'
import  PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import './index.css'
import {api} from '../components/Api.js'
import PopupWithConfirmation from '../components/PopupWithConformation.js'
let userId
// Экземпляр класса профиля
const userInfo = new UserInfo(
  {
    profileNameSelector: '.profile__info-title',
    profileInfoSelector: '.profile__info-subtitle',
    profileAvatarSelector: '.profile__avatar'
  },
);
//Запрос данных пользователя с сервера
api.getProfile()
.then (res => {
  userInfo.setUserInfo(res)
  userId = res._id;
})
// Экземпляр класса попапа профиля.
const userPopup = new PopupWithForm('.popup_type_profile',
  {submitCallback: (values)=> {
    api.editProfile(values)
    .then(res => {
      userInfo.setUserInfo(res)
    })
      userPopup.close();
    }
  }
);
userPopup.setEventListeners();
buttonEditProfile.addEventListener('click',()=>{
  userPopup.open();
  userPopup.setInputValues(userInfo.getUserInfo());
});



//Создание карточки

const createCard = (element) => {
  const cardElement = new Card (element,cardTemplate,handleCardClick,handleTrashClick);
  function handleCardClick(name, link) {
    popupImage.open(name, link);
  }
  function handleTrashClick(){
    console.log(cardElement)
    popupConformation.openConfirmation(cardElement);
  }
  return cardElement.generateCard();
};

//Удаляем карточку
const popupConformation = new PopupWithConfirmation('.popup_type_trash',{
  submitCallback: ({card}) =>{
    api.deleteCard(card.cardId)
    .then(()=>{
      card.removeCard();
      popupConformation.close();
    })
  }
})
popupConformation.setEventListeners();


// Отрисовка секции с карточками
const cardSection = new Section({
  items: [],
  renderer: (data) => {
    cardSection.addItem(createCard(data));
  },
});

// Рендер карточек с сервера
api.getInitialCards()
.then (cardList => {
  cardList.forEach(data => {
    cardSection.addItem(createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      cardId: data._id,
      ownerId: data.owner._id,
      userId: userId
    }));
  });
});
//Экземпляр попапа создания карточки
const cardPopup = new PopupWithForm('.popup_type_content',{ submitCallback: (data) => {
    api.addCard(data)
        .then((data) => {
          cardSection.addItemPrepend(createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            cardId: data._id,
            ownerId: data.owner._id,
            userId: userId
          }));
          cardPopup.close();
        })
  },
});
cardPopup.setEventListeners();

buttonAddContentCard.addEventListener('click', ()=>{
  cardPopup.open ();
  fromCardValidator.cleanValidation();
});

// Создание экзепляра  попапа картинки и открытие его.
const popupImage = new PopupWithImage('.popup_type_photo');
popupImage.setEventListeners();



//Включение валидации
const fromCardValidator = new FormValidator(options, formAddCard);
fromCardValidator.enableValidation();

const fromProfileValidator = new FormValidator(options, formEditProfile);
fromProfileValidator.enableValidation();

/*const fromAvatarValidator = new FormValidator(options, formAvatar);
fromAvatarValidator.enableValidation();*/







 // Экземпляр класса Аватара
const avatarPopup = new PopupWithForm('.popup_type_avatar',{
  submitCallback: (values)=> {
    userAvatar.setUserInfo(values);
    userPopup.close();
}
});
avatarPopup.setEventListeners();
buttonAddAvatar.addEventListener('click',() =>{
  avatarPopup.open();
})









