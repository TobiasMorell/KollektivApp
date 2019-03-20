import { Component } from 'preact';
import Card from 'preact-material-components/Card';
import style from './style.css';

export default class FixCard extends Component {

	toggleCollapse = e => {
		this.setState({ expanded: !this.state.expanded });
	};

	render({ fixit, className, openEditMenu, deleteItem, markDone }) {
		return (
			<Card className={className}>
				<Card.Media className="card-media" >
					<div>
						<img className={style.cardImage} src={'/api/fixit/' + fixit.ImagePath} />
					</div>
				</Card.Media>
				<div className={style.cardBody}>
					<h2 className=" mdc-typography--title">{fixit.Title}</h2>
					<div className={[this.state.expanded ? style.expanded : style.collapsed, style.description].join(' ')}>
						{fixit.Description}
					</div>
				</div>
				<Card.Actions style={{ overflow: 'hidden' }}>
					<Card.ActionIcons >
						<Card.ActionIcon onClick={this.toggleCollapse}>{this.state.expanded ? 'expand_less' : 'expand_more'}</Card.ActionIcon>
						<Card.ActionIcon className={fixit.Done ? style.done : ''} onClick={e => markDone(fixit)}>check</Card.ActionIcon>
						<Card.ActionIcon onClick={e => openEditMenu(fixit)}>edit</Card.ActionIcon>
						<Card.ActionIcon onClick={e => deleteItem(fixit)}>delete</Card.ActionIcon>
					</Card.ActionIcons>
				</Card.Actions>
			</Card>);
	}
}