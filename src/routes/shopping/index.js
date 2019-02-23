import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import Fab from 'preact-material-components/Fab';
import List from 'preact-material-components/List';
import style from './style.css';
import ShoppingListItem from './ShoppingListItem';
import Backend from '../../Backend';
import Dialog from 'preact-material-components/Dialog';
import Icon from 'preact-material-components/Icon';
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
			toast(`${item.Name} blev slettet`);
			this.setState({ upForDeletion: item });
		}).catch(e => {
			toast(`${item.Name} kunne ikke slettes`, e, 'error');
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
				}).catch(e => {
					toast('Kunne ikke tilføje til indkøbslisten', e, 'error');
				});
		}
		else {
			Backend.updateShoppingListItem(fd)
				.then(r => {
					let newItems = this.state.items.filter(i => i.Id !== this.state.editWare.Id).concat(r);
					this.setState({ items: newItems, editWare: undefined });
					this.clearItemDialog();
				}).catch(e => {
					toast('Kunne ikke opdatere punkt', e, 'error');
				});
		}
	};

	createListItems(category, wares) {
		let wareList = [];

		for (const ware of wares) {
			if (ware === this.state.upForDeletion) {
				let item =  <ShoppingListItem item={ware} className={style.delete} />;
				setTimeout(() => {
					this.setState({ items: this.state.items.filter(i => i.Id !== ware.Id), upForDeletion: undefined });
				}, 810);
				wareList.push(item);
			}
			else
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

	focusElement = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.autoCompleter.focus();
		}
	};

	render() {
		return (
			<div className={['appContainer', style.scrollable].join(' ')}>
				<h2 className={style.title}>Indkøbsliste</h2>
				<div className={['mdc-typography--caption', style.description].join(' ')}>
					<div><Icon>check_box_outline_blank</Icon><span className={style.alignIconCenter}>: Varen er ikke tilføjet til listen.</span></div>
					<div><Icon>check_box</Icon><span className={style.alignIconCenter}>: Varen er tilføjet til listen.</span></div>
				</div>
				{this.createShoppingList()}

				<Dialog onAccept={this.confirmItemDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{this.state.addNewItem ? 'Tilføj til indkøbslisten' : 'Rediger indkøbslistepunkt'}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.state.itemNameId}
							onInput={linkState(this, 'newName')} value={this.state.newName} label="Navn"
							onkeydown={this.focusElement} required
						/>
						<AutoCompleter ref={ac => this.autoCompleter = ac} className={style.wideInputField} hintText="Vælg en kategori" allowAddNewItems
							items={this.state.items ? this.state.items.map(i => i.Category).filter((v,i,a) => a.indexOf(v) === i) : []}
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel onClick={this.deleteItemMobile} className={[style.onlyMobile, style.left].join(' ')}>Slet</Dialog.FooterButton>
						<Dialog.FooterButton cancel >Annuller</Dialog.FooterButton>
						<Dialog.FooterButton accept >Gem</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>add_shopping_cart</Fab.Icon></Fab>
			</div>
		);
	}
}
