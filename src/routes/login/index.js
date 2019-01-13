import { h, Component } from 'preact';
import { route } from 'preact-router';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import Backend from '../../Backend';
import App from '../../components/app';

export default class Login extends Component {

	state = {
		action: 'login'
	};
	domIds ={
		username: 'username',
		password: 'password'
	};

	constructor(){
		super();
		this.state = { action: 'login' };
	}

	doLogin = (e) => {
		e.preventDefault();
		let loginForm = new FormData(e.srcElement);

		Backend.login(loginForm).then((r) => {
			if (r) {
				console.log(r);
				route('/');
			}
		});
	};

	doRegister(e) {
		e.preventDefault();
		let registerForm = new FormData(e.srcElement);

		Backend.register(registerForm).then((r) => {
			console.log(r);
			route('/');
		});
	}

	doNewPassword(e) {
		e.preventDefault();
		let newPasswordForm = new FormData(e.srcElement);

		Backend.updatePassword(newPasswordForm).then(r => {
			console.log(r);
			App.Snackbar.MDComponent.show({
				msg: 'Password updated'
			});
		});
	}

	startRegister = (e) => {
		e.preventDefault();
		this.setState({ action: 'register' });
	};

	osteForm(callback, passwordLabel, submitLabel) {
		return (
			<form onSubmit={callback} >
				<TextField name="username" class={style['wide-text-field']} label={window.lang.username} required />
				<TextField name="password" class={style['wide-text-field']} label={passwordLabel} type="password" required />
				<TextField name="registrant" class={style['wide-text-field']} label={window.lang.name} required />

				<div>
					<Button onclick={this.startLogin} type="button" outline>Back</Button>
					<Button class={style['login-btn']} raised ripple>{submitLabel}</Button>
				</div>
			</form>
		);
	}

	startNewPassword = (e) => {
		this.setState({ action: 'forgot' });
	};

	startLogin = (e) => {
		this.setState({ action: 'login' });
	};

	loginForm() {
		return (
			<form onSubmit={this.doLogin}>
				<TextField name={'username'} class={style['wide-text-field']} label={window.lang.username} required />
				<TextField name={'password'} class={style['wide-text-field']} label={window.lang.password} type="password" required />
				<div>
					<Button onclick={this.startRegister} type="button" outline>Register</Button>
					<Button onclick={this.startNewPassword} type="button" outline>Forgot Password</Button>
					<Button class={style['login-btn']} raised ripple>{window.lang.login.toUpperCase()}</Button>
				</div>
			</form>
		);
	}

	render() {
		let form, cardDescription;
		if (this.state.action === 'forgot') {
			form = this.osteForm(this.doNewPassword, window.lang.password, window.lang.reset);
			cardDescription = <div class="mdc-typography--caption">{window.lang.newPasswordDescription}</div>;
		}
		else if (this.state.action === 'register') {
			form = this.osteForm(this.doRegister, window.lang.newPassword, window.lang.register);
			cardDescription = <div class="mdc-typography--caption">{window.lang.registerDescription}</div>;
		}
		else {
			form = this.loginForm();
			cardDescription = <div class="mdc-typography--caption">{window.lang.loginDescription}</div>;
		}

		return (
			<div className={style['login-card']}>
				<Card ripple raised>
					<h2 class="mdc-typography--title">Osteklokken</h2>
					{cardDescription}
					<div class="card-media">
						{form}
					</div>
				</Card>
			</div>
		);
	}
}
