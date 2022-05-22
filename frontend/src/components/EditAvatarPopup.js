import PopupWithForm from "./PopupWithForm.js";
import React from "react";

export default function EditAvatarPopup(props) {
	const currentAvatar = React.useRef();

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateAvatar({ avatar: currentAvatar.current.value });
	}

	return (
		<PopupWithForm
			name='edit'
			title='Change profile picture'
			submit='Save'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className='form__label'>
				<input
					type='url'
					name='avatar'
					id='avatar'
					className='form__input'
					placeholder='Image Link'
					required
					ref={currentAvatar}
				/>
				<span className='form__error' id='avatar-error'></span>
			</label>
		</PopupWithForm>
	);
}
