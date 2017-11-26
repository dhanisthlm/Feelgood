import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class QuoteImage extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render () {
		const { t } = this.props;

		return (
			<div className="quote-image">
				<p>Ono što mislite da postanete</p>
				<img src="./images/reader.jpg" />
			</div>
		);
	}
}

QuoteImage.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('quoteImageView')(QuoteImage))

