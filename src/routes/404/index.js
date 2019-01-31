import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class NotFound extends Component {
	render() {
		return (
			<div class={style.home}>
				<Card>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">Siden blev ikke fundet</h2>
					</div>
					<div class={style.cardBody}>
						Den side du ledte efter kunne ikke findes,
					</div>
				</Card>
			</div>
		);
	}
}
