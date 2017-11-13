import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class Quote extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render () {
		return (
			<div className="quote">
				<p>Ono što mislite da postanete</p>
			</div>
		);
	}
}

Quote.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Quote)
