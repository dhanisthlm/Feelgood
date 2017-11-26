import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class Hero extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="introduction">
                <img src="/images/flowers.jpg" alt="hero-image" />
                <div className="text-wrapper">
                    <h3 className="heading">{ t('heading') }</h3>
                    <p className="preamble">{ t('preamble') }</p>
                    <a href="/anka#whoarew" className="intro-button">{ t('start') }</a>
                </div>
            </div>
        );
    }
}

Hero.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('introView')(Hero));

