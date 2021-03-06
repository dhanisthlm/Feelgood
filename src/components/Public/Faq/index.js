import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class Faq extends Component {
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
                <div className="privacy-wrapper faq-wrapper">
                    <h3>{ t('individualCouncelling.heading') }</h3>
                    <p className="narrow">{ t('individualCouncelling.text1') }</p>
                    <p className="narrow">{ t('individualCouncelling.text2') }</p>
                    <p>{ t('individualCouncelling.text3') }</p>

                    <h3>{ t('forMe.heading') }</h3>
                    <p className="narrow">{ t('forMe.text1') }</p>
                    <p>{ t('forMe.text2') }</p>

                    <h3>{ t('discretion.heading') }</h3>
                    <p className="narrow">{ t('discretion.text1') }</p>
                    <p className="narrow">{ t('discretion.text2') }</p>
                    <p className="narrow">{ t('discretion.text3') }</p>
                    <p>{ t('discretion.text4') }</p>

                    <h3>{ t('rebook.heading') }</h3>
                    <p>{ t('rebook.text') }</p>

                    <h3>{ t('book.heading') }</h3>
                    <p>{ t('book.text1') }</p>
                    <p className="narrow">E-posta: <span><a href="mailto:info@zdravlje.nu">info@zdravlje.nu</a></span></p>
                    <p className="narrow">Telefon: <span>+387 603 21 22 90</span> or <span>+387 66 23 60 83</span></p>
                    <p>Skype: <span>info@zdravlje.nu</span></p>
                    <p>{ t('book.text2') }</p>

                    <h3>{ t('safe.heading') }</h3>
                    <p className="narrow">{ t('safe.text1') }</p>
                    <p className="narrow">{ t('safe.text2') }</p>
                    <p className="narrow">{ t('safe.text3') }</p>
                    <p className="narrow">{ t('safe.text4') }</p>
                    <p>{ t('safe.text5') }</p>

                    <h3>{ t('eligible.heading') }</h3>
                    <p className="narrow">{ t('eligible.text1') }</p>
                    <p className="narrow">{ t('eligible.text2') }</p>
                    <p className="narrow">{ t('eligible.text3') }</p>
                    <p>{ t('eligible.text4') }</p>

                    <h3>{ t('getStarted.heading') }</h3>
                    <p>{ t('getStarted.text1') }</p>
                    <p className="narrow">{ t('getStarted.text2') } <a className="emphazised" href="https://www.skype.com">skype web stranicu</a></p>
                    <p>{ t('getStarted.text3') }</p>

                    <h3>{ t('session.heading') }</h3>
                    <p className="narrow">{ t('session.text1') }</p>
                    <p>{ t('session.text2') }</p>

                    <h3>{ t('satisfied.heading') }</h3>
                    <p className="narrow">{ t('satisfied.text1') }</p>
                    <p className="narrow">{ t('satisfied.text2') }</p>
                    <p>{ t('satisfied.text3') }</p>

                    <h3>{ t('pay.heading') }</h3>
                    <p className="narrow">{ t('pay.text1') }</p>
                    <p className="narrow">{ t('pay.text2') }</p>
                    <p>{ t('pay.text3') }</p>

                    <h3>{ t('payAfter.heading') }</h3>
                    <p className="narrow">{ t('payAfter.text1') }</p>
                    <p>{ t('payAfter.text2') }</p>

                    <h3>{ t('missSession.heading') }</h3>
                    <p>{ t('missSession.text') }</p>

                    <h3>{ t('prescriptions.heading') }</h3>
                    <p className="narrow">{ t('prescriptions.text1') }</p>
                    <p>{ t('prescriptions.text2') }</p>

                    <h3>{ t('troubles.heading') }</h3>
                    <p>{ t('troubles.text') }</p>

                </div>
                <Footer />
            </div>
        );
    }
}

Faq.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('faqView')(Faq))

