import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.css';

export default class CookingCard extends Component {

	toggleCollapse = e => {
		this.setState({ expanded: !this.state.expanded });
	};

	render({ fixit, className, openEditMenu, deleteItem }) {
		return (
			<Card className={className}>
				<div className="card-header">
					<h2 className=" mdc-typography--title">{fixit.Title}</h2>
				</div>
				<Card.Media className="card-media" >
					<div>
						<img className={style.cardImage} src={'/api/fixit/' + fixit.ImagePath} />
					</div>
					<div className={[this.state.expanded ? style.expanded : style.collapsed, style.description].join(' ')}>
						{fixit.Description}
					</div>
				</Card.Media>
				<Card.Actions>
					<Card.ActionButtons>
						<Card.ActionButton onClick={this.toggleCollapse}>{this.state.expanded ? 'Vis mindre' : 'Vis mere'}</Card.ActionButton>
						<Card.ActionButton onClick={e => openEditMenu(fixit)}>Rediger</Card.ActionButton>
						<Card.ActionButton onClick={e => deleteItem(fixit)}>Slet</Card.ActionButton>
					</Card.ActionButtons>
				</Card.Actions>
			</Card>);
	}
}