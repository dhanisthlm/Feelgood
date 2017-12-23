import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { resetRating } from '../../../actions/encounter';
import styles from './styles.css';

export class Hero extends Component {
    constructor (props) {
        super(props);

        this.state = {};

        this.handleCookie = this.handleCookie.bind(this);
    }

    componentDidMount () {
        setTimeout(() => {
            const hasCookie = window.localStorage.getItem('cookie');
            const cookieWrapper = this.refs['cookie-wrapper'];

            if (!hasCookie) {
                cookieWrapper.classList.add('visible');
            }
        }, 2000);
    }

    handleCookie () {
        const cookieWrapper = this.refs['cookie-wrapper'];
        cookieWrapper.classList.remove('visible');
        window.localStorage.setItem('cookie', true);
    }

    render () {
        const { t } = this.props;

        return (
            <div className="introduction">
                <div ref="cookie-wrapper" className="cookie-wrapper">
                    <p>{ t('cookieText') }</p>
                    <button onClick={this.handleCookie}>OK</button>
                </div>
                <img src="/images/flowers.jpg" alt="hero-image" />
                <div className="text-wrapper">
                    <h3 className="heading">{ t('heading') }</h3>
                    <p className="preamble">{ t('preamble') }</p>
                    <a href="#kosmomi" className="intro-button">{ t('start') }</a>
                </div>
            </div>
        );
    }
}

Hero.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('introView')(Hero));

