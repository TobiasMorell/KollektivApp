import { Component } from 'preact';
import style from './style.css';
import Icon from 'preact-material-components/Icon';
import Markdown from 'preact-markdown';
import Button from 'preact-material-components/Button';

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

	render({ title, description, expanded, onEdit, onDelete, className }) {
		if (this.state.expanded === undefined)
			this.state.expanded = expanded;

		this.resetAnimation();
		let animation = this.state.expansionAnimation;
		this.state.expansionAnimation = undefined;

		return (
			<div className={[className, style.foldOut, this.state.expanded ? style.expanded : ''].join(' ')}>
				<div className={[style.foldOutHeader].join(' ')} onClick={this.toggleExpansion}>
					<span>
						<strong>{title}</strong>
						<Icon ref={i => this.icon = i} className={animation ? style[animation] : ''}>expand_more</Icon>
					</span>
				</div>
				<div className={[style.ruleDescription].join(' ')}>
					<Markdown markdown={description.replace(/\t/g, `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`)} />

					<div className={style.actionBar}>
						<Button onClick={onDelete}>Slet</Button>
						<Button onClick={onEdit}>Rediger</Button>
					</div>
				</div>
			</div>
		);
	}
}