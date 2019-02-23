import { h, Component } from 'preact';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import style from './style.css';
import linkState from 'linkstate';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import KollexiconRule from './KollexiconRule';
import toast from '../../components/toast';

export default class Shopping extends Component {
	state = {
		rules: [],
		ruleSearch: ''
	};
	componentWillMount() {
		fetch('/osteklokken/assets/rules.json')
			.then(r => {
				console.log(r);
				return r.json().then(j => this.setState({ rules: j }));
			})
			.catch(e => {
				toast('Reglerne kunne ikke hentes', e, 'error');
			});
	}

	_ruleList = () => {
		let relevantRules = this.state.rules;
		if (this.state.ruleSearch)
			relevantRules = this.state.rules.filter(
				r => r.title.toLowerCase().includes(this.state.ruleSearch.toLowerCase()) ||
					r.description.toLowerCase().includes(this.state.ruleSearch.toLowerCase()));

		return relevantRules.map(r => (
			<KollexiconRule title={r.title} description={r.description} expanded={this.state.ruleSearch !== ''} />
		));
	};

	render() {
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
			</div>
		);
	}
}
