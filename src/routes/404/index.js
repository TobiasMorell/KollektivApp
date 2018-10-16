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
						<h2 class=" mdc-typography--title">404! {window.lang.notFound}</h2>
					</div>
					<div class={style.cardBody}>
						{window.lang.notFoundDescription}
					</div>
				</Card>
			</div>
		);
	}
}
