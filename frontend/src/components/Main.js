import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className='main'>
			<section className='profile'>
				<div className='profile__holder'>
					<div className='profile__image-box'>
						<img
							src={currentUser.avatar}
							alt={currentUser.name}
							className='profile__avatar'
						/>
						<button
							className='profile__avatar-edit'
							onClick={props.onEditAvatarClick}
						></button>
					</div>
					<div className='info'>
						<div className='title'>
							<h1 className='title__name'>{currentUser.name}</h1>
							<button
								type='button'
								className='title__button'
								onClick={props.onEditProfileClick}
							></button>
						</div>
						<p className='info__job'>{currentUser.about}</p>
					</div>
				</div>

				<button
					type='button'
					className='profile__button'
					id='form-button'
					onClick={props.onAddPlaceClick}
				></button>
			</section>

			<section className='elements'>
				{props.cards.map((card) => (
					<Card
						key={card._id}
						id={card._id}
						name={card.name}
						link={card.link}
						likes={card.likes}
						onCardClick={props.onCardClick}
						card={card}
						onCardLike={props.onCardLike}
						onCardDelete={props.onCardDelete}
					/>
				))}
			</section>
		</main>
	);
}
