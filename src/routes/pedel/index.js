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
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

export default class Cooking extends Component {
	state = {
		fixitItems: [],
		editImage: false
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
		this.cropper.getCroppedCanvas().toBlob(croppedImage => {
			fd.append('image', croppedImage);

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
		});
	};

	focusOnEnter = id => e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			document.getElementById(id).focus();
		}
	};

	onFileInput = (ev) => {
		let files = ev.target.files;
		if (files && files[0]) {
			if (files[0].type.match(/^image\//) ) {
				let reader = new FileReader();
				let THIS = this;

				reader.onload = evt => {
					let img = new Image();
					let context = this.imageCropper.getContext('2d');

					img.onload = function() {
						context.canvas.height = img.height;
						context.canvas.width  = img.width;
						context.drawImage(img, 0, 0);

						THIS.setState({ editImage: true });

						THIS.cropper = new Cropper(context.canvas, {
							aspectRatio: 1
						});
					};
					img.src = evt.target.result;
				};
				reader.readAsDataURL(files[0]);
			}
			else {
				toast('Forkert filtype valgt', 'Vælg venligst et billede', 'error');
			}
		}
		else {
			toast('Du har ikke uploadet nogen filer', undefined, 'warning');
		}
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
						<div style={{ display: this.state.editImage ? 'none' : 'inherit' }}>
							<TextField className={style.wideInputField} id={this.domIds.dialogTitleId}
								onInput={linkState(this, 'title')} value={this.state.title} label="Hvad skal laves?"
								onkeydown={this.focusOnEnter(this.domIds.dialogDescId)} required
							/>
							<TextField className={style.wideInputField} id={this.domIds.dialogDescId}
								onInput={linkState(this, 'description')} value={this.state.description} label="Beskriv fejlen"
								onkeydown={this.focusOnEnter(this.domIds.dialogImage)} required textarea
							/>
							<p>{this.state.image ? this.state.image.name : 'Du har ikke valgt et billede endnu'}</p>
							<Button className={style.wideInputField} id={this.domIds.dialogImage}
								onClick={e => this.fileUpload.click()} raised
							>
							Vælg et billede
							</Button>
							<input type="file" ref={fu => this.fileUpload = fu} style={{ display: 'none' }}
								onInput={this.onFileInput}
							/>
						</div>
						<div style={{ display: this.state.editImage ? 'inherit' : 'none', 'max-height': '500px' }}>
							<canvas ref={img => this.imageCropper = img} />
						</div>
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
