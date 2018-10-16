import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {
//	state = {
//		time: Date.now(),
//		count: 10
//	};

	// gets called when this route is navigated to
//	componentDidMount() {
//		// start a timer for the clock:
//		this.timer = setInterval(this.updateTime, 1000);
//	}

	// gets called just before navigating away from the route
//	componentWillUnmount() {
//		clearInterval(this.timer);
//	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ user }) {
		return (
			<div class={style.profile}>
				<h1>{window.lang.profile}: {user}</h1>
			</div>
		);
	}
}
