import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login"
import Register from "./Register"
import * as Auth from "../Auth"
import InfoTooltip from "./InfoTooltip";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: ""
  })
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [signupStatus, setSignupStatus] = React.useState(true);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  // Get cards and userinfo from server
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoServer(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user)
          setCards(cards)
        })
        .catch((error) => console.log(error))
    }
  }, [loggedIn])

  // Checking token
  React.useEffect(() => {
    handleCheckToken();
  }, []);

  // Redirect to main page when login
  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // Handler for likes
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    console.log(card.owner._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.log(error))
  }

  // Handler for card removing
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups()
      })
      .catch((error) => console.log(error))
  }

  // Handler for edit profile
  function handleUpdateUser(userInfo) {
    api.editUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
  }

  // Handler for avatar updating
  function handleUpdateAvatar(url) {
    api.setUserAvatar(url)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
  }

  // Handler for new place
  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setInfoTooltipOpen(false)
    setSelectedCard({})
  }

  function handleReg({email, password}) {
    Auth.register(email, password)
      .then(() => {
        setSignupStatus(true)
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(`Ошибка...: ${err}`);
        setSignupStatus(false)
      })
      .finally(() => {
        setInfoTooltipOpen(true);

      });
  }

  function handleLogin({email, password}) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          localStorage.setItem('jwt', res.token);
          handleCheckToken()
        }
      })
      .catch((err) => {
        console.log(`Авторизация неудалась, ошибка: ${err}`);
      })
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  // Check token local storage
  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      console.log('jwt', jwt)
      Auth.checkToken(jwt)
        .then(response => {
          setLoggedIn(true);
          setEmail(response.data.email);
          history.push('/')
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleLogOut}/>
        <Switch>
          <ProtectedRoute
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path='/sign-up'>
            <Register onRegister={handleReg}/>
          </Route>
          <Route path='/sign-in'>
            <Login onLogin={handleLogin}/>
          </Route>
        </Switch>
        <Footer/>
        {/* <!-- Edit profile popup --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- Avatar popup --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* <!-- New place popup --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        {/* <!-- Open Image popup --> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

        {/* <!-- Registration status --> */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          signupStatus={signupStatus}
        />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
