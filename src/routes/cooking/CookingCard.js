import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.css';

export default class CookingCard extends Component {


	render({ menu, className, openEditMenu, deleteItem }) {
		return (
			<Card className={className}>
				<div>
					<h2 className=" mdc-typography--title">Uge {menu.Week}</h2>
				</div>
				<div className={style.cardBody}>
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
					<Card.ActionIcons>
						<Card.ActionIcon className={style.actionIcon} onClick={openEditMenu}>edit</Card.ActionIcon>
						<Card.ActionIcon className={style.actionIcon} onClick={deleteItem}>delete</Card.ActionIcon>
					</Card.ActionIcons>
				</Card.Actions>
			</Card>);
	}
}