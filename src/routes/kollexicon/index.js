import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';
import linkState from 'linkstate';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import KollexiconRule from './KollexiconRule';
import toast from '../../components/toast';
import Dialog from 'preact-material-components/Dialog';
import Backend from '../../Backend';
import Fab from 'preact-material-components/Fab';

export default class Shopping extends Component {
	state = {
		rules: [],
		ruleSearch: ''
	};
	ids = {
		mdeArea: 'rule-description-area'
	};

	componentWillMount() {
		Backend.getKollexicon()
			.then(r => this.setState({ rules: r }))
			.catch(e => {
				toast('Reglerne kunne ikke hentes', e, 'error');
			});
	}

	_ruleList = () => {
		let relevantRules = this.state.rules;
		if (this.state.ruleSearch)
			relevantRules = this.state.rules.filter(
				r => r.Title.toLowerCase().includes(this.state.ruleSearch.toLowerCase()) ||
					r.Description.toLowerCase().includes(this.state.ruleSearch.toLowerCase()));

		return relevantRules.map(r => (<KollexiconRule title={r.Title} description={r.Description} expanded={this.state.ruleSearch !== ''}
			onEdit={this.openEditMenu(r)} onDelete={this.deleteRule(r)}
		                               />));
	};

	deleteRule = rule => e => {
		Backend.deleteKollexiconRule(rule).then(r => {
			toast(`${rule.Title} blev slettet`);
			this.setState({ rules: this.state.rules.filter(r => r.Id !== rule.Id) });
		}).catch(e => {
			toast(`${rule.Title} kunne ikke slettes`, e, 'error');
		});
	};

	openEditMenu = (rule) => e => {
		this.setState({
			addNewRule: false,
			editRule: rule,
			ruleTitle: rule.Title,
			ruleDescription: rule.Description
		});
		this.editRuleDlg.MDComponent.show();
	};

	openAddMenu = () => {
		this.clearItemDialog();
		this.state.addNewRule = true;
		this.editRuleDlg.MDComponent.show();
	};

	clearItemDialog = () => {
		this.setState({
			ruleTitle: '',
			editRule: undefined
		});
	};

	confirmItemDialog = (e) => {
		//TODO: Prevent dialog from hiding if errors
		let fd = new FormData();
		fd.append('title', this.state.ruleTitle);
		fd.append('description', this.state.ruleDescription);
		if (this.state.editRule)
			fd.append('id', this.state.editRule.Id);

		if (this.state.addNewRule) {
			Backend.addKollexiconRule(fd)
				.then(r => {
					this.clearItemDialog();
					this.setState({ rules: this.state.rules.concat(r).sort((a, b) => a.Title.localeCompare(b)), editRule: undefined });
				}).catch(e => {
					toast('Kunne ikke tilføje ny regl', e, 'error');
				});
		}
		else {
			Backend.updateKollexiconRule(fd)
				.then(r => {
					let newItems = this.state.rules.filter(i => i.Id !== this.state.editRule.Id).concat(r).sort((a, b) => a.Title.localeCompare(b));
					this.setState({ rules: newItems, editRule: undefined });
					this.clearItemDialog();
				}).catch(e => {
					toast('Kunne ikke opdatere regl', e, 'error');
				});
		}
	};

	focusElement = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.ruleDescriptionField.focus();
		}
	};

	_ruleEditorDialog = () => (
		<Dialog onAccept={this.confirmItemDialog} onCancel={this.clearItemDialog} ref={dlg => this.editRuleDlg= dlg} >
			<Dialog.Header>{this.state.editRule ? 'Rediger en regl' : 'Tilføj en ny regl'}</Dialog.Header>
			<Dialog.Body className={style.centerChildren}>
				<TextField className={style.wideInputField}
					onInput={linkState(this, 'ruleTitle')} value={this.state.ruleTitle} label="Titel"
					onkeydown={this.focusElement} required
				/>
				<TextField className={[style.wideInputField, style.ruleDescriptionArea].join(' ')} ref={rd => this.ruleDescriptionField = rd} textarea
					onInput={linkState(this, 'ruleDescription')} value={this.state.ruleDescription} label="Beskrivelse"
					required
				/>
			</Dialog.Body>
			<Dialog.Footer>
				<Dialog.FooterButton cancel onClick={this.deleteRule} className={[style.left].join(' ')}>Slet</Dialog.FooterButton>
				<Dialog.FooterButton cancel >Annuller</Dialog.FooterButton>
				<Dialog.FooterButton accept >Gem</Dialog.FooterButton>
			</Dialog.Footer>
		</Dialog>);

	render(props, state) {
		let rules = this._ruleList();

		return (
			<div className="appContainer">
				<Card>
					<div className={style.cardHeader}>
						<h2 className=" mdc-typography--title">Kolleksikon Regler</h2>
					</div>
					<div className={style.cardBody}>
						<TextField className={style.searchRules} type="text" onInput={linkState(this, 'ruleSearch')}
							label="Søg efter en regel" helperText="Lad boksen være tom for at vise alle regler."
						/>
						{rules}
					</div>
				</Card>
				<this._ruleEditorDialog />
				<Fab class={style.fabLowerRight} onClick={this.openAddMenu}><Fab.Icon>add</Fab.Icon></Fab>
			</div>
		);
	}
}
