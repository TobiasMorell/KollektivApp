import { h, Component } from 'preact';
import { route } from 'preact-router';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';
import Backend from '../../Backend';

export default class Login extends Component {
	doLogin () {
		let un = document.getElementById('username').value;
		let pwd = document.getElementById('password').value;

		console.log(`login with credentials: ${un}, ${pwd}`);
		Backend.login(un, pwd).then(() => {
			console.log('logged in');
			route('/');
		}).catch(error => {
			console.error(error);
		});
	}

	render() {
		return (
			<div className={style['login-card']}>
				<Card ripple raised>
					<h2 class="mdc-typography--title">Osteklokken</h2>
					<div class="mdc-typography--caption">{window.lang.loginDescription}</div>
					<div class="card-media">
						<form>
							<TextField id="username" label={window.lang.username} required />
							<TextField id="password" label={window.lang.password} type="password" required />
						</form>
					</div>
					<Card.Actions>
						<Card.ActionButton onclick={this.doLogin}>{window.lang.login.toUpperCase()}</Card.ActionButton>
					</Card.Actions>
				</Card>
			</div>
		);
	}
}
