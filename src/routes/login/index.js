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
import Logo from '../../assets/logo.jpg';

export default class Login extends Component {

	state = {
		action: 'login'
	};
	domIds ={
		username: 'username',
		password: 'password',
		registrant: 'registrant'
	};

	componentWillMount() {
		if (Backend.getSessionDetails()) {
			route('/osteklokken/home', true);
		}
	}

	doLogin = (e) => {
		e.preventDefault();
		let loginForm = new FormData(e.srcElement);
		loginForm.set('username', loginForm.get('username').toLowerCase());

		Backend.login(loginForm).then((r) => {
			e.srcElement.reset();
			route('/osteklokken/home', true);
		}).catch(e => {
			toast('Login mislykkedes', e, 'error');
		});
	};

	doRegister = e => {
		e.preventDefault();
		let registerForm = new FormData(e.srcElement);
		registerForm.set('username', registerForm.get('username').toLowerCase());

		Backend.register(registerForm).then(r => {
			toast('Din bruger blev registreret');
			this.setState({ action: 'login' });
		}).catch(e => {
			toast('Din bruger kunne ikke registreres', e, 'error');
		});
	};

	doNewPassword = e => {
		e.preventDefault();
		let newPasswordForm = new FormData(e.srcElement);
		newPasswordForm.set('username', newPasswordForm.get('username').toLowerCase());

		Backend.updatePassword(newPasswordForm).then(r => {
			toast('Din kode blev opdateret');
			this.setState({ action: 'login' });
		}).catch(e => {
			toast('Din kode kunne ikke nulstilles', e, 'error');
		});
	};

	startRegister = (e) => {
		e.preventDefault();
		this.setState({ action: 'register' });
	};

	osteForm(callback, passwordLabel, submitLabel) {
		return (
			<form onSubmit={callback} >
				<TextField id={this.domIds.username} name="username" class={style['wide-text-field']}
					onkeydown={this.focusNextOnEnter(this.domIds.password)} label="Brugernavn"
					autocorrect="off" autocapitalize="off" required
				/>
				<TextField id={this.domIds.password} name="password" class={style['wide-text-field']}
					onkeydown={this.focusNextOnEnter(this.domIds.registrant)} label={passwordLabel} type="password"
					required
				/>
				<TextField id={this.domIds.registrant} name="registrant" class={style['wide-text-field']} label="Fulde navn" required />

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

	focusNextOnEnter = id => e => {
		if (e.key === 'Enter') {
			console.log('Going to: ' + id);
			e.preventDefault();
			document.getElementById(id).focus();
		}
	};

	loginForm() {
		return (
			<form onSubmit={this.doLogin}>
				<TextField name={'username'} class={style['wide-text-field']} label="Brugernavn"
					onkeydown={this.focusNextOnEnter(this.domIds.password)} autocorrect="off" autocapitalize="off"
					required
				/>
				<TextField id={this.domIds.password} name={'password'} class={style['wide-text-field']} label="Kodeord"
					type="password" required
				/>
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
			cardDescription = <div class="mdc-typography--caption">Registrer en ny bruger - angiv dit navn som det står på Facebook.</div>;
		}
		else {
			form = this.loginForm();
			cardDescription = <div class="mdc-typography--caption">Log ind på din bruger.</div>;
		}

		return (
			<div className={style['login-card']}>
				<Card ripple raised>
					<h2 class="mdc-typography--title">Kollektivet Osteklokken</h2>
					{cardDescription}
					<div class="card-media">
						<div className={style.logoBox}>
							<img src={Logo} />
						</div>
						{form}
					</div>
				</Card>
			</div>
		);
	}
}
