import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import strategy from 'joi-validation-strategy';
import { i18nValidation } from  '../../../../helpers/validation';
import validation from 'react-validation-mixin';
import { resetContact, sendContactInfo } from '../../../actions/contact';
import { contactValidator } from '../../../../validators/contact';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './styles.css';

export class CustomerCare extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: '',
            mail: '',
            comment: '',
            successMessage: 'Thank you for contacting us, we will get back to you shortly'
        };

        this.validatorTypes = contactValidator;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationMessages(prop) {
        const { t } = this.props;
        return (
            this.props.getValidationMessages(prop).map((message, i) => {
                const validationMessage = message.indexOf('pattern') > -1 ? t('validation.wrongRegexFormat') : t(`validation.${message}`);
                return <span key={i} className="error">{validationMessage}</span>;
            })
        )
    }

    handleChange(event) {
        this.props.dispatch(resetContact());
        this.setState({ [event.target.id]: event.target.value });
    }

    getValidatorData() {
        return this.state
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.validate((error) => {
            if (!error) {
                console.log('here');
                this.setState({ mail: '', name: '', comment: '' });
                this.props.dispatch(sendContactInfo(this.state));
            }
        });
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page contact">
                <Header location={this.props.location} />
                <div className="page-header"><h1>{ t('heading') }</h1></div>
                <div className="wrapper">
                    <p>Mi smo posvećeni pružanju najboljih mogućih usluga psihološkog savjetovanja za sve naše klijente. Da bismo to postigli, uvek se trudimo da poboljšamo usluge koje nudimo i stoga cenimo sve povratne informacije, i dobre i loše.</p>
                    <p>Možete kontaktirati našu službu korisnicima putem e-pošte, Skype-a (info@feelingwell.net) ili slanjem kontakt formulara u nastavku.</p>
                    <div className="form-wrapper">
                        <label className="label" htmlFor="name">Ime</label>
                        <input
                            className={ this.getValidatorData('name') }
                            onChange={ this.handleChange }
                            id="name"
                            type="text"
                            value={this.state.name}
                        />
                        {this.getValidationMessages('name')}
                        <label className="label" htmlFor="mail">E-pošta</label>
                        <input
                            className={ this.getValidatorData('mail') }
                            onChange={ this.handleChange }
                            id="mail"
                            type="text"
                            value={this.state.mail}
                        />
                        {this.getValidationMessages('mail')}
                        <label className="label" htmlFor="comment">Comment</label>
                        <textarea
                            onChange={ this.handleChange }
                            id="comment"
                            className={ this.getValidatorData('comment') }
                            value={this.state.comment}
                        />
                        {this.getValidationMessages('comment')}
                        <button onClick={this.handleSubmit}>OK</button>
                        <span className="success">{this.props.successMessage}</span>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

CustomerCare.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    successMessage: state.encounter.contactMessage
});

export default connect(mapStateToProps)(translate('customerCareView')(validation(strategy(i18nValidation()))(CustomerCare)));

