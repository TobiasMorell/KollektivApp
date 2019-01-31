import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';

import 'preact-material-components/style.css';
import style from './style.css';

export default class Header extends Component {
	closeDrawer() {
		this.drawer.MDComponent.open = false;
		this.state = {
			darkThemeEnabled: false
		};
	}

	openDrawer = () => (this.drawer.MDComponent.open = true);

	openSettings = () => this.dialog.MDComponent.show();

	drawerRef = drawer => (this.drawer = drawer);
	dialogRef = dialog => (this.dialog = dialog);
	currentTab = '';

	linkTo = path => () => {
		this.currentTab = path.replace('/', '');

		route(path);
		this.closeDrawer();
	};

	goHome = this.linkTo('/');
	goToMyProfile = this.linkTo('/profile');
	goToShopping = this.linkTo('/shopping');
	goToCooking = this.linkTo('/cooking');

	toggleDarkTheme = () => {
		this.setState(
			{
				darkThemeEnabled: !this.state.darkThemeEnabled
			},
			() => {
				if (this.state.darkThemeEnabled) {
					document.body.classList.add('mdc-theme--dark');
				}
				else {
					document.body.classList.remove('mdc-theme--dark');
				}
			}
		);
	};

	DrawerItem = ({ onSelected, icon, text, selected } ) => (
		<Drawer.DrawerItem onClick={onSelected} selected={selected} class={selected ? style['black-text'] : ''}>
			<List.ItemGraphic>{icon}</List.ItemGraphic>
			{text}
		</Drawer.DrawerItem>);


	OsteDrawer = ({ }) => (
		<Drawer modal ref={this.drawerRef}>
			<Drawer.DrawerContent>
				<this.DrawerItem onSelected={this.goHome} icon="home" text="Nyheder" selected={this.currentTab === ''} />
				<this.DrawerItem onSelected={this.goToShopping} icon="shopping_cart" text="Indkøbsliste" selected={this.currentTab === 'shopping'} />
				<this.DrawerItem onSelected={this.goToCooking} icon="fastfood" text="Madlavning" selected={this.currentTab === 'cooking'} />
				<this.DrawerItem onSelected={this.goToMyProfile} icon="account_circle" text="Profil" selected={this.currentTab === 'profile'} />
			</Drawer.DrawerContent>
		</Drawer>);

	render() {
		return (
			<div>
				<Toolbar className={style['black-text']}>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
							<Toolbar.Title>Osteklokken App</Toolbar.Title>
						</Toolbar.Section>
						<Toolbar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<Toolbar.Icon class={style['black-text']}>settings</Toolbar.Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<this.OsteDrawer />
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>Indstillinger</Dialog.Header>
					<Dialog.Body>
						<div>
							Anvend mørkt tema<Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>OK</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
