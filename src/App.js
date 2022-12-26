import logo from'./images/logo.svg'
function App() {
  return (
    <div className="page">

      <header className="header">
        <img src={logo} alt="Логотип" className="logo"/>
      </header>

      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatarContainer">
              <img src="#" alt="Аватар пользователя" className="profile__avatar"/>
              <button type="button" className="button profile__avatarButton" aria-label="Редактировать аватар"></button>
            </div>
            <div className="profile__info">
              <h1 className="profile__name"></h1>
              <button className="button profile__editButton" type="button" aria-label="Редактировать профиль"></button>
              <p className="profile__description"></p>
            </div>
          </div>
          <button className="button profile__addButton" type="button" aria-label="Добавить фото"></button>
        </section>

        <section className="elements">
          <ul className="elements__list">
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy; 2022 Mesto Russia</p>
      </footer>

      <div className="popup popup_type_editAvatar">
        <div className="popup__container">
          <h2 className="popup__title">Обновить аватар</h2>
          <button className="button popup__closeButton" type="button" name="close"></button>
          <form method="post" className="popup__form editAvatarForm" novalidate>
            <input type="url" className="popup__input" id="avatarInput" name="avatar" placeholder="Ссылка на аватар" required/>
            <span className="popup__error avatarInput-error"></span>
            <button type="submit" className="button popup__saveButton">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_editProfile">
        <div className="popup__container">
          <h2 className="popup__title">Редактировать профиль</h2>
          <button className="button popup__closeButton" type="button" name="close"></button>
          <form method="post" className="popup__form editProfileForm" novalidate>
            <input type="text" className="popup__input" id="usernameInput" name="username" minlength="2" maxlength="40" required/>
            <span className="popup__error usernameInput-error"></span>
            <input type="text" className="popup__input" id="descriptionInput" name="description" minlength="2" maxlength="200" required/>
            <span className="popup__error descriptionInput-error"></span>
            <button type="submit" className="button popup__saveButton">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_addCard">
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <button className="button popup__closeButton" type="button" name="close"></button>
          <form method="post" className="popup__form addCardForm" novalidate>
            <input type="text" className="popup__input" id="nameInput" name="name" placeholder="Название" minlength="2" maxlength="30" required/>
            <span className="popup__error nameInput-error"></span>
            <input type="url" className="popup__input" id="linkInput" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__error linkInput-error"></span>
            <button type="submit" className="button popup__saveButton">Сохранить</button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_image">
        <div className="popup__image-container">
          <button className="button popup__closeButton" type="button" name="close" aria-label="Закрыть"></button>
          <figure className="popup__figure">
            <img src="#" alt="" className="popup__image"/>
            <figcaption className="popup__subtitle"></figcaption>
          </figure>
        </div>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__container">
          <h2 className="popup__title">Вы уверены?</h2>
          <button className="button popup__closeButton" type="button" name="close"></button>
          <form className="popup__form">
            <button type="submit" className="button popup__saveButton">Да</button>
          </form>
        </div>
      </div>

      <template className="cardCopy">
        <li className="card">
          <button className="button card__buttonDelete" type="button" name="delete"></button>
          <img src="#" alt="" className="card__image"/>
          <div className="card__description">
            <h2 className="card__subtitle"></h2>
            <div className="card__likeContainer">
              <button className="button card__likeButton" type="button" name="like" aria-label="Like"></button>
              <span className="card__likeCounter"></span>
            </div>
          </div>
        </li>
      </template>

    </div>
  );
}

export default App;
