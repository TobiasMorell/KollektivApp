import { Component } from 'preact';
import style from './style.css';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Icon/style.css';
import Markdown from 'preact-markdown';

export default class KollexiconRule extends Component {
	toggleExpansion = e => {
		this.setState({
			expanded: !this.state.expanded,
			expansionAnimation: this.state.expanded ? '' : 'expandAnimation'
		});
	};

	resetAnimation = () => {
		if (this.icon) {
			let e = this.icon.base;
		}
	};

	//TODO: Implement _text_ as underline
	//TODO: Implement - text -- text2 - as listings
	//TODO: Implement \t as tabs

	render({ title, description, expanded }) {
		if (this.state.expanded === undefined)
			this.state.expanded = expanded;

		this.resetAnimation();
		let animation = this.state.expansionAnimation;
		this.state.expansionAnimation = undefined;

		return (
			<div className={[style.foldOut, this.state.expanded ? style.expanded : ''].join(' ')}>
				<div className={[style.foldOutHeader].join(' ')} onClick={this.toggleExpansion}>
					<span>
						<strong>{title}</strong>
						<Icon ref={i => this.icon = i} className={animation ? style[animation] : ''}>expand_more</Icon>
					</span>
				</div>
				<div className={[style.ruleDescription].join(' ')}><Markdown markdown={description.replace(/\t/g, `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)} /></div>
			</div>
		);
	}
}