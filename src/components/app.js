import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Login from '../routes/login';
import NotFound from '../routes/404';
import AsyncRoute from 'preact-async-route';
import toast from './toast';
import '../style/index.css';
import '../style/toastr.css';

export default class App extends Component {
	componentDidCatch(error, errorInfo) {
		//This does not work yet, but will so soon (hopefully)
		console.error(error, errorInfo);
		toast('Ups! Der skete en fejl', error, 'error');
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {

		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/home" />
					<Login path="/" />

					<NotFound default />
				</Router>
			</div>
		);
	}
}

/*
<AsyncRoute
						path="/shopping"
						getComponent={() => import('../routes/shopping').then(m => m.default)}
					/>
					<AsyncRoute
						path="/cooking"
						getComponent={() => import('../routes/cooking').then(m => m.default)}
					/>
					<AsyncRoute
						path="/kollexicon"
						getComponent={() => import('../routes/kollexicon').then(m => m.default)}
					/>
					<AsyncRoute
						path="/profile"
						getComponent={() => import('../routes/profile').then(m => m.default)}
					/>
 */
