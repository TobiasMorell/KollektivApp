import { h, Component } from 'preact';
import style from './style.css';
import Backend from '../../Backend';
import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';
import linkState from 'linkstate';
import Fab from 'preact-material-components/Fab';
import toast from '../../components/toast';
import CookingCard from './CookingCard';
import Select from 'preact-material-components/Select';

function weekdayToIndex (weekday) {
	switch (weekday) {
		case 'Mandag': return 0;
		case 'Tirsdag': return 1;
		case 'Onsdag': return 2;
		case 'Torsdag': return 3;
		case 'Fredag': return 4;
		case 'Lørdag': return 5;
		case 'Søndag': return 6;
		default: return 0;
	}
}

export default class Cooking extends Component {
	state = {
		schedule: []
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
			addNewItem: false,
			newMeal: menu.Meal,
			newWeek: menu.Week,
			newWeekday: menu.Day,
			selectedIndex: weekdayToIndex(menu.Day)
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
			newWeek: '',
			newWeekday: ''
		});
	};

	confirmMenuDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('meal', this.state.newMeal);
		fd.append('week', this.state.newWeek);
		fd.append('weekday', this.state.newWeekday);

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
			Backend.updateMenuSchedule(fd)
				.then(r => {
					let newItems = this.state.schedule.filter(i => i.Week !== this.state.newWeek).concat(r).sort((c1, c2) => c1.Week - c2.Week);
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
			toast(r);
		}).catch(e => {
			toast(e, undefined, 'error');
		});
	};

	cancelAttendance = (meal) => e => {
		Backend.cancelAttendanceOnMeal(meal).then(toast).catch(e => {
			toast(e, undefined, 'error');
		});
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
					return (<CookingCard menu={m} openEditMenu={this.openEditMenu(m)} deleteItem={this.deleteItem(m)}
						session={Backend.getSessionDetails()} onAttend={this.attend(m)} onCancel={this.cancelAttendance(m)}
					        />);
				})}

				<Dialog onAccept={this.confirmMenuDialog} onCancel={this.clearItemDialog} ref={addItemDlg => this.addItemDlg = addItemDlg} >
					<Dialog.Header>{this.state.addNewItem ? 'Tilføj en madplan' : 'Rediger en madplan'}</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.domIds.dialogMealId}
							onInput={linkState(this, 'newMeal')} value={this.state.newMeal} label="Ret"
							onkeydown={this.focusOnEnter(this.domIds.dialogWeek)} required
						/>
						<TextField className={style.wideInputField} type="number" id={this.domIds.dialogWeek}
							onInput={linkState(this, 'newWeek')} value={this.state.newWeek} label="Uge Nummer"
							onkeydown={this.submitOnEnter} required
						/>
						<div className={style.wideInputField}>
							<Select hintText="Vælg en ugedag"
								selectedIndex={this.state.chosenIndex}
								onChange={e => {
									this.setState({ chosenIndex: e.target.selectedIndex, newWeekday: e.target.value });
								}}
							>
								<Select.Item value="Monday">Mandag</Select.Item>
								<Select.Item value="Tuesday">Tirsdag</Select.Item>
								<Select.Item value="Wednesday">Onsdag</Select.Item>
								<Select.Item value="Thursday">Torsdag</Select.Item>
								<Select.Item value="Friday">Fredag</Select.Item>
								<Select.Item value="Saturday">Lørdag</Select.Item>
								<Select.Item value="Sunday">Søndag</Select.Item>
							</Select>
						</div>
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
