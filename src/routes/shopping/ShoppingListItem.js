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
const editHoldTime = 1000;

export default class ShoppingListItem extends Component {
	state = {
		listItemIcon: 'fastfood',
		editTimer: null
	};
	editTimer = null;

	toggleListItemTick = (e) => {
		let active = !this.state.item.Active;
		Backend.setShoppingItemState(this.state.item, active).then(i => {
			this.state.item.Active = active;
			this.setState({ item: this.state.item });
		});
	};

	//TODO: Check if user swipes, cancel timeout if so

	startEditTimer = () => {
		this.editTimer = setTimeout(() => {
			this.editTimer = null;
			this.openEdit();
		}, editHoldTime);
	};
	abortEditTimer = (takeAction = false) => e => {
		if (this.editTimer) {
			clearTimeout(this.editTimer);
			this.editTimer = null;
			if (takeAction)
				this.toggleListItemTick();
		}
	};
	openEdit = (e) => {
		if (e)
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

	clickHandler = () => {
		return /Mobi|Android/i.test(navigator.userAgent) ? undefined : this.toggleListItemTick;
	};

	render({ item, onEditItem, category, onDelete, className }) {
		let checkBoxIcon = checkboxIcons.unchecked;
		this.onEditItem = onEditItem;
		this.onDelete = onDelete;
		this.state.item = item;
		this.state.category = category;
		if (item.Active)
			checkBoxIcon = checkboxIcons.checked;

		return (
			<List.Item className={[style.shoppingListItem, className].join(' ')} onClick={this.clickHandler()} ontouchstart={this.startEditTimer}
				ontouchmove={this.abortEditTimer()} ontouchend={this.abortEditTimer(true)}
			>
				<List.ItemGraphic>{this.state.listItemIcon}</List.ItemGraphic>
				<span>{this.state.item.Name}</span>
				<span className={style.listEndCenter}>
					<Icon className={style.checkbox}>{checkBoxIcon}</Icon>
					<Icon className={[style.onlyDesktop, style.primaryOnHover].join(' ')} onClick={this.openEdit}>edit</Icon>
					<Icon className={[style.onlyDesktop, style.primaryOnHover].join(' ')} onClick={this.removeFromList} >delete_forever</Icon>
				</span>
			</List.Item>
		);
	}
}