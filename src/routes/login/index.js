import { h, Component } from 'preact';
import { route } from 'preact-router';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';
import Button from 'preact-material-components/Button';
import Backend from '../../Backend';
import toast from '../../components/toast';

export default class Login extends Component {

	state = {
		action: 'login'
	};
	domIds ={
		username: 'username',
		password: 'password'
	};

	componentWillMount = () => {
		if (Backend.getSessionDetails()) {
			route('/home');
		}
	};

	doLogin = (e) => {
		e.preventDefault();
		let loginForm = new FormData(e.srcElement);

		Backend.login(loginForm).then((r) => {
			//TODO: Send session details (name and profile picture) with the response).
			console.log(r);
			route('/home');
		}).catch(e => {
			toast('Login mislykkedes', e, 'error');
		});
	};

	doRegister(e) {
		e.preventDefault();
		let registerForm = new FormData(e.srcElement);

		Backend.register(registerForm).then((r) => {
			toast('Din bruger blev registreret');
			route('/home');
		}).catch(e => {
			toast('Din bruger kunne ikke registreres', e, 'error');
		});
	}

	doNewPassword(e) {
		e.preventDefault();
		let newPasswordForm = new FormData(e.srcElement);

		Backend.updatePassword(newPasswordForm).then(r => {
			toast('Din kode blev opdateret');
			this.setState({ action: 'login' });
		}).catch(e => {
			toast('Din kode kunne ikke nulstilles', e, 'error');
		});
	}

	startRegister = (e) => {
		e.preventDefault();
		this.setState({ action: 'register' });
	};

	osteForm(callback, passwordLabel, submitLabel) {
		return (
			<form onSubmit={callback} >
				<TextField name="username" class={style['wide-text-field']} label="Brugernavn" required />
				<TextField name="password" class={style['wide-text-field']} label={passwordLabel} type="password" required />
				<TextField name="registrant" class={style['wide-text-field']} label="Fulde navn" required />

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
				<TextField name={'username'} class={style['wide-text-field']} label="Brugernavn" required />
				<TextField name={'password'} class={style['wide-text-field']} label="Kodeord" type="password" required />
				<div>
					<Button onclick={this.startRegister} type="button" outline>Registrer</Button>
					<Button onclick={this.startNewPassword} type="button" outline>Glemt kodeord?</Button>
					<Button class={style['login-btn']} raised ripple>Log Ind</Button>
				</div>
			</form>
		);
	}

	render() {
		let form, cardDescription;
		if (this.state.action === 'forgot') {
			form = this.osteForm(this.doNewPassword, 'Nyt kodeord', 'Nulstil');
			cardDescription = <div class="mdc-typography--caption">Opdater kodeordet til din bruger.</div>;
		}
		else if (this.state.action === 'register') {
			form = this.osteForm(this.doRegister, 'Kodeord', 'Registrer');
			cardDescription = <div class="mdc-typography--caption">Registrer en ny bruger - tal med Tobias før du går i gang.</div>;
		}
		else {
			form = this.loginForm();
			cardDescription = <div class="mdc-typography--caption">Log ind på din bruger.</div>;
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
