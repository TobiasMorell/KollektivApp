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
						We could add recent information here.
					</div>
				</Card>
			</div>
		);
	}
}
