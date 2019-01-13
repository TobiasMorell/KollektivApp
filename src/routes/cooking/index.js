import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style.css';

export default class Cooking extends Component {
	like = (e) => {
		e.target.classList.add(style.like);
	};
	dislike = (e) => {
		e.target.classList.add(style.dislike);
	};

	render() {
		return (
			<div>
				<Card>
					<div>
						<h2 class=" mdc-typography--title">{window.lang.week} 40</h2>
						<div class=" mdc-typography--caption">{window.lang.cooking}: Lasagna</div>
						<div class="mdc-typography--caption">Cooked by: Tobias</div>
					</div>
					<Card.Actions>
						<Card.ActionIcons>
							<Card.ActionIcon className={style.actionIcon} onClick={this.dislike}>thumb_down</Card.ActionIcon>
							<Card.ActionIcon className={style.actionIcon} onClick={this.like}>thumb_up</Card.ActionIcon>
						</Card.ActionIcons>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
