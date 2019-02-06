import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Backend from '../../Backend';
import style from './style.css';
import toast from '../toast';
import 'preact-material-components/style.css';

export default class Header extends Component {
	drawerRef = d => this.drawer = d;

	closeDrawer = () => {
		this.drawer.MDComponent.open = false;
	};

	openDrawer = () => (this.drawer.MDComponent.open = true);

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


	goHome = this.linkTo('/home');
	goToMyProfile = this.linkTo('/profile');
	goToShopping = this.linkTo('/shopping');
	goToCooking = this.linkTo('/cooking');
	goToKollexicon = this.linkTo('/kollexicon');

	toggleDropdown = () => {
		this.setState({ dropdownShown: !this.state.dropdownShown });
	};

	DrawerItem = ({ onSelected, icon, text, selected } ) => (
		<Drawer.DrawerItem onClick={onSelected} selected={selected} class={selected ? style['black-text'] : ''}>
			<List.ItemGraphic>{icon}</List.ItemGraphic>
			{text}
		</Drawer.DrawerItem>);


	OsteDrawer = ({ }) => (
		<Drawer modal ref={this.drawerRef}>
			<Drawer.DrawerContent>
				<this.DrawerItem onSelected={this.goHome} icon="home" text="Nyheder" selected={this.currentTab === 'home'} />
				<this.DrawerItem onSelected={this.goToShopping} icon="shopping_cart" text="Indkøbsliste" selected={this.currentTab === 'shopping'} />
				<this.DrawerItem onSelected={this.goToCooking} icon="fastfood" text="Madlavning" selected={this.currentTab === 'cooking'} />
				<this.DrawerItem onSelected={this.goToKollexicon} icon="gavel" text="Kolleksikon" selected={this.currentTab === 'kollexicon'} />
				<this.DrawerItem onSelected={this.goToMyProfile} icon="account_circle" text="Profil" selected={this.currentTab === 'profile'} />
			</Drawer.DrawerContent>
		</Drawer>);

	logout = () => {
		Backend.logout().then(r => {
			console.log(r);
			localStorage.removeItem('session');
			route('/');
		}).catch(e => {
			toast('Kunne ikke logge ud', e, 'error');
		});
	};

	render = () => {
		return (
			<div>
				<Toolbar className={style['black-text']}>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<this.OsteDrawer />
			</div>
		);
	}
}

/*

						<Toolbar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<div className={style.avatarContainer} onClick={this.toggleDropdown}>
								<img className={style.avatar} src={session ? session.avatar : ''} />
							</div>
						</Toolbar.Section>

				<div className={[style.settingsDropdown, this.state.dropdownShown ? style.shown : ''].join(' ')}>
					<div className={style.cropText}>{session ? session.name : ''}</div>
					<div className={style.clickable} onClick={this.logout}>Logout</div>
				</div>
 */