import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Backend from '../../Backend';
import 'preact-material-components/style.css';
import style from './style.css';
import toast from '../toast';
import DefaultAvatar from '../../assets/avatars/profile.png';

export default class Header extends Component {
	state = {
		active: false,
		avatar: DefaultAvatar
	};
	closeDrawer() {
		this.drawer.MDComponent.open = false;
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	drawerRef = drawer => (this.drawer = drawer);
	currentTab = '';

	linkTo = path => () => {
		this.currentTab = path.replace('/', '');

		route(path);
		this.closeDrawer();
	};

	componentDidMount() {
		let s = Backend.getSessionDetails();
		if (!s) {
			route('/', true);
		}
	}

	logout = () => {
		this.toggleDropdown();
		Backend.logout().then(r => {
			localStorage.removeItem('session');
			route('/', true);
		}).catch(e => {
			toast('Kunne ikke logge ud', e, 'error');
		});
	};

	goToShopping = this.linkTo('/shopping');
	goToCooking = this.linkTo('/cooking');
	goToKollexicon = this.linkTo('/kollexicon');
	goToFixit = this.linkTo('/pedel');

	DrawerItem = ({ onSelected, icon, text, selected } ) => (
		<Drawer.DrawerItem onClick={onSelected} selected={selected}>
			<List.ItemGraphic>{icon}</List.ItemGraphic>
			{text}
		</Drawer.DrawerItem>);

	toggleDropdown = () => {
		this.setState({ dropdownShown: !this.state.dropdownShown });
	};

	OsteDrawer = ({ }) => (
		<Drawer modal ref={this.drawerRef}>
			<Drawer.DrawerContent>
				<this.DrawerItem onSelected={this.goToShopping} icon="shopping_cart" text="Indkøbsliste"  selected={window.location.pathname.includes('/shopping')} />
				<this.DrawerItem onSelected={this.goToCooking} icon="fastfood" text="Madlavning" selected={window.location.pathname.includes('/cooking')} />
				<this.DrawerItem onSelected={this.goToKollexicon} icon="gavel" text="Kolleksikon" selected={window.location.pathname.includes('/kollexicon')} />
				<this.DrawerItem onSelected={this.goToFixit} icon="build" text="Pedelliste" selected={window.location.pathname.includes('/pedel')} />
			</Drawer.DrawerContent>
		</Drawer>);

	render({ displayed, active }, state) {
		if (!active)
			return;
		let s = Backend.getSessionDetails();


		return (
			<div>
				<Toolbar className={style['black-text']}>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
						</Toolbar.Section>
						<Toolbar.Section align-end shrink-to-fit >
							<div className={style.avatarContainer} onClick={this.toggleDropdown}>
								<img className={style.avatar} src={s ? s.avatar : '/assets/avatars/profile.png'} />
							</div>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<div className={[style.settingsDropdown, state.dropdownShown ? style.shown : ''].join(' ')}>
					<div className={style.cropText}>{s ? s.name : 'Dit navn'}</div>
					<div className={style.clickable} onClick={this.logout}>Logout</div>
				</div>
				<this.OsteDrawer />
			</div>
		);
	}
}
