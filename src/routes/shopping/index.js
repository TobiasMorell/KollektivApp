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
import Select from 'preact-material-components/Select';
import 'preact-material-components/Select/style.css';

export default class Shopping extends Component {
	state = {
		items: null,
		chosenCategory: 'Household',
		addNewItem: false
	};
	componentWillMount() {
		Backend.getShoppingListItems().then(i => {
			this.setState({
				items: i
			});
		});
	}

	createListItems(category, wares) {
		let wareList = [];

		for (const ware of wares) {
			wareList.push (
				<ShoppingListItem item={ware} onEditItem={this.openEditMenu} category={category} />
			);
		}
		return wareList;
	}

	openEditMenu = (name, category, target) => {
		this.state.addNewItem = false;
		this.addItemDlg.MDComponent.show();
		document.getElementById('new-item-name').value = name;
		document.getElementById('food-category-select').firstChild.value = category;
		this.target = target;
		this.state.oldCategory = category;
		this.state.oldName = name;
		this.state.chosenCategory = category;
	};

	createShoppingList = () => {
		if (!this.state.items)
			return;

		let list = [];

		Object.entries(this.state.items).forEach(([category, wares]) => {
			list.push(
				<div>
					<label>{category}</label>
					<List class={style.revertMargin} Avatar>
						{this.createListItems(category, wares)}
					</List>
				</div>
			);
		});
		return list;
	};

	createShoppingCategories = () => {
		if (!this.state.items)
			return;

		let list = [];
		Object.entries(this.state.items).forEach(([catefory, wares]) => {
			console.log(catefory);
			list.push(
				<Select.Item>{catefory}</Select.Item>
			);
		});

		return list;
	};

	onCategorySelectChange = (a, b, c) => {
		let s = document.getElementById('food-category-select');
		this.state.chosenCategory = s.firstChild.value;
	};

	showAddItemDialog = () => {
		document.getElementById('food-category-select').firstChild.value = '';
		document.getElementById('new-item-name').value = '';
		this.state.addNewItem = true;
		this.addItemDlg.MDComponent.show();
	};

	confirmItemDialog = (e) => {
		let n = document.getElementById('new-item-name');
		if (!n.value)
		{
			//TODO: Prevent dialog from hiding
			this.addItemDlg.MDComponent.show();
			//TODO: Add error message
			return;
		}
		if (this.state.addNewItem) {
			let itemsInCat = this.state.items[this.state.chosenCategory];
			if (itemsInCat.includes(n.value))
				return; //TODO: Add error message

			Backend.addShoppingListItem(n.value, this.state.chosenCategory)
				.then(r => {
					itemsInCat.push(n.value);
					this.setState({ items: this.state.items });
				})
				.catch(e => {
					//TODO: Add error message
				});
		}
		else {
			Backend.updateShoppingListItem(this.state.oldName, n.value, this.state.chosenCategory)
				.then(r => {
					let oldItems = this.state.items[this.state.oldCategory];
					let index = oldItems.indexOf(this.state.oldName);
					if (index !== -1) oldItems.splice(index, 1);

					this.state.items[this.state.chosenCategory].push(n.value);
					this.setState({ items: this.state.items });
				})
				.catch(e => {

				});
		}
	};

	render() {
		return (
			<div class="appContainer">
				<h2>{window.lang.shoppingList}</h2>
				{this.createShoppingList()}

				<Dialog onAccept={this.confirmItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{window.lang.addToShoppingList}</Dialog.Header>
					<Dialog.Body>
						<TextField id="new-item-name" label="Name" required />
						<Select class={style.hideFirstOption} id="food-category-select" hintText="Category"
							onChange={this.onCategorySelectChange}
						>
							{this.createShoppingCategories()}
						</Select>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel >{window.lang.decline}</Dialog.FooterButton>
						<Dialog.FooterButton accept >{window.lang.accept}</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.showAddItemDialog}><Fab.Icon>add_shopping_cart</Fab.Icon></Fab>
			</div>
		);
	}
}
