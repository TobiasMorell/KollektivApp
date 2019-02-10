import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style.css';
import Backend from '../../Backend';
import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';
import linkState from 'linkstate';
import Fab from 'preact-material-components/Fab';
import toast from '../../components/toast';
import CookingCard from './CookingCard';
import ShoppingListItem from '../shopping/ShoppingListItem';

export default class Cooking extends Component {
	state = {
		schedule: []
	};
	domIds = {
		dialogNameId: 'menu-dialog-name',
		dialogMealId: 'menu-dialog-meal',
		dialogWeek: 'menu-dialog-week'
	};

	componentWillMount() {
		Backend.getMenuSchedule().then(r => {
			this.setState({ schedule: r });
		}).catch(e => {
			toast('Madplanen kunne ikke hentes', e, 'error');
		});
	}

	openEditMenu = (menu) => (e) => {
		this.setState({
			addNewItem: false,
			newChef: menu.Chef,
			newMeal: menu.Meal,
			newWeek: menu.Week
		});
		this.addItemDlg.MDComponent.show();
	};

	openAddMenu = () => {
		this.clearItemDialog();
		this.state.addNewItem = true;
		this.addItemDlg.MDComponent.show();
	};

	deleteItem = (menu) => () => {
		Backend.deleteMenuSchedule(menu).then(() => {
			toast(`Planen for uge ${menu.Week} blev slettet`);
			this.setState({ upForDeletion: menu });
		}).catch(e => {
			toast(`Planen for uge ${menu.Week} kunne ikke slettes`, e, 'error');
		});
	};

	clearItemDialog = () => {
		this.setState({
			addNewItem: undefined,
			newMeal: '',
			newChef: '',
			newWeek: ''
		});
	};

	confirmMenuDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('chef', this.state.newChef);
		fd.append('meal', this.state.newMeal);
		fd.append('week', this.state.newWeek);

		if (this.state.addNewItem) {
			Backend.addMenuSchedule(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ schedule: this.state.schedule.concat(r), editWare: undefined });
				}).catch(e => {
					toast('Kunne ikke tilføje madplan', e, 'error');
				});
		}
		else {
			Backend.updateMenuSchedule(fd)
				.then(r => {
					let newItems = this.state.schedule.filter(i => i.Week !== this.state.newWeek).concat(r);
					this.setState({ schedule: newItems, editWare: undefined });
					this.clearItemDialog();
				}).catch(e => {
					toast('Kunne ikke opdatere madplan', e, 'error');
				});
		}
	};

	focusOnEnter = id => e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			document.getElementById(id).focus();
		}
	};

	submitOnEnter = e => {
		if (e.key === 'Enter') {
			this.confirmMenuDialog(e);
			this.addItemDlg.MDComponent.close();
		}
	};

	render() {
		return (
			<div className={['appContainer', style.scollable].join(' ')}>
				{this.state.schedule.map(m => {
					if (m === this.state.upForDeletion){
						let item =  <CookingCard className={style.delete} menu={m} />;
						setTimeout(() => {
							this.setState({ schedule: this.state.schedule.filter(i => i.Week !== m.Week), upForDeletion: undefined });
						}, 510);
						return item;
					}
					return <CookingCard menu={m} openEditMenu={this.openEditMenu(m)} deleteItem={this.deleteItem(m)} />;
				})}

				<Dialog onAccept={this.confirmMenuDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{this.state.addNewItem ? 'Tilføj en madplan' : 'Rediger en madplan'}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.domIds.dialogNameId}
							onInput={linkState(this, 'newChef')} value={this.state.newChef} label="Lavet af"
							onkeydown={this.focusOnEnter(this.domIds.dialogMealId)} required
						/>
						<TextField className={style.wideInputField} id={this.domIds.dialogMealId}
							onInput={linkState(this, 'newMeal')} value={this.state.newMeal} label="Ret"
							onkeydown={this.focusOnEnter(this.domIds.dialogWeek)} required
						/>
						<TextField className={style.wideInputField} type="number" id={this.domIds.dialogWeek}
							onInput={linkState(this, 'newWeek')} value={this.state.newWeek} label="Uge Nummer"
							onkeydown={this.submitOnEnter} required
						/>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel >Annuller</Dialog.FooterButton>
						<Dialog.FooterButton accept >Gem</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>add</Fab.Icon></Fab>
			</div>
		);
	}
}
