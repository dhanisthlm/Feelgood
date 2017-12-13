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
                <div className="page-header"><h1>Služba za korisnike</h1></div>
                <div className="wrapper">
                    <p className="text">Naša služba za korisnike stoji vam na raspolaganju svakim radnim danom od 08.00 do 17.00 za sve informacije i savjete. </p>
                    <p className="text">Zdravlje.nu smo posvećeni pružanju najboljih mogućih psihološki savjetovanja za sve naše kliente. Da bismo to postigli, mi stalno tražimo da poboljšamo uslugu koju nudimo i stoga cjenimo sve povratne informacije, i dobre i loše.</p>
                    <h4 className="contact-header">Kontakt</h4>
                    <p className="contact-text text">Našu službu za korisnike možete kontaktirati putem emaila, Skypea ili pozivom na sljedeće telefonske brojeve:</p>
                    <h5 className="phone-header">Telefoni</h5>
                    <p className="text phone-number">+387 603 21 22 90</p>
                    <p className="text phone-number">+387 66 23 60 83</p>
                    <p className="text">Besplatan razgovor preko Skypea: <span className="skype">zdravlje.nu@hotmail.com</span></p>
                    <p className="text email">E-pošta: <span className="email">zdravlje.nu@hotmail.com</span></p>
                </div>
                <Footer />
            </div>
        )
    }
}

CustomerCare.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps)(translate('headerView')(CustomerCare))

