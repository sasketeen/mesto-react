import Footer from "./Footer/Footer";
import Header from "./Header/header";
import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

function App() {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />

      <PopupWithForm name="editAvatar" title="Обновить аватар">
        <input
          type="url"
          className="popup__input"
          id="avatarInput"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error avatarInput-error"></span>
      </PopupWithForm>
      {/* <div className="popup popup_type_editAvatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <button
            className="button popup__closeButton"
            type="button"
            name="close"
          ></button>
          <form method="post" className="popup__form editAvatarForm" novalidate>
            <input
              type="url"
              className="popup__input"
              id="avatarInput"
              name="avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__error avatarInput-error"></span>
            <button type="submit" className="button popup__saveButton">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
      <PopupWithForm name="editProfile" title="Редактировать профиль">
        <input
          type="text"
          className="popup__input"
          id="usernameInput"
          name="username"
          minlength="2"
          maxlength="40"
          required
        />
        <span className="popup__error usernameInput-error"></span>
        <input
          type="text"
          className="popup__input"
          id="descriptionInput"
          name="description"
          minlength="2"
          maxlength="200"
          required
        />
        <span className="popup__error descriptionInput-error"></span>
      </PopupWithForm>
      {/* <div className="popup popup_type_editProfile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <button
            className="button popup__closeButton"
            type="button"
            name="close"
          ></button>
          <form
            method="post"
            className="popup__form editProfileForm"
            novalidate
          >
            <input
              type="text"
              className="popup__input"
              id="usernameInput"
              name="username"
              minlength="2"
              maxlength="40"
              required
            />
            <span className="popup__error usernameInput-error"></span>
            <input
              type="text"
              className="popup__input"
              id="descriptionInput"
              name="description"
              minlength="2"
              maxlength="200"
              required
            />
            <span className="popup__error descriptionInput-error"></span>
            <button type="submit" className="button popup__saveButton">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}
      <PopupWithForm name="addCard" title="Новое место">
        <input
          type="text"
          className="popup__input"
          id="nameInput"
          name="name"
          placeholder="Название"
          minlength="2"
          maxlength="30"
          required
        />
        <span className="popup__error nameInput-error"></span>
        <input
          type="url"
          className="popup__input"
          id="linkInput"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error linkInput-error"></span>
      </PopupWithForm>
      {/* <div className="popup popup_type_addCard">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <button
            className="button popup__closeButton"
            type="button"
            name="close"
          ></button>
          <form method="post" className="popup__form addCardForm" novalidate>
            <input
              type="text"
              className="popup__input"
              id="nameInput"
              name="name"
              placeholder="Название"
              minlength="2"
              maxlength="30"
              required
            />
            <span className="popup__error nameInput-error"></span>
            <input
              type="url"
              className="popup__input"
              id="linkInput"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error linkInput-error"></span>
            <button type="submit" className="button popup__saveButton">
              Сохранить
            </button>
          </form>
        </div>
      </div> */}

      <PopupWithForm name="confirm" title="Вы уверены?"></PopupWithForm>
      {/* <div className="popup popup_type_confirm">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <button
            className="button popup__closeButton"
            type="button"
            name="close"
          ></button>
          <form className="popup__form">
            <button type="submit" className="button popup__saveButton">
              Да
            </button>
          </form>
        </div>
      </div> */}
      <ImagePopup></ImagePopup>
      {/* <div className="popup popup_type_image">
        <div className="popup__image-container">
          <button
            className="button popup__closeButton"
            type="button"
            name="close"
            aria-label="Закрыть"
          ></button>
          <figure className="popup__figure">
            <img src="#" alt="" className="popup__image" />
            <figcaption className="popup__subtitle"></figcaption>
          </figure>
        </div>
      </div> */}

      <template className="cardCopy">
        <li className="card">
          <button
            className="button card__buttonDelete"
            type="button"
            name="delete"
          ></button>
          <img src="#" alt="" className="card__image" />
          <div className="card__description">
            <h2 className="card__subtitle"></h2>
            <div className="card__likeContainer">
              <button
                className="button card__likeButton"
                type="button"
                name="like"
                aria-label="Like"
              ></button>
              <span className="card__likeCounter"></span>
            </div>
          </div>
        </li>
      </template>
    </div>
  );
}

export default App;
