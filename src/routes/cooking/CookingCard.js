import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.css';
import Backend from "../../Backend";

export default class CookingCard extends Component {
	actionButtons = (menuChef, session, openEditMenu, deleteItem, onAttend, onCancel) => {
		session = Backend.getSessionDetails();
		if (menuChef === session.name)
			return (
				<Card.ActionIcons>
					<Card.ActionIcon className={style.actionIcon} onClick={openEditMenu}>edit</Card.ActionIcon>
					<Card.ActionIcon className={style.actionIcon} onClick={deleteItem}>delete</Card.ActionIcon>
				</Card.ActionIcons>
			);
		return (
			<Card.ActionIcons>
				<Card.ActionIcon className={style.actionIcon} onClick={onAttend}>calendar</Card.ActionIcon>
				<Card.ActionIcon className={style.actionIcon} onClick={onCancel}>cancel</Card.ActionIcon>
			</Card.ActionIcons>
		);
	};

	render({ menu, className, openEditMenu, deleteItem, onAttend, onCancel, session }, state) {
		return (
			<Card className={className}>
				<div>
					<h2 className=" mdc-typography--title">Uge {menu.Week}</h2>
				</div>
				<div className={style.cardBody}>
					<div className={style.menuDetails}>
						<span>Ugedag:</span>
						<span>{menu.Day}</span>
					</div>
					<div className={style.menuDetails}>
						<span>Ret:</span>
						<span>{menu.Meal}</span>
					</div>
					<div className={style.menuDetails}>
						<span>Tilberedt af:</span>
						<span>{menu.Chef}</span>
					</div>
				</div>
				<Card.Actions>
					<div className={style.menuDetails}>
						{menu.Participants ? menu.Participants.map(p =>
							(<div>
								<img className={style.menuAttendant}
									 src={'/assets/avatars/' + p.split(' ')[0].toLowerCase() + '.png'} />
							</div>)) : undefined}
					</div>
					{this.actionButtons(menu.Chef, session, openEditMenu, deleteItem, onAttend, onCancel)}
				</Card.Actions>
			</Card>);
	}
}