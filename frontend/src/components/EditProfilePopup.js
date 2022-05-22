import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = React.useState("");
	const [about, setAbout] = React.useState("");

	React.useEffect(() => {
		setName(currentUser.name || "");
		setAbout(currentUser.about || "");
	}, [currentUser, props.isOpen]);

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateUser({ name, about });
	}

	function handleChageName(evt) {
		setName(evt.target.value);
	}

	function handleChageAbout(evt) {
		setAbout(evt.target.value);
	}

	return (
		<PopupWithForm
			name='edit'
			title='Edit Profile'
			submit='Save'
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<label className='form__label'>
				<input
					type='text'
					name='name'
					id='name'
					className='form__input form__input_type_name'
					placeholder='Name'
					required
					minLength='2'
					maxLength='40'
					value={name}
					onChange={handleChageName}
				/>
				<span className='form__error' id='name-error'></span>
			</label>
			<label className='form__label'>
				<input
					type='text'
					name='job'
					id='job'
					className='form__input form__input_type_job'
					placeholder='About Me'
					required
					minLength='2'
					maxLength='200'
					value={about}
					onChange={handleChageAbout}
				/>
				<span className='form__error' id='about-error'></span>
			</label>
		</PopupWithForm>
	);
}
