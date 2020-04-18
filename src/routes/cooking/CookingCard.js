import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.css';

export default class CookingCard extends Component {
	actionButtons = (session) => {
		if (this.props.menu.Chef === session.name)
			return (
				<Card.ActionIcons>
					<Card.ActionIcon className={style.actionIcon} onClick={this.props.openEditMenu}>edit</Card.ActionIcon>
					<Card.ActionIcon className={style.actionIcon} onClick={this.props.deleteItem}>delete</Card.ActionIcon>
				</Card.ActionIcons>
			);
		return (
			<Card.ActionIcons>
				{
					this.props.menu.Participants.find(p => p === session.name) ?
						<Card.ActionIcon className={style.actionIcon} onClick={this.props.onCancel}>clear</Card.ActionIcon> :
						<Card.ActionIcon className={style.actionIcon} onClick={this.props.onAttend}>check</Card.ActionIcon>
				}
			</Card.ActionIcons>
		);
	};

	render({ menu, className, openEditMenu, deleteItem, onAttend, onCancel, session }, state) {
		let date = new Date(menu.Date);
		return (
			<Card className={[className, style.cookingCard].join(' ')}>
				<div>
					<h2 className=" mdc-typography--title">{menu.Meal}</h2>
				</div>
				<div className={style.cardBody}>
					<div className={style.menuDetails}>
						<span>Dato:</span>
						<span>{date.toLocaleDateString().replace(/\//g, ' / ')}</span>
					</div>
					<div className={style.menuDetails}>
						<span>Forventet pris:</span>
						<span>{menu.Price} kr.</span>
					</div>
					<div className={style.menuDetails}>
						<span>Tilberedt af:</span>
						<span>{menu.Chef}</span>
					</div>

					<div className={style.menuDetails}>
						<span>Deltagere:</span>
						<span>
							{menu.Participants ? menu.Participants.map(p =>
								(<div className={style.participant}>
									<img className={style.menuAttendant}
										src={'/assets/avatars/' + p.split(' ')[0].toLowerCase() + '.png'}
									/>
								</div>)) : undefined}
						</span>
					</div>
				</div>
				<Card.Actions>
					{this.actionButtons(session)}
				</Card.Actions>
			</Card>);
	}
}
