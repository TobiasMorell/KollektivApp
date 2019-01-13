import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import style from './style.css';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Icon/style.css';
import Backend from '../../Backend';

const checkboxIcons = {
	checked: 'check_box',
	unchecked: 'check_box_outline_blank'
};
const editHoldTime = 1500;

export default class ShoppingListItem extends Component {
	state = {
		listItemIcon: 'fastfood',
		editTimer: null
	};

	toggleListItemTick = (e) => {
		let active = !this.state.item.Active;
		Backend.setShoppingItemState(this.state.item, active).then(i => {
			this.state.item.Active = active;
			this.setState({ item: this.state.item });
		});
	};

	//TODO: Check if user swipes, cancel timeout if so

	startEditTimer = () => {
		console.log('start timer');
		this.state.editTimer = setTimeout(() => {
			console.log('edit');
			this.state.editTimer = null;
			this.openEdit();
		}, editHoldTime);
	};
	abortEditTimer = () => {
		console.log('aborting');
		if (this.state.editTimer) {
			clearTimeout(this.state.editTimer);
			this.toggleListItemTick();
		}
	};
	openEdit = (e) => {
		e.stopPropagation();
		this.onEditItem(this.state.item);
	};

	removeFromList = (e) => {
		e.stopPropagation();
		Backend.deleteShoppingItem(this.state.item).then(() => {
			this.onDelete(this.state.item);
		}).catch(e => {
			//App.Snackbar.MDComponent.show({message: e});
		});
	};

	render({ item, onEditItem, category, onDelete }) {
		let checkBoxIcon = checkboxIcons.unchecked;
		this.onEditItem = onEditItem;
		this.onDelete = onDelete;
		this.state.item = item;
		this.state.category = category;
		if (item.Active)
			checkBoxIcon = checkboxIcons.checked;

		return (
			<List.Item class={style.shoppingListItem} onClick={this.toggleListItemTick} ontouchstart={this.startEditTimer} ondragstart={this.abortEditTimer} ontouchend={this.abortEditTimer}>
				<List.ItemGraphic>{this.state.listItemIcon}</List.ItemGraphic>
				<span>{this.state.item.Name}</span>
				<span class={style.listEndCenter}>
					<Icon class={style.checkbox}>{checkBoxIcon}</Icon>
					<Icon className={[style.onlyDesktop, style.primaryOnHover].join(' ')} onClick={this.openEdit}>edit</Icon>
					<Icon className={style.primaryOnHover} onClick={this.removeFromList} >delete_forever</Icon>
				</span>
			</List.Item>
		);
	}
}