import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarUrl = React.useRef("");

  // Set blank value to ref
  React.useEffect(() => {
    if (isOpen) avatarUrl.current.value = '';
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({avatar: avatarUrl.current.value});
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input">
        <input
          type="url"
          name="avatar"
          ref={avatarUrl}
          className="popup__edit-input popup__edit-input_type_url popup-avatar__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__edit-input-error"></span>
      </div>
    </PopupWithForm>
  )
}
