import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style.css';
import pedel from '../../assets/pedelliste.png';
import Typography from 'preact-material-components/Typography';

export default class Home extends Component {
	render() {
		return (
			<div class="appContainer">
				<Card>
					<div class={style.cardHeader}>
						<h2 class=" mdc-typography--title">Nu med pedelliste!</h2>
					</div>
					<Card.Media>
						<div>
							<img class={style.cardMedia} src={pedel} />
						</div>
					</Card.Media>
					<div class={style.cardBody}>
						Vi har fået en pedelliste! Nu kan du tilføje punkter, som du gerne vil have fikset. Lige nu
						virker det ikke super godt på mobilen, men det vil jeg se til på et senere tidspunkt.
					</div>
				</Card>
				<Card>
					<div className={style.cardHeader}>
						<h2 class="mdc-typography--title">Vigtige datoer</h2>
					</div>
					<div className={style.cardBody}>
						<ul className={style.dateList}>
							<li>
								<span>24. juli</span>
								<span>Tur i Fårup Sommerland</span>
							</li>
							<li>
								<span>4. august</span>
								<span>Byttedag</span>
							</li>
							<li>
								<span>18. august</span>
								<span>Ornedag</span>
							</li>
							<li>
								<span>7. september</span>
								<span>Renes 25 års fødselsdag</span>
							</li>
							<li>
								<span>14. september</span>
								<span>Osteklokkens 5 års fødselsdag</span>
							</li>
						</ul>
					</div>
				</Card>
			</div>
		);
	}
}
