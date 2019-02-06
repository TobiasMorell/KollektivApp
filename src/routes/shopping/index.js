import { h, Component } from 'preact';
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
import AutoCompleter from 'preact-material-autocompleter';
import linkState from 'linkstate';
import toast from '../../components/toast';

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
			toast('Indkøbslisten kunne ikke hentes', e, 'error');
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
		Backend.deleteShoppingItem(item).then(() => {
			toast(`${item.name} blev slettet`);
			this.setState({ items: this.state.items.filter(i => i.Id !== item.Id) });
		}).catch(e => {
			toast(`${item.name} kunne ikke slettes`, e, 'error');
		});
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
		this.autoCompleter.setRecommendation('');
		this.setState({
			addNewItem: false,
			newName: '',
			editWare: undefined
		});
	};

	confirmItemDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('name', this.state.newName);
		fd.append('category', this.autoCompleter.getRecommendation());
		if (this.state.editWare)
			fd.append('id', this.state.editWare.Id);

		if (this.state.addNewItem) {
			Backend.addShoppingListItem(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ items: this.state.items.concat(r), editWare: undefined });
				}).catch(e => {});
		}
		else {
			Backend.updateShoppingListItem(fd)
				.then(r => {
					let newItems = this.state.items.filter(i => i.Id !== this.state.editWare.Id).concat(r);
					this.setState({ items: newItems, editWare: undefined });
					this.clearItemDialog();
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

	deleteItemMobile = e => {
		this.deleteItem(this.state.editWare);
		this.clearItemDialog();
		this.addItemDlg.MDComponent.close();
	};

	render() {
		return (
			<div className="appContainer">
				<h2>Indkøbsliste</h2>
				{this.createShoppingList()}

				<Dialog onAccept={this.confirmItemDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{this.state.addNewItem ? 'Tilføj til indkøbslisten' : 'Rediger indkøbslistepunkt'}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.state.itemNameId} onInput={linkState(this, 'newName')} value={this.state.newName} label="Name" required />
						<AutoCompleter ref={ac => this.autoCompleter = ac} className={style.wideInputField}
							items={this.state.items ? this.state.items.map(i => i.Category).filter((v,i,a) => a.indexOf(v) === i) : []}
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel onClick={this.deleteItemMobile} className={[style.onlyMobile, style.left].join(' ')}>Slet</Dialog.FooterButton>
						<Dialog.FooterButton cancel >Afslå</Dialog.FooterButton>
						<Dialog.FooterButton accept >Accepter</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>add_shopping_cart</Fab.Icon></Fab>
			</div>
		);
	}
}
