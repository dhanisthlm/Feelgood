import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class Tac extends Component {
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
                <div className="privacy-wrapper tac-wrapper">
                    <p className="narrow">{ t('preamble.text1') }</p>
                    <p className="narrow">{ t('preamble.text2') }</p>
                    <p className="narrow">{ t('preamble.text3') }</p>
                    <p>{ t('preamble.text4') }</p>

                    <h3>{ t('changes.heading') }</h3>
                    <p className="narrow">{ t('changes.text1') }</p>
                    <p className="narrow">{ t('changes.text2') }</p>
                    <p>{ t('changes.text3') }</p>

                    <h3>{ t('payment.heading') }</h3>
                    <p className="narrow">{ t('payment.text1') }</p>
                    <p className="narrow">{ t('payment.text2') }</p>
                    <p className="narrow">{ t('payment.text3') }</p>
                    <p className="narrow">{ t('payment.text4') }</p>
                    <ul>
                        <li>{ t('payment.creditcard') }</li>
                        <li>Paypal</li>
                        <li>{ t('payment.invoice') }</li>
                    </ul>
                    <p className="narrow">{ t('payment.text5') }</p>
                    <p>{ t('payment.text6') }</p>

                    <h3>{ t('failure.heading') }</h3>
                    <p>{ t('failure.text') }</p>

                    <h3>{ t('cancel.heading') }</h3>
                    <p className="narrow">{ t('cancel.text1') }</p>
                    <p className="narrow">{ t('cancel.text2') }</p>
                    <p>{ t('cancel.text3') }</p>

                    <h3>{ t('disclaimer.heading') }</h3>
                    <p className="narrow">{ t('disclaimer.text1') }</p>
                    <p className="narrow">{ t('disclaimer.text2') }</p>
                    <p>{ t('disclaimer.text3') }</p>

                    <h3>{ t('access.heading') }</h3>
                    <p className="narrow">{ t('access.text1') }</p>
                    <p className="narrow">{ t('access.text2') }</p>
                    <p className="narrow">{ t('access.text3') }</p>
                    <p className="narrow">{ t('access.text4') }</p>
                    <p className="narrow">{ t('access.text5') }</p>
                    <p className="narrow">{ t('access.text6') }</p>
                    <p>{ t('access.text7') }</p>

                    <h3>{ t('parties.heading') }</h3>
                    <p>{ t('parties.text') }</p>

                    <h3>{ t('recordings.heading') }</h3>
                    <p className="narrow">{ t('recordings.text1') }</p>
                    <p>{ t('recordings.text2') }</p>

                    <h3>{ t('limitation.heading') }</h3>
                    <p className="narrow">{ t('limitation.text1') }</p>
                    <p className="narrow">{ t('limitation.text2') }</p>
                    <p className="narrow">{ t('limitation.text3') }</p>
                    <p className="narrow">{ t('limitation.text4') }</p>
                    <p>{ t('limitation.text5') }</p>

                    <h3>{ t('property.heading') }</h3>
                    <p className="narrow">{ t('property.text1') }</p>
                    <p>{ t('property.text2') }</p>

                    <h3>{ t('complaints.heading') }</h3>
                    <p className="narrow">{ t('complaints.text1') }</p>
                    <ul className="complaint-list">
                        <li>{ t('complaints.list1') }</li>
                        <li>{ t('complaints.list2') }</li>
                        <li>{ t('complaints.list3') }</li>
                        <li>{ t('complaints.list4') }</li>
                        <li>{ t('complaints.list5') }</li>
                        <li>{ t('complaints.list6') }</li>
                    </ul>
                    <p className="narrow">{ t('complaints.text2') }</p>
                </div>
                <Footer />
            </div>
        );
    }
}

Tac.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('tacView')(Tac))

