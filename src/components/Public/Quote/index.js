import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class Quote extends Component {
	constructor (props) {
		super(props);

		this.state = {};
	}

	render () {
		const { t } = this.props;

		return (
			<div className="quote">
				<p>{ t('quote1') }</p>
				<p>{ t('quote2') }</p>
				<span>{ t('signature') }</span>
			</div>
		);
	}
}

Quote.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('quoteView')(Quote))

