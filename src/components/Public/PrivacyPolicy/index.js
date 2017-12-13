import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class PrivacyPolicy extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page privacy-policy">
                <Header location={this.props.location} />
                <div className="page-header"><h1>{ t('heading') }</h1></div>
                <div className="privacy-wrapper">
                    <p className="preamble">{ t('preamble') }</p>

                    <h3>{ t('disclosure.heading') }</h3>
                    <p>{ t('disclosure.text') }</p>

                    <h3>{ t('security.heading') }</h3>
                    <p>{ t('security.text') }</p>

                    <h3>{ t('payment.heading') }</h3>
                    <p>{ t('payment.text') }</p>

                    <h3>{ t('information.heading') }</h3>
                    <p>{ t('information.text') }</p>

                    <h3>{ t('browser.heading') }</h3>
                    <p>{ t('browser.text') }</p>

                    <h3>{ t('consent.heading') }</h3>
                    <p>{ t('consent.text') }</p>

                    <h3>{ t('contact.heading') }</h3>
                    <p>{ t('contact.text') }</p>

                    <p className="contact">Email:</p>
                    <p className="contact">Phone:</p>
                    <h4>{ t('address') }</h4>
                    <p className="address">Baunad doo Tuzla</p>
                    <p className="address">Zdravlje.nu</p>
                    <p className="address">Marsala Tita 109</p>
                    <p className="address">75000 Tuzla</p>
                    <p>Bosnia and Herzegovina</p>
                    <p>{ t('updated') }</p>
                </div>
                <Footer />
            </div>
        );
    }
}

PrivacyPolicy.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('privacyPolicyView')(PrivacyPolicy))

