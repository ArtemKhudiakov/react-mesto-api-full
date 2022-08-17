import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <ul className="popup__inputs">
        <li className="popup__input">
          <input
            type="text"
            name="name"
            value={name}
            className="popup__edit-input popup__edit-input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChangeName}
          />
          <span className="popup__edit-input-error"></span>
        </li>
        <li className="popup__input">
          <input
            type="text"
            name="about"
            value={description}
            className="popup__edit-input popup__edit-input_type_description"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            onChange={handleChangeDescription}
          />
          <span className="popup__edit-input-error"></span>
        </li>
      </ul>
    </PopupWithForm>
  );
}
