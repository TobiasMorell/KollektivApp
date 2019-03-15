import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import Button from 'preact-material-components/Button';
import { route } from 'preact-router';
import style from './style.css';

export default class NotFound extends Component {
	goHome = e => {
		route('/osteklokken/home', true);
	};

	render() {
		return (
			<div className={style.home}>
				<Card>
					<div className={style.cardHeader}>
						<h2 className=" mdc-typography--title">Hovsa! Det var ikke meningen du skulle havne her.</h2>
					</div>
					<div className={style.cardBody}>
						<p>Der må være en løs forbindelse et sted. Sig lige til Tobias hvad du trykkede på, så han kan fikse det👷👷👷👷👷.</p>
						<div className={style.goHomeButtonContainer}>
							<Button className={style.goHomeButton} onClick={this.goHome} primary>Gå til startsiden</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}
