import { useContext } from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";

/**
 * Компонент основного контента
 * @param {object} props - пропсы:
 * - cards - карточки
 * - onEditProfile - функция обработчик клика по кнопке редактирования профиля
 * - onAddPlace - функция обработчик клика по кнопке добавления карточки
 * - onEditAvatar - функция обработчик клика по кнопке редактирования аватара
 * - onClickImage - функция обработчик клика по фото
 * - onClickLike - функция обработчик клика по лайку
 * - onClickDelete - функция обработчик удаления карточки
 */
  export default function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onClickImage,
    onClickLike,
    onClickDelete,
  }) {
    //стейт
    const currentUser = useContext(CurrentUserContext);

    return (
      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatarContainer">
              <img
                src={currentUser.avatar}
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
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="button profile__editButton"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
              <p className="profile__description">{currentUser.about}</p>
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
          <ul className="elements__list">
            {cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onClickImage={onClickImage}
                  onClickLike={onClickLike}
                  onClickDelete={onClickDelete}
                ></Card>
              );
            })}
          </ul>
        </section>
      </main>
    );
  }
