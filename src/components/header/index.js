import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Toolbar/style.css';
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

	linkTo = path => () => {
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

	render() {
		return (
			<div>
				<Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon menu onClick={this.openDrawer}>
								menu
							</Toolbar.Icon>
							<img className={style.img} src="/assets/osteklokken-logo.png"/>
							<Toolbar.Title/>
						</Toolbar.Section>
						<Toolbar.Section align-end shrink-to-fit onClick={this.openSettings}>
							<Toolbar.Icon>settings</Toolbar.Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<Drawer.TemporaryDrawer ref={this.drawerRef}>
					<Drawer.DrawerContent>
						<Drawer.DrawerItem onClick={this.goHome}>
							<List.ItemGraphic>home</List.ItemGraphic>
							{window.lang.news}
						</Drawer.DrawerItem>
						<Drawer.DrawerItem onClick={this.goToShopping}>
							<List.ItemGraphic>shopping_cart</List.ItemGraphic>
							{window.lang.shoppingList}
						</Drawer.DrawerItem>
						<Drawer.DrawerItem onClick={this.goToCooking}>
							<List.ItemGraphic>fastfood</List.ItemGraphic>
							{window.lang.cooking}
						</Drawer.DrawerItem>
						<Drawer.DrawerItem onClick={this.goToMyProfile}>
							<List.ItemGraphic>account_circle</List.ItemGraphic>
							{window.lang.profile}
						</Drawer.DrawerItem>
					</Drawer.DrawerContent>
				</Drawer.TemporaryDrawer>
				<Dialog ref={this.dialogRef}>
					<Dialog.Header>{window.lang.settings}</Dialog.Header>
					<Dialog.Body>
						<div>
							{window.lang.darkTheme} <Switch onClick={this.toggleDarkTheme} />
						</div>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton accept>{window.lang.ok}</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}
