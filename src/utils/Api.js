import { apiConfig } from "./apiConfig";

/**
 * Класс выполнения и обработки запросов на сервер
 */
class Api {
  /**
   * @param {Obect} конфиг API, serverLink - адрес сервера headers - заголовок запросов
   */
  constructor({ serverLink, headers }) {
    this._serverLink = serverLink;
    this._headers = headers;
  }

  /**
   * Функция проверки ответа
   * @param {Object} response - ответ от сервера
   * @param {String} functionName - название метода API, из которого вызывается данная функция
   * @returns {Promise} промис с объектом JSON или отклоненный промис
   */
  _gotResponse(response, functionName) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error in ${functionName}: ${response.status}`);
  }

  /**
   * Функция получения начальных карточек с сервера
   * @returns {Promise} промис с массивом карточек
   */
  getCards() {
    return fetch(`${this._serverLink}/cards`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "getCards"));
  }

  /**
   * Функция получения информации о пользователе с сервера
   * @returns {Promise} промис с объектом текущего пользователя или ошибкой
   */
  getUserInfo() {
    return fetch(`${this._serverLink}/users/me`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "getUserInfo"));
  }

  /**
   * Функция редактирования информации о пользователе на сервере
   * @param {object} объект с новыми параметрами пользователя, username - имя пользователя description - описание
   * @returns {Promise} промис с обновленным объектом текущего пользователя или ошибкой
   */
  editUserInfo({ username, description }) {
    return fetch(`${this._serverLink}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: description,
      }),
    }).then((response) => this._gotResponse(response, "editUserInfo"));
  }

  /**
   * Функция изменения аватара на сервере
   * @param {object} объект со ссылкой на новый аватар, avatar - сылка на аватар
   * @returns {Promise} промис с обновленным объектом текущего пользователя или ошибкой
   */
  editAvatar({ avatar }) {
    return fetch(`${this._serverLink}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((response) => this._gotResponse(response, "editAvatar"));
  }

  /**
   * Функция добавления новой карточки на сервер
   * @param {Object} объект с данными карточки, name - название карточки link - ссылка на картинку
   * @returns {Promise} промис с объектом новой карточки или ошибкой
   */
  addCard({ name, link }) {
    return fetch(`${this._serverLink}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => this._gotResponse(response, "addCard"));
  }

  /**
   * Функция удаления карточки на сервер
   * @param {string} cardId - уникальный ID карточки
   * @returns {Promise} промис с объектом удаленной карточки или ошибкой
   */
  deleteCard(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "deleteCard"));
  }

  /**
   * Функция добавления лайка на сервере
   * @param {string} cardId - уникальный ID карточки
   * @returns {Promise} промис с объектом обновленной карточки или ошибкой
   */
  addLike(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "addLike"));
  }

  /**
   *Функция удаления лайка на сервере
   * @param {string} cardId - уникальный ID карточки
   * @returns {Promise} промис с объектом обновленной карточки или ошибкой
   */
  removeLike(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "removeLike"));
  }
}

/**
 * @exports экземпляр класса API
 */
export default new Api(apiConfig);
