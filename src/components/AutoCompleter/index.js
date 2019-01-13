import { h, Component } from 'preact';
import style from './style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';

export default class AutoCompleter extends Component {
	state = {
		autocompleting: false,
		currentInput: '',
		relevantItems: []
	};

	getRecommendation = () => this.state.currentInput;

	setRecommendation = (value) => {
		this.setState({ currentInput: value });
	};

	autocomplete = (e) => {
		let input;
		if (e.target.children.length)
			input = e.target.children[0].innerHTML;
		else
			input = e.target.innerHTML;
		this.setState({ currentInput: input });
		this.stopAutoComplete();
	};

	createItem(item) {
		return (
			<div onClick={this.autocomplete}><strong>{item}</strong></div>
		);
	}

	startAutoComplete = () => {
		this.setState({ autocompleting: true });
		this.onInput({ target: { value: '' } });
	};
	stopAutoComplete = () => {
		this.setState({ autocompleting: false });
	};

	onInput = (e) => {
		let newVal = e.target.value;

		let matches;
		if (this.state.allItems) {
			matches = newVal ? this.state.allItems.filter(item => item.includes(newVal)) : this.state.allItems;
		}
		else
			matches = [];
		this.setState({
			relevantItems: matches,
			currentInput: newVal
		});
	};

	addNewCategory = e => {
		this.setState({ autocompleting: false });
	};

	render({ items, className }) {
		this.state.allItems = items;

		let suggestions = this.state.relevantItems.length > 0 ?
			this.state.relevantItems.map(i => this.createItem(i)) :
			<div onClick={this.addNewCategory}><strong>No such category, click here to add it.</strong></div>;

		return (
			<div className={className}>
				<div className={style.autocomplete}>
					<TextField className={style.wideInputField} id="food-category-select" hintText="Category"
						onInput={this.onInput}
						required onfocusin={this.startAutoComplete} value={this.state.currentInput}
					/>
					<div className={[style['autocomplete-items'], this.state.autocompleting ? style.active : ''].join(' ')} >
						{suggestions}
					</div>
				</div>
			</div>
		);
	}
}