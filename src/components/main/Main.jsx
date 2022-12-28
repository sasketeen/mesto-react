export default function Main(props) {
  const {onEditProfile, onAddPlace, onEditAvatar} = props;

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
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name"></h1>
            <button
              className="button profile__editButton"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description"></p>
          </div>
        </div>
        <button
          className="button profile__addButton"
          type="button"
          aria-label="Добавить фото"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list"></ul>
      </section>
    </main>
  );
}
