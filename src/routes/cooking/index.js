import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style.css';

export default class Cooking extends Component {
	openEditMenu = () => {

	};

	render() {
		return (
			<div>
				<Card>
					<div>
						<h2 class=" mdc-typography--title">{window.lang.week} 40</h2>
						<div class=" mdc-typography--caption">Lasagna</div>
						<div class="mdc-typography--caption">Cooked by: Tobias</div>
					</div>
					<Card.Actions>
						<Card.ActionButton onclick={this.openEditMenu}>{window.lang.edit.toUpperCase()}</Card.ActionButton>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
