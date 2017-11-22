import React, { Component } from 'react';

class FormComponent extends Component {
    constructor (props) {
        super(props);

        this.hasBeenValidated = {};

        this.getValidatorData = this.getValidatorData.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
        this.renderHelpText = this.renderHelpText.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.isValid = this.isValid.bind(this);
        this.handleValidationReset = this.handleValidationReset.bind(this);
    }

    getValidationState (name) {
        if (!this.props.isValid(name)) return 'error';
        if (name in this.hasBeenValidated) return 'success';
    }

    getValidatorData () {
        return this.state;
    }

    renderHelpText (name) {
        return (
            <span>{this.props.getValidationMessages(name)}</span>
        );
    }

    isValid () {
        return this.props.getValidationMessages().length === 0;
    }

    handleChange (name, options = { trim: false, toUpperCase: false }) {
        return (e) => {
            let value = e.target.value;

            if (options.trim) {
                value = value.trim();
                value = value.replace(/\s/g, '');
            }

            if (options.toUpperCase) {
                value = value.toUpperCase();
            }

            this.setState({ [name]: value });
        };
    }

    handleSelect (name) {
        return (key, e) => {
            this.setState({ [name]: key });
        };
    }

    handleCheckboxChange (name) {
        return (e) => {
            this.setState({ [name]: e.target.checked });
        };
    }

    handleFocus (name) {
        return (e) => {
            if (name in this.hasBeenValidated) {
                delete this.hasBeenValidated[name];
            }
        };
    }

    handleBlur (name, options) {
        return (e) => {
            var value = e.target.value;

            if (options && options.trim) {
                value = e.target.value.trim();
                value = value.replace(/\s/g, '');
            }

            this.setState(
                {
                    [name]: value
                },
                () => {
                    this.props.handleValidation(name)();
                    this.hasBeenValidated[name] = true;
                }
            );
        };
    }

    handleValidationReset () {
        this.hasBeenValidated = {};
    }
}

export default FormComponent;