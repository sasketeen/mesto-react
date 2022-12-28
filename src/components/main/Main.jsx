export default function Main() {
  const handleEditAvatarClick = () => {
    const popup = document.querySelector(".popup_type_editAvatar");
    popup.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose);
    document.querySelector(".page").classList.add("page_type_openedPopup");
  };

  const handleEditProfileClick = () => {
    const popup = document.querySelector(".popup_type_editProfile");
    popup.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose);
    document.querySelector(".page").classList.add("page_type_openedPopup");
  };

  const handleAddPlaceClick = () => {
    const popup = document.querySelector(".popup_type_addCard");
    popup.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose);
    document.querySelector(".page").classList.add("page_type_openedPopup");
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatarContainer">
            <img
              src="#"
              alt="Аватар пользователя"
              className="profile__avatar"
            />
            <button
              type="button"
              className="button profile__avatarButton"
              aria-label="Редактировать аватар"
              onClick={handleEditAvatarClick}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button
              className="button profile__editButton"
              type="button"
              aria-label="Редактировать профиль"
              onClick={handleEditProfileClick}
            ></button>
            <p className="profile__description"></p>
          </div>
        </div>
        <button
          className="button profile__addButton"
          type="button"
          aria-label="Добавить фото"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}
