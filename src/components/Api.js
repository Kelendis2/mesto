
export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getProfile(){
     return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`))
    .catch(console.log)
  };
  getInitialCards(){
    return fetch(`${this._baseUrl}/cards`,{
     headers: this._headers
   })
   .then(res => res.ok ? res.json() : Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`))
   .catch(console.log)
 };
 editProfile({name,about}){
  return fetch(`${this._baseUrl}/users/me `,{
    method: "PATCH",
    headers: this._headers,
    body: JSON.stringify({
      name,
      about
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`))
  .catch(console.log)
 }
 addCard({name,about}){
  return fetch(`${this._baseUrl}/cards`,{
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Что-то где-то пошло не так... Код ошибки ${res.status}`))
  .catch(console.log)
 }
}
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co./v1/cohort-64',
  headers: {
    authorization: '4c274032-0b3e-4759-b4b1-a9d64f1dfaf8',
    'Content-Type': 'application/json'
  }
});


