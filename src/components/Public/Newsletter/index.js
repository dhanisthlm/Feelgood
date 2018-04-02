import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import strategy from 'joi-validation-strategy';
import { i18nValidation } from  '../../../../helpers/validation';
import validation from 'react-validation-mixin';
import { addUserToNewsletter } from '../../../actions/encounter';
import { newsletterValidator } from '../../../../validators/newsletter';
import styles from './styles.css';

export class Newsletter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            mail: '',
            successMessage: ''
        };

        this.validatorTypes = newsletterValidator;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getValidationMessages = this.getValidationMessages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetSuccess = this.resetSuccess.bind(this);
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
        this.setState({ mail: event.target.value });
    }

    getValidatorData() {
        return this.state
    }

    resetSuccess() {
        this.setState({ successMessage: '' });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.validate((error) => {
            if (!error) {
                this.setState({ mail: '', successMessage: 'Hvala vam što ste zainteresovani za Zdravlje.nu.' });
                this.props.dispatch(addUserToNewsletter(this.state.mail));
            }
        });
    }

    render () {
        const { t } = this.props;

        return (
            <div className="newsletter">
                <h2 className="heading">Subscribe to our newsletter</h2>
                <img src="/images/envelope-feelwell.svg" />
                <input
                    onChange={ this.handleChange }
                    onKeyUp={this.resetSuccess}
                    className={ this.getValidatorData('mail') }
                    value={this.state.mail}
                    placeholder="E-pošta adresa" type="text" />
                <button onClick={this.handleSubmit}>Submit</button>
                <span className="successMessage">{this.state.successMessage}</span>
                {this.getValidationMessages('mail')}
            </div>
        );
    }
}

Newsletter.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('newsletterView')(validation(strategy(i18nValidation()))(Newsletter)));

