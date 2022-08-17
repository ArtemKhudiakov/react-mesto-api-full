import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {


  const [name, setNamePlace] = React.useState("");
  const [link, setLinkPlace] = React.useState("");

  // Set blank value to state
  React.useEffect(() => {
    if (isOpen) {
      setNamePlace('');
      setLinkPlace('');
    }
  }, [isOpen]);

  // Handler for update name, link
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  // Set name and link to state
  function handleChangeNamePlace(event) {
    setNamePlace(event.target.value)
  }

  function handleChangeLinkPlace(event) {
    setLinkPlace(event.target.value)
  }

  return (

    <PopupWithForm name='place'
                   title='Новое место'
                   buttonText='Сохранить'
                   isOpen={isOpen}
                   onClose={onClose}
                   onSubmit={handleSubmit}
    >
      <ul className="popup__inputs">
        <li className="popup__input">
          <input
            type="text"
            name="name"
            value={name}
            className="popup__edit-input popup__edit-input_type_place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChangeNamePlace}
          />
          <span className="popup__edit-input-error"></span>
        </li>
        <li className="popup__input">
          <input
            type="url"
            name="link"
            value={link}
            className="popup__edit-input popup__edit-input_type_url"
            placeholder="Ссылка на картинку"
            required
            onChange={handleChangeLinkPlace}
          />
          <span className="popup__edit-input-error"></span>
        </li>
      </ul>
    </PopupWithForm>
  )
}
