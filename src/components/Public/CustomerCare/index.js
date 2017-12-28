import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class CustomerCare extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount () {}

    render () {
        const { t } = this.props;

        return (
            <div className="page contact">
                <Header location={this.props.location} />
                <div className="page-header"><h1>{ t('heading') }</h1></div>
                <div className="wrapper">
                    <p className="text">{ t('preamble1') }</p>
                    <p className="text">{ t('preamble2') }</p>
                    <p className="contact-text text">{ t('contactText') }</p>
                    <p className="text phone-number">+387 603 21 22 90</p>
                    <p className="text phone-number">+387 66 23 60 83</p>
                    <p className="text">Besplatan razgovor preko Skypea: <span className="skype">info@zdravlje.nu</span></p>
                    <p className="text email">E-pošta: <span className="email"><a href="mailto:info@zdravlje.nu">info@zdravlje.nu</a></span></p>
                    <div className="push" />
                </div>
                <Footer />
            </div>
        )
    }
}

CustomerCare.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps)(translate('customerCareView')(CustomerCare))

