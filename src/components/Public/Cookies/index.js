import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class Cookies extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page privacy-policy cookies-wrapper">
                <Header location={this.props.location} />
                <div className="page-header"><h1>Politika kolačića</h1></div>
                <div className="privacy-wrapper">
                    <p>Kolačiće koristimo radi pravilnog funkcionisanja određenih ulsuga. Oni su privremeni i nestaju kada isključite browser. Korištenjem ove web stranice prihvaćate korištenje kolačića.</p>
                    <div className="push" />
                </div>
                <Footer />
            </div>
        );
    }
}

Cookies.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('faqView')(Cookies))

