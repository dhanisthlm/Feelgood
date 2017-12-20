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
                    <p className="narrow">{ t('disclosure.text1') }</p>
                    <p className="narrow">{ t('disclosure.text2') }</p>
                    <p>{ t('disclosure.text3') }</p>

                    <h3>{ t('security.heading') }</h3>
                    <p className="narrow">{ t('security.text1') }</p>
                    <p className="narrow">{ t('security.text2') }</p>
                    <p>{ t('security.text3') }</p>

                    <h3>{ t('payment.heading') }</h3>
                    <p className="narrow">{ t('payment.text1') }</p>
                    <p>{ t('payment.text2') }</p>

                    <h3>{ t('information.heading') }</h3>
                    <p className="narrow">{ t('information.text1') }</p>
                    <p>{ t('information.text2') }</p>

                    <h3>{ t('browser.heading') }</h3>
                    <p className="narrow">{ t('browser.text1') }</p>
                    <p className="narrow">{ t('browser.text2') }</p>
                    <p className="narrow">{ t('browser.text3') }</p>
                    <p>{ t('browser.text4') }</p>

                    <h3>{ t('consent.heading') }</h3>
                    <p className="narrow">{ t('consent.text1') }</p>
                    <p>{ t('consent.text2') }</p>

                    <h3>{ t('contact.heading') }</h3>
                    <p>{ t('contact.text') }</p>

                    <p className="contact">Email: info@zdravlje.nu</p>
                    <p className="contact">Phone: +387 603 21 22 90, +387 66 23 60 83</p>
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

