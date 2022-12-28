import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import Card from "../Card/Card";

/**
 *
 * @param {object} props - пропсы:
 * - onEditProfile - функция обработчик клика по кнопке редактирования профиля
 * - onAddPlace - функция обработчик клика по кнопке добавления карточки
 * - onEditAvatar - функция обработчик клика по кнопке редактирования аватара
 * - onClickImage - функция обработчик клика по фото
 */
export default function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, onClickImage } = props;

  //стейт
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCard] = useState([]);

  //инициализация начальных данных при монтировании компонента
  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCard(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatarContainer">
            <img
              src={userAvatar}
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
            <h1 className="profile__name">{userName}</h1>
            <button
              className="button profile__editButton"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{userDescription}</p>
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
            return <Card card={card} key={card._id} onClickImage={onClickImage}></Card>;
          })}
        </ul>
      </section>
    </main>
  );
}
