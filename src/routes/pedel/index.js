import { h, Component } from 'preact';
import style from './style.css';
import Backend from '../../Backend';
import Dialog from 'preact-material-components/Dialog';
import TextField from 'preact-material-components/TextField';
import linkState from 'linkstate';
import Fab from 'preact-material-components/Fab';
import toast from '../../components/toast';
import FixCard from './FixCard';
import FormField from 'preact-material-components/FormField';
import Button from 'preact-material-components/Button';

export default class Cooking extends Component {
	state = {
		fixitItems: []
	};
	domIds = {
		dialogTitleId: 'menu-dialog-title',
		dialogDescId: 'menu-dialog-description',
		dialogImage: 'menu-dialog-image',
		dialogImageInput: 'menu-dialog-image-input'
	};

	componentWillMount() {
		Backend.getFixits().then(r => {
			this.setState({ fixitItems: r });
		}).catch(e => {
			toast('Pedellisten kunne ikke hentes', e, 'error');
		});
	}

	openEditMenu = (menu) => (e) => {
		this.setState({
			addNewItem: false,
			title: menu.Title,
			description: menu.Description,
			id: menu.Id
		});
		this.addItemDlg.MDComponent.show();
	};

	openAddMenu = () => {
		this.clearItemDialog();
		this.state.addNewItem = true;
		this.addItemDlg.MDComponent.show();
	};

	deleteItem = (fixit) => () => {
		Backend.deleteFixit(fixit).then(() => {
			toast(`Punktet '${fixit.Title}' blev slettet`);
			this.setState({ upForDeletion: fixit });
		}).catch(e => {
			toast(`Punktet '${fixit.Title}' kunne ikke slettes`, e, 'error');
		});
	};

	clearItemDialog = () => {
		this.setState({
			addNewItem: undefined,
			title: '',
			description: '',
			image: undefined,
			Id: undefined
		});
	};

	confirmMenuDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('title', this.state.title);
		fd.append('description', this.state.description);
		fd.append('image', this.state.image);

		if (this.state.addNewItem) {
			Backend.addFixit(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ fixitItems: this.state.fixitItems.concat(r), editItem: undefined });
				}).catch(e => {
					toast('Kunne ikke tilføje punktet til listen', e, 'error');
				});
		}
		else {
			fd.append('id', this.state.id);
			Backend.updateFixit(fd)
				.then(r => {
					//Force refresh the image
					r.ImagePath += '?' + new Date().getTime();

					let newItems = this.state.fixitItems.filter(i => i.Id !== r.Id).concat(r);
					this.setState({ fixitItems: newItems, editItem: undefined });
					this.clearItemDialog();
				}).catch(e => {
					toast('Kunne ikke opdatere punktet', e, 'error');
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

	onFileInput = (ev) => {
		console.log('askfjdhdsf djsaf ldhfas f');
		this.setState({ image: ev.target.files[0] });
	};

	render() {
		return (
			<div className={['appContainer', style.scrollable].join(' ')}>
				{this.state.fixitItems.map(f => {
					if (f === this.state.upForDeletion){
						let item =  <FixCard className={[style.delete, style.card].join(' ')} fixit={f} />;
						setTimeout(() => {
							this.setState({ fixitItems: this.state.fixitItems.filter(i => i.Id !== f.Id),
								upForDeletion: undefined });
						}, 510);
						return item;
					}
					return <FixCard fixit={f} className={style.card} openEditMenu={this.openEditMenu(f)} deleteItem={this.deleteItem(f)} />;
				})}

				<Dialog onAccept={this.confirmMenuDialog} onCancel={this.clearItemDialog}
					ref={addItemDlg => this.addItemDlg = addItemDlg}
				>
					<Dialog.Header>
						{this.state.addNewItem ? 'Tilføj et punkt på pedellisten' : 'Rediger et punkt på pedellisten'}
					</Dialog.Header>
					<Dialog.Body className={style.centerChildren}>
						<TextField className={style.wideInputField} id={this.domIds.dialogTitleId}
							onInput={linkState(this, 'title')} value={this.state.title} label="Hvad skal laves?"
							onkeydown={this.focusOnEnter(this.domIds.dialogDescId)} required
						/>
						<TextField className={style.wideInputField} id={this.domIds.dialogDescId}
							onInput={linkState(this, 'description')} value={this.state.description} label="Beskriv fejlen"
							onkeydown={this.focusOnEnter(this.domIds.dialogImage)} required textarea
						/>
						<FormField>
							<p>{this.state.image ? this.state.image.name : 'Du har ikke valgt et billede endnu'}</p>
							<Button className={style.wideInputField} id={this.domIds.dialogImage}
								onClick={e => this.fileUpload.click()}
								onkeydown={this.submitOnEnter} raised
							>
								Vælg et billede
							</Button>
							<input type="file" ref={fu => this.fileUpload = fu} style={{ display: 'none' }}
								   onInput={this.onFileInput}
							/>
						</FormField>
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel >Annuller</Dialog.FooterButton>
						<Dialog.FooterButton accept >Gem</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>assignment</Fab.Icon></Fab>
			</div>
		);
	}
}
