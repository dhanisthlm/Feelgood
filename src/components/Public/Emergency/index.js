import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class Emergency extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page privacy-policy cookies-wrapper">
                <Header location={this.props.location} />
                <div className="page-header"><h1>{ t('heading') }</h1></div>
                <div className="privacy-wrapper">
                    <p className="narrow">{ t('text1') }</p>
                    <p className="narrow">{ t('text2') }</p>
                    <p className="narrow">{ t('text3') }</p>
                    <div className="push" />
                </div>
                <Footer />
            </div>
        );
    }
}

Emergency.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('emergencyView')(Emergency))

