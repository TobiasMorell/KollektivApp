import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Backend from '../../Backend';
import 'preact-material-components/style.css';
import style from './style.css';
import toast from '../toast';

export default class Header extends Component {
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

	componentDidMount = () => {
		if (!Backend.getSessionDetails()) {
			route('/');
		}
	};

	logout = () => {
		this.toggleDropdown();
		Backend.logout().then(r => {
			localStorage.removeItem('session');
			route('/');
		}).catch(e => {
			toast('Kunne ikke logge ud', e, 'error');
		});
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	goToShopping = this.linkTo('/shopping');
	goToCooking = this.linkTo('/cooking');
	goToKollexicon = this.linkTo('/kollexicon');

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
				<this.DrawerItem onSelected={this.goHome} icon="home" text="Nyheder" selected={true} />
				<this.DrawerItem onSelected={this.goToShopping} icon="shopping_cart" text="Indkøbsliste"  />
				<this.DrawerItem onSelected={this.goToCooking} icon="fastfood" text="Madlavning"  />
				<this.DrawerItem onSelected={this.goToKollexicon} icon="gavel" text="Kolleksikon"  />
			</Drawer.DrawerContent>
		</Drawer>);

	render({ displayed }) {
		let s = Backend.getSessionDetails();
		if (displayed || !s)
			return;

		return (
			<div>
				<Toolbar className={style['black-text']}>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
						</Toolbar.Section>
						<Toolbar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<div className={style.avatarContainer} onClick={this.toggleDropdown}>
								<img className={style.avatar} src={s.avatar} />
							</div>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<div className={[style.settingsDropdown, this.state.dropdownShown ? style.shown : ''].join(' ')}>
					<div className={style.cropText}>{s.name}</div>
					<div className={style.clickable} onClick={this.logout}>Logout</div>
				</div>
				<this.OsteDrawer />
			</div>
		);
	}
}
