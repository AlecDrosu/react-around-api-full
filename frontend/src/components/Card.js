import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = currentUser._id === props.card.owner._id;
	const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
	const cardLikeButtonClassName = `text__heart ${
		isLiked ? "text__heart_active" : ""
	}`;
	const cardDeleteButtonClassName = isOwn
		? "element__trash"
		: "element__trash_hidden";

	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}

	return (
		<div className='element'>
			<img
				src={props.link}
				alt={props.name}
				className='element__img'
				onClick={handleClick}
			/>
			<button
				type='button'
				className={cardDeleteButtonClassName}
				onClick={handleDeleteClick}
			></button>
			<div className='text'>
				<h2 className='text__label'>{props.name}</h2>
				<div className='text__like'>
					<button
						type='button'
						className={cardLikeButtonClassName}
						onClick={handleLikeClick}
					></button>
					<span className='text__like-count'>{props.likes.length}</span>
				</div>
			</div>
		</div>
	);
}
