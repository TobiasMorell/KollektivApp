import { Component } from 'preact';
import style from './style.css';
import Backend from '../../Backend';
import { Dialog, TextField, Fab } from 'preact-material-components';
import linkState from 'linkstate';
import toast from '../../components/toast';
import CookingCard from './CookingCard';

const dateSort = (m1, m2) => new Date(m2.Week) - new Date(m1.Week);

export default class Cooking extends Component {
	state = {
		schedule: [],
		editMenu: {}
	};
	domIds = {
		dialogTitleId: 'menu-dialog-name',
		dialogDescId: 'menu-dialog-meal',
		dialogImage: 'menu-dialog-week'
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
			editMenu: Object.assign({}, menu)
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
			toast(`Planen for uge ${menu.Meal} blev slettet`);
			this.setState({ upForDeletion: menu });
		}).catch(e => {
			toast(`Planen for uge ${menu.Meal} kunne ikke slettes`, e, 'error');
		});
	};

	clearItemDialog = () => {
		this.setState({
			addNewItem: undefined,
			editMenu: {
				Id: '',
				Meal: '',
				Chef: '',
				Date: new Date(),
				Price: 0
			}
		});
	};

	confirmMenuDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('meal', this.state.editMenu.Meal);
		fd.append('price', this.state.editMenu.Price);
		fd.append('date', this.state.editMenu.Date);

		if (this.state.addNewItem) {
			Backend.addMenuSchedule(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ schedule: this.state.schedule.concat(r), editItem: undefined });
				}).catch(e => {
					toast('Kunne ikke tilføje madplan', e, 'error');

				});
		}
		else {
			fd.append('id', this.state.editMenu.Id);
			Backend.updateMenuSchedule(fd)
				.then(r => {
					let newItems = this.state.schedule.filter(i => i.Id !== this.state.editMenu.Id).concat(r).sort(dateSort);
					this.setState({ schedule: newItems, editItem: undefined });
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

	attend = (meal) => e => {
		Backend.attendMeal(meal).then(r => {
			// Remove the old instane of the week in the schedule, add the new and sort by week
			let s = this.state.schedule.filter(c => c.Id !== r.Id).concat(r).sort(dateSort);
			this.setState({ schedule: s });
		}).catch(e => {
			toast(e, undefined, 'error');
		});
	};

	cancelAttendance = (meal) => e => {
		Backend.cancelAttendanceOnMeal(meal).then(r => {
			// Remove the old instane of the week in the schedule, add the new and sort by week
			let s = this.state.schedule.filter(c => c.Id !== r.Id).concat(r).sort(dateSort);
			this.setState({ schedule: s });
		}).catch(e => {
			toast(e, undefined, 'error');
		});
	};

	render(props, state) {
		return (
			<div className={['appContainer', style.scollable].join(' ')}>
				<div className={style.cookingList}>
					{state.schedule.map(m => {
						if (m === state.upForDeletion){
							let item =  <CookingCard className={style.delete} menu={m} />;
							setTimeout(() => {
								this.setState({ schedule: state.schedule.filter(i => i.Id !== m.Id), upForDeletion: undefined });
							}, 510);
							return item;
						}
						return (<CookingCard menu={m} openEditMenu={this.openEditMenu(m)} deleteItem={this.deleteItem(m)}
							session={Backend.getSessionDetails()} onAttend={this.attend(m)} onCancel={this.cancelAttendance(m)}
						        />);
					})}
				</div>

				<Dialog onAccept={this.confirmMenuDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{state.addNewItem ? 'Tilføj en madplan' : 'Rediger en madplan'}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.domIds.dialogMealId}
							onInput={linkState(this, 'editMenu.Meal')} value={state.editMenu.Meal} label="Ret"
							onkeydown={this.focusOnEnter('menu-price')} required
						/>
						<TextField className={style.wideInputField} type="number" step="1" id="menu-price"
							onInput={linkState(this, 'editMenu.Price')} value={state.editMenu.Price} label="Forventet pris"
							onkeydown={this.focusOnEnter('menu-date')} required
						/>
						<TextField className={style.wideInputField} type="date" id="menu-date"
							onInput={linkState(this, 'editMenu.Date')} value={state.editMenu.Date} label="Dato"
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
