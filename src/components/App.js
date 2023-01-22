import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Api from "../utils/Api";
import Footer from "./Footer/Footer";
import Header from "./Header/header";
import ImagePopup from "./ImagePopup/ImagePopup";
import Main from "./Main/Main";
import PopupWithForm from "./PopupWithForm/PopupWithForm";

import defaultAvatar from "../images/Anonymous_emblem.svg";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";

function App() {
  //стейты
  const [currentUser, setCurrentUser] = useState({
    name: "Anonimus",
    about: "Anonimus descriprion",
    avatar: defaultAvatar,
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //инициализация начальных данных при монтировании
  useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
  }, []);

  /**
   *  функция обновления данных пользователя после запроса
   * @param {object} userData - объект пользователя
   */
  const updateUserInfo = (userData) => {
    setCurrentUser(userData);
    closeAllPopups();
  }

  /**
   * функция обработчик клика по кнопке редактирования профиля
   */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    addListeners();
  };

  /**
   * функция обработки сабмита формы обновления информации пользователя
   * @param {object} newUserData - объект с новым именем и описание пользователя
   */
  const handleUpdateUser = (newUserData) => {
    setIsLoading(true);
    Api.editUserInfo(newUserData)
      .then((userData) => {
        updateUserInfo(userData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  /**
   * функция обработчик клика по кнопке добавления карточки
   */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    addListeners();
  };

  /**
   * функция обработчик клика по кнопке редактирования аватара
   */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    addListeners();
  };

  /**
   * функция обработки сабмита формы обновления аватара
   * @param {object} newAvatarData - объект с новой ссылкой на аватар
   */
  const handleUpdateAvatar = (newAvatarData) => {
    setIsLoading(true)
    Api.editAvatar(newAvatarData)
      .then((userData) => {
        updateUserInfo(userData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  /**
   * функция обработчик клика по фото
   * @param {object} card - объект выбранной карточки
   */
  const handleClickImage = (card) => {
    setSelectedCard(card);
    addListeners();
  };

  /**
   * функция обработчик лайка карточки
   * @param {object} targetCard - объект лайкнутой карточки
   */
  const handleLikeCard = (targetCard) => {
    const isLiked = targetCard.likes.some(
      (user) => user._id === currentUser._id
    );

    Api.changeLike(targetCard._id, isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((card) => (card._id === targetCard._id ? newCard : card))
      );
    });
  };

  /**
   * функция обработчик удаления карточки
   * @param {object} targetCard - объект лайкнутой карточки
   */
  const handleDeleteCard = (targetCard) => {
    Api.deleteCard(targetCard._id).then(() => {
      setCards((cards) => cards.filter((card) => card._id !== targetCard._id));
    });
  };

  //обработчики закрытия попапов

  /**
   * функция закрытия попапов
   */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    removeListeners();
  };

  /**
   * функция обработчик клика по оверлею
   */
  const handleOverlayClick = ({ target, currentTarget }) => {
    if (target === currentTarget) closeAllPopups();
  };

  /**
   * функция обработчик нажатия на esc
   */
  const handleEscPress = ({ key }) => {
    if (key === "Escape") closeAllPopups();
  };

  const addListeners = () => {
    document.addEventListener("keydown", handleEscPress);
  };

  const removeListeners = () => {
    document.removeEventListener("keydown", handleEscPress);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onClickImage={handleClickImage}
            onClickLike={handleLikeCard}
            onClickDelete={handleDeleteCard}
          />
          <Footer />

          <EditAvatarPopup
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoading}
          ></EditAvatarPopup>

          <EditProfilePopup
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
          ></EditProfilePopup>

          <PopupWithForm
            name="addCard"
            title="Новое место"
            buttonText="Создать"
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
            isOpen={isAddPlacePopupOpen}
          >
            <input
              type="text"
              className="popup__input"
              id="nameInput"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
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

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onOverlayClick={handleOverlayClick}
          ></ImagePopup>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
