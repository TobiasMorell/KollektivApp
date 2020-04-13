import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import style from './style.css';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Icon/style.css';
import Backend from '../../Backend';
import toast from '../../components/toast';

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
		let active = !this.props.item.Active;
		Backend.setShoppingItemState(this.props.item, active).then(i => {
			this.props.item.Active = active;
			this.setState({ item: this.props.item });
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
		this.props.onEditItem(this.props.item);
	};

	removeFromList = (e) => {
		e.stopPropagation();
		Backend.deleteShoppingItem(this.props.item).then(() => {
			this.props.onDelete(this.props.item);
		}).catch(e => {
			toast('Varen kunne ikke slettes', e.toString(), 'Snak med Tobias - måske er serveren offline');
			console.error(e);
		});
	};

	clickHandler = () => /Mobi|Android/i.test(navigator.userAgent) ? undefined : this.toggleListItemTick;

	render({ item, onEditItem, category, onDelete, className }, { listItemIcon }, context) {
		let checkBoxIcon = checkboxIcons.unchecked;
		if (item.Active)
			checkBoxIcon = checkboxIcons.checked;

		return (
			<List.Item className={[style.shoppingListItem, className].join(' ')} onClick={this.clickHandler()} ontouchstart={this.startEditTimer}
				ontouchmove={this.abortEditTimer()} ontouchend={this.abortEditTimer(true)}
			>
				<List.ItemGraphic>{listItemIcon}</List.ItemGraphic>
				<span>{item.Name}</span>
				<span className={style.listEndCenter}>
					<Icon className={style.checkbox}>{checkBoxIcon}</Icon>
					<Icon className={[style.onlyDesktop, style.primaryOnHover].join(' ')} onClick={this.openEdit}>edit</Icon>
					<Icon className={[style.onlyDesktop, style.primaryOnHover].join(' ')} onClick={this.removeFromList} >delete_forever</Icon>
				</span>
			</List.Item>
		);
	}
}