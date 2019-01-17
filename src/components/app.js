import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Login from '../routes/login';
import Cooking from '../routes/cooking';
import Shopping from '../routes/shopping';
import NotFound from '../routes/404';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';
import { getLang } from './I18n';
import Snackbar from 'preact-material-components/Snackbar';
import 'preact-material-components/Snackbar/style.css';

export default class App extends Component {
	static Snackbar;

	componentDidCatch(error, errorInfo) {
		//This does not work yet, but will so soon (hopefully)
		console.error(error, errorInfo);
		App.Snackbar.MDComponent.show({
			message: error
		});
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		window.lang = {
			accept: 'Accept',
			addToShoppingList: 'Add to shopping list',
			editShoppingItem: 'Edit shopping item',
			edit: 'Edit',
			decline: 'Decline',
			delete: 'Delete',
			homeTitle: 'Welcome to Osteklokken\'s App',
			news: 'News',
			shoppingList: 'Shopping List',
			cooking: 'Cooking',
			cookingSubTitle: "Yum yum! What's the menu?",
			profile: 'Profile',
			settings: 'Settings',
			darkTheme: 'Enable dark theme',
			ok: 'OK',
			name: 'Name',
			newPassword: 'New Password',
			newPasswordDescription: 'Update the password for your account',
			notFound: 'Page not found.',
			notFoundDescription: "Looks like the page you are trying to access, doesn't exist.",
			login: 'Login',
			loginDescription: 'Log in to your account.',
			username: 'Username',
			password: 'Password',
			categories: {
				greens: 'Fruits & Vegetabels'
			},
			wares: {
				potatoes: 'Potatoes',
				carrots: 'Carrots'
			},
			reset: 'Reset',
			register: 'Register',
			registerDescription: 'Register an account with us today! Experience true Cheese Clock',
			week: 'Week'
		};

		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Login path="/login" />
					<Shopping path="/shopping" />
					<Cooking path="/cooking" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<NotFound default />
				</Router>
				<Snackbar ref={bar => App.Snackbar = bar} />
			</div>
		);
	}
}
