import { h, Component } from 'preact';
import { route, Router } from 'preact-router';
import Header from './header';
import Home from '../routes/home';
import Login from '../routes/login';
import NotFound from '../routes/404';
import LiquidRoute, { FadeAnimation, PopAnimation } from 'liquid-route';
import toast from './toast';
import '../style/index.css';
import '../style/toastr.css';

export default class App extends Component {
	deferredPrompt;
	state = {
		showInstall: false
	};

	componentDidCatch(error, errorInfo) {
		//This does not work yet, but will so soon (hopefully)
		console.error(error, errorInfo);
		toast('Ups! Der skete en fejl', error, 'error');
	}

	/** Gets fired when the route changes.
	 *	@param {Object} e		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} e.url	The newly routed URL
	 */
	handleRoute = e => {
		if (!this.header)
			return;

		//Check if we're on the login page, deactivate header if so
		if (e.url === '/')
			this.header.setState({ active: false });
		else if (e.url !== '/')
			this.header.setState({ active: true });
	};

	render(props, state) {
		return (
			<div id="app">
				<Header ref={h => this.header = h} />
				<Router onChange={this.handleRoute} basename >
					<LiquidRoute path="/" animator={PopAnimation} component={Login}/>
					<LiquidRoute
						path="/shopping"
						animator={FadeAnimation}
						getComponent={() => import('../routes/shopping').then(m => m.default)}
					/>
					<LiquidRoute
						path="/cooking"
						animator={FadeAnimation}
						getComponent={() => import('../routes/cooking').then(m => m.default)}
					/>
					<LiquidRoute
						path="/kollexicon"
						animator={FadeAnimation}
						getComponent={() => import('../routes/kollexicon').then(m => m.default)}
					/>
					<LiquidRoute
						path={'/pedel'}
						animator={FadeAnimation}
						getComponent={() => import('../routes/pedel').then(m => m.default)}
					/>
					<NotFound default />
				</Router>
			</div>
		);
	}

	/*Installer
	<div className="installation-prompt" style={{ display: this.state.showInstall ? 'block' : 'none' }}>
					<div className="installation-logo-container">
						<img src={logo} />
					</div>
					<Button onClick={this.installNatively} primary>Installer</Button>
					<Icon className="close-button">close</Icon>
				</div>
	* */
}
