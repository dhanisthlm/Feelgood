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
                <div className="page-header"><h1>Hitna pomoc</h1></div>
                <div className="privacy-wrapper">
                    <p>Kindly note the use of our online services are not meant for emergencies.</p>
                    <p>If you are thinking about suicide or if you are considering taking actions that may cause harm to you or to others or if you feel that you or any other person may be in any danger or if you have any medical emergency, you must immediately call the emergency service number and notify relevant authorities.</p>
                    <p>Our counselling services are for anybody wanting to live a more fulfilled life by working on their everyday issues. In order to be eligible to use our services, you must not have a serious mental health issue, e.g. diagnosed with schizophrenia, bipolar disorder, drug or alcohol dependence, or any other diagnosed mental issue.
                    </p>
                    <div className="push" />
                </div>
                <Footer />
            </div>
        );
    }
}

Emergency.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('faqView')(Emergency))

