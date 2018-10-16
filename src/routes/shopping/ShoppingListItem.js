import { h, Component } from 'preact';
import List from 'preact-material-components/List';
import style from './style.css';

const checkboxIcons = {
	checked: 'check_box',
	unchecked: 'check_box_outline_blank'
};
const editHoldTime = 1500;

export default class ShoppingListItem extends Component {
	state = {
		listItemIcon: 'fastfood',
		listItemState: checkboxIcons.unchecked,
		editTimer: null
	};

	toggleListItemTick = () => {
		this.setState({
			listItemState: this.state.listItemState === checkboxIcons.checked ?
				checkboxIcons.unchecked : checkboxIcons.checked
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
	openEdit = () => {
		this.onEditItem(this.state.item, this.state.category, this);
	};

	render({ item, onEditItem, category }) {
		this.onEditItem = onEditItem;
		this.state.item = item;
		this.state.category = category;
		return (
			<List.Item class={style.shoppingListItem} ontouchstart={this.startEditTimer} ondragstart={this.abortEditTimer} ontouchend={this.abortEditTimer}>
				<List.ItemGraphic>{this.state.listItemIcon}</List.ItemGraphic>
				<span>{this.state.item}</span>
				<span class={style.listEndCenter}>
					<i class="material-icons">{this.state.listItemState}</i>
				</span>
			</List.Item>
		);
	}
}