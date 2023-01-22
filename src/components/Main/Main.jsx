import { useContext } from "react";
import { useEffect, useState } from "react";
import { CardsContext } from "../../contexts/CardsContext";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Api from "../../utils/Api";
import Card from "../Card/Card";

/**
 *
 * @param {object} props - пропсы:
 * - onEditProfile - функция обработчик клика по кнопке редактирования профиля
 * - onAddPlace - функция обработчик клика по кнопке добавления карточки
 * - onEditAvatar - функция обработчик клика по кнопке редактирования аватара
 * - onClickImage - функция обработчик клика по фото
 * - onClickLike - функция обработчик клика по лайку
 * - onClickDelete - функция обработчик удаления карточки
 */
  export default function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onClickImage,
    onClickLike,
    onClickDelete,
  }) {
    //стейт
    const currentUser = useContext(CurrentUserContext);
    const cards = useContext(CardsContext);

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
              <p className="profile__description">{currentUser.description}</p>
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
