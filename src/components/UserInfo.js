export default class UserInfo {
  constructor({ profileNameSelector, profileInfoSelector}) {
    this._userName = document.querySelector(profileNameSelector);
    this._userInfo = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    };
  }

  setUserInfo({ name, about}) {
    this._userName.textContent = name;
    this._userInfo.textContent = about;
  }
}
