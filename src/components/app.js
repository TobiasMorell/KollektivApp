import { h, Component } from 'preact';
import { route, Router } from 'preact-router';
import Header from './header';
import Home from '../routes/home';
import Login from '../routes/login';
import NotFound from '../routes/404';
import AsyncRoute from 'preact-async-route';
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

	componentDidMount = () => {
		/*
		window.addEventListener('beforeinstallprompt', (e) => {
			console.log(e);
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault();
			// Stash the event so it can be triggered later.
			this.deferredPrompt = e;
			this.setState({ showInstall: true });
		});*/
	};

	/** Gets fired when the route changes.
	 *	@param {Object} e		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} e.url	The newly routed URL
	 */
	handleRoute = e => {
		if (e.url === '/osteklokken/')
			route('/osteklokken/login', true);
		if (!this.header)
			return;

		if (e.url === '/osteklokken/login')
			this.header.setState({ active: false });
		else if (e.url !== '/osteklokken/')
			this.header.setState({ active: true });
	};

	/*
	installNatively = (e) => {
		// hide our user interface that shows our A2HS button
		this.setState({ showInstall: false });
		// Show the prompt
		this.deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		this.deferredPrompt.userChoice
			.then((choiceResult) => {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				}
				else {
					console.log('User dismissed the A2HS prompt');
				}
				this.deferredPrompt = null;
			});

	};*/

	render() {

		return (
			<div id="app">
				<Header ref={h => this.header = h} />
				<Router onChange={this.handleRoute} basename >
					<Home path="/osteklokken/home" />
					<Login path="/osteklokken/login" />
					<AsyncRoute
						path="/osteklokken/shopping"
						getComponent={() => import('../routes/shopping').then(m => m.default)}
					/>
					<AsyncRoute
						path="/osteklokken/cooking"
						getComponent={() => import('../routes/cooking').then(m => m.default)}
					/>
					<AsyncRoute
						path="/osteklokken/kollexicon"
						getComponent={() => import('../routes/kollexicon').then(m => m.default)}
					/>
					<AsyncRoute path={'/osteklokken/pedel'}
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
