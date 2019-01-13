import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style.css';

export default class Home extends Component {
	render() {
		return (
			<div class="appContainer">
				<Card>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">{lang.homeTitle}</h2>
					</div>
					<Card.Media>
						<div>
							<img class={style.cardMedia} src="/assets/osteklokken-logo.png" />
						</div>
					</Card.Media>
					<div class={style.cardBody}>
						I'm thrilled to welcome you to Osteklokken's new app. You can access the shopping list from the menu
						on the left. In the same menu you may find information about who's cooking and what they're cooking.
					</div>
				</Card>
			</div>
		);
	}
}
