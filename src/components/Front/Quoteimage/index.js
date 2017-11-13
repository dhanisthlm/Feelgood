import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class QuoteImage extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render () {
		return (
			<div className="intersection">
				<p>Ono što mislite da postanete</p>
				<img src="./images/peace.jpg" />
			</div>
		);
	}
}

QuoteImage.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(QuoteImage)
