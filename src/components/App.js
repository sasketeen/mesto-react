import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Api from "../utils/Api";
import Header from "./Header/header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";

import defaultAvatar from "../images/Anonymous_emblem.svg";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup/ConfirmPopup";

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
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
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
  };

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
  };

  /**
   * функция обработчик клика по кнопке добавления карточки
   */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    addListeners();
  };

  /**
   * функция обработки сабмита формы добавления карточки
   * @param {object} cardData - объект с новым данными карточки
   */
  const handleAddPlace = (cardData) => {
    setIsLoading(true);
    Api.addCard(cardData)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
    setIsLoading(true);
    Api.editAvatar(newAvatarData)
      .then((userData) => {
        updateUserInfo(userData);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

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

    Api.changeLike(targetCard._id, isLiked)
      .then((newCard) =>
        setCards((cards) =>
          cards.map((card) => (card._id === targetCard._id ? newCard : card))
        )
      )
      .catch((err) => console.log(err))
  };

  /**
   * функция обработчик клика по кнопке удаления
   * @param {object} targetCard - объект удаляемой карточки
   */
  const handleClickDeleteCard = (targetCard) => {
    setSelectedCard(targetCard);
    setIsConfirmPopupOpen(true);
    addListeners();
  };

  /**
   * функция обработчик удаления карточки
   * @param {event} event - событие сабмита
   */
    const handleConfirmDelete = (event) => {
      event.preventDefault();
      setIsLoading(true);
      Api.deleteCard(selectedCard._id)
        .then(() =>
          setCards((cards) => {
            cards.filter((card) => card._id !== selectedCard._id);
            closeAllPopups();
          }
          )
        )
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }

  //обработчики закрытия попапов

  /**
   * функция закрытия попапов
   */
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false)
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
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onClickImage={handleClickImage}
          onClickLike={handleLikeCard}
          onClickDelete={handleClickDeleteCard}
        />
        <Footer />

        <EditAvatarPopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onAddPlace={handleAddPlace}
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        <ConfirmPopup
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          onSubmit={handleConfirmDelete}
          isOpen={isConfirmPopupOpen}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
