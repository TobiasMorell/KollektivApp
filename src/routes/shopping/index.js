import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import 'preact-material-components/Button/style.css';
import Fab from 'preact-material-components/Fab';
import 'preact-material-components/Fab/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import style from './style.css';
import ShoppingListItem from './ShoppingListItem';
import Backend from '../../Backend';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import AutoCompleter from '../../components/AutoCompleter';
import linkState from 'linkstate';
import App from '../../components/app';

function uniqueFunc(v, i, self) {
	return self.indexOf(v) === i;
}

export default class Shopping extends Component {
	state = {
		items: null,
		addNewItem: false,
		newName: '',
		itemNameId: 'item-name-field'
	};
	componentWillMount() {
		Backend.getShoppingListItems().then(i => {
			if (!i)
				i = [];
			this.setState({
				items: i
			});
		}).catch(e => {
			App.Snackbar.MDComponent.show('Could not get shopping list');
		});
	}

	openEditMenu = (ware) => {
		this.setState({
			addNewItem: false,
			editWare: ware,
			newName: ware.Name
		});
		this.autoCompleter.setRecommendation(ware.Category);
		this.addItemDlg.MDComponent.show();
	};

	openAddMenu = () => {
		this.clearItemDialog();
		this.state.addNewItem = true;
		this.addItemDlg.MDComponent.show();
	};

	deleteItem = (item) => {
		this.setState({ items: this.state.items.filter(i => i.Id !== item.Id) });
	};

	createShoppingList = () => {
		if (!this.state.items || this.state.items.length === 0)
			return;

		let list = [];
		//Find all unique categories
		let categories = this.state.items.map(i => i.Category).filter((v,i,a) => a.indexOf(v) === i);

		categories.forEach(c => {
			let wares = this.state.items.filter(i => i.Category === c);

			list.push(
				<div>
					<label>{c}</label>
					<List class={style.revertMargin} Avatar>
						{this.createListItems(c, wares)}
					</List>
				</div>
			);
		});
		return list;
	};

	clearItemDialog = () => {
		this.setState({
			addNewItem: false,
			newName: ''
		});
	};

	confirmItemDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('name', this.state.newName);
		fd.append('category', this.autoCompleter.getRecommendation());
		if (this.state.editWare)
			fd.append('id', this.state.editWare.Id);
		console.log(this.state);
		fd.forEach(i => console.log(i));

		if (this.state.addNewItem) {
			Backend.addShoppingListItem(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ items: this.state.items.concat(r) });
				}).catch(e => {});
		}
		else {
			Backend.updateShoppingListItem(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ items: this.state.items.filter(i => i.Id !== this.state.editWare.Id).concat(r) });
				}).catch(e => {});
		}
	};

	createListItems(category, wares) {
		let wareList = [];

		for (const ware of wares) {
			wareList.push(
				<ShoppingListItem item={ware} onEditItem={this.openEditMenu} category={category} onDelete={this.deleteItem} />
			);
		}
		return wareList;
	}

	render() {
		return (
			<div className="appContainer">
				<h2>{window.lang.shoppingList}</h2>
				{this.createShoppingList()}

				<Dialog onAccept={this.confirmItemDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{window.lang.addToShoppingList}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.state.itemNameId} onInput={linkState(this, 'newName')} value={this.state.newName} label="Name" required />
						<AutoCompleter ref={ac => this.autoCompleter = ac} className={style.wideInputField}
							items={this.state.items ? this.state.items.map(i => i.Category).filter((v,i,a) => a.indexOf(v) === i) : []}
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel >{window.lang.decline}</Dialog.FooterButton>
						<Dialog.FooterButton accept >{window.lang.accept}</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>add_shopping_cart</Fab.Icon></Fab>
			</div>
		);
	}
}
