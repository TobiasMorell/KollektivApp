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
						<h2 class=" mdc-typography--title">Velkommen til Osteklokkens nye app!</h2>
					</div>
					<Card.Media>
						<div>
							<img class={style.cardMedia} src="/assets/osteklokken-logo.png" />
						</div>
					</Card.Media>
					<div class={style.cardBody}>
						Du kan se indkøbslisten at åbne menuen med knappen i øverste venstre hjørne. Når du tilføjer/markerer
						ting bliver det automatisk opdateret hos de andre beboere. Du kan også tilgå madlavningsplanen, som
						dog ikke er helt færdigudviklet endnu.
					</div>
				</Card>
			</div>
		);
	}
}
