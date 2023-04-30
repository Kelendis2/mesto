import {formEditProfile,formAddCard,cardTemplate,buttonEditProfile,buttonAddContentCard,options,buttonAddAvatar,formAvatar} from '../utils/constants.js'
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
//Получение данных с сервера
Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([promUser, promCard]) => {
    userId = promUser._id;
    userInfo.setUserInfo(promUser);
    cardSection.rendersItem(promCard);
  })
  .catch(err => console.log(err));

  // Отрисовка секции с карточками
  const cardSection = new Section({
    items: [],
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  });

// Экземпляр класса попапа профиля.
const userPopup = new PopupWithForm('.popup_type_profile',
  {submitCallback: (values)=> {
    userPopup.renderLoading(true, 'Сохранение...');
    api.editProfile(values)
    .then(res => {
      userInfo.setUserInfo(res);
      userPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      userPopup.renderLoading(false)
      });
    }
  }
);
userPopup.setEventListeners();
buttonEditProfile.addEventListener('click',()=>{
  userPopup.open();
  userPopup.setInputValues(userInfo.getUserInfo());
});

// Экземпляр класса попапа  Аватара
const avatarPopup = new PopupWithForm('.popup_type_avatar',{
  submitCallback: (data)=> {
    avatarPopup.renderLoading(true, 'Сохранение...');
    api.editAvatar(data)
    .then(res =>{
      userInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.renderLoading(false)
    });
}
});
avatarPopup.setEventListeners();
buttonAddAvatar.addEventListener('click',() =>{
  avatarPopup.open();
  fromAvatarValidator.cleanValidation();
})

//Создание карточки
const createCard = (element) => {
  const cardElement = new Card (element,cardTemplate,handleCardClick,handleTrashClick, handleToggleLike,userId);
  function handleCardClick(name, link) {
    popupImage.open(name, link);
  }
  function handleTrashClick(){
    popupConformation.openConfirmation(cardElement);
  }
   function handleToggleLike(){
    api.toggleLike(cardElement.cardId, cardElement.isLiked(cardElement.likes))
        .then(res => {
          cardElement.toggleLike(res)
        })
        .catch(err => console.log(err));
   }
  return cardElement.generateCard();
};

//Удаляем карточку
const popupConformation = new PopupWithConfirmation('.popup_type_trash',{
  submitCallback: ({card}) =>{
    popupConformation.renderLoading(true, 'Удаление...');
    api.deleteCard(card.cardId)
    .then(()=>{
      card.removeCard();
      popupConformation.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupConformation.renderLoading(false)
      });

  }
})
popupConformation.setEventListeners();

//Экземпляр попапа создания карточки
const cardPopup = new PopupWithForm('.popup_type_content',{ submitCallback: (data) => {
  cardPopup.renderLoading(true, 'Сохранение...');
    api.addCard(data)
        .then((cardElement) => {
          cardSection.addItemPrepend(createCard(cardElement));
          cardPopup.close();
        })
        .catch(err => console.log(err))
        .finally(() => {
          cardPopup.renderLoading(false)
          });

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

const fromAvatarValidator = new FormValidator(options, formAvatar);
fromAvatarValidator.enableValidation();













