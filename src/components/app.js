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
		if (e.url === '/osteklokken/')
			route('/osteklokken/login', true);
		if (!this.header)
			return;

		if (e.url === '/osteklokken/login')
			this.header.setState({ active: false });
		else if (e.url !== '/osteklokken/')
			this.header.setState({ active: true });
	};

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
					<NotFound default />
				</Router>
			</div>
		);
	}
}
