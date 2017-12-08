import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './styles.css';

export class Hero extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount () {
        setTimeout(() => {
            const cookieWrapper = this.refs['cookie-wrapper'];
            cookieWrapper.classList.add('visible');
        }, 3000);
    }

    render () {
        const { t } = this.props;

        return (
            <div className="introduction">
                <div ref="cookie-wrapper" className="cookie-wrapper">
                    <p>Vi använder cookies för att uppdatera pågående beästllning. Ingen data sparas och tas bort i samband med köp</p>
                    <button>Okej</button>
                </div>
                <img src="/images/flowers.jpg" alt="hero-image" />
                <div className="text-wrapper">
                    <h3 className="heading">{ t('heading') }</h3>
                    <p className="preamble">{ t('preamble') }</p>
                    <a href="/anka#kosmomi" className="intro-button">{ t('start') }</a>
                </div>
            </div>
        );
    }
}

Hero.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('introView')(Hero));

