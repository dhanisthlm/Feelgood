import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { routeActions } from 'redux-simple-router';
import ReactDOM from 'react-dom'
import { encounterValidator, workshopValidator, onlineValidator } from '../../../../validators/encounters';
import { getIssues } from '../../../actions/issue';
import { saveRating, resetRating } from '../../../actions/encounter';
import { i18nValidation } from  '../../../../helpers/validation';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import { getCountries } from '../../../../helpers/countries';
import { getCurrency } from '../../../../helpers/currencies';
import { getStripeToken, getPaypalEnv } from '../../../actions/config';
import { getSkypeCost, getEmailCost, getPackageDiscount, getVoucherDiscount, getSum, getTotal, getPackageSum, getSelectedCurrency, getWorkshopCost } from '../../../../helpers/payment';
import { InactivityModal } from '../../InactiveDialog';
import Header from '../Header';
import Footer from '../Footer';
import issueObj from '../../../../json/issues.json';
import styles from './styles.css';

let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

export class Checkout extends FormComponent {
    constructor(props) {
        super(props);

        this.state = {
            client: {
                sandbox: 'ASjq_5LtraMQlFGyiih32_C8F-Yh_k1-jfGa54hGrXDPJ0PdeGV861q2kv3ez_QTsOAMxSm_eNChI1ha',
                production: 'AdHHMFOsZkPDUuMIuqtVycTd5cybDC_IaFRsJn1hCOsb6wQKTTTiT-SbIL6YqxP2SY3N6bPRzEfDT01_',
            },
            env: 'sandbox',
            commit: true,
            issue: '',
            isOpen: false,
            issues: [],
            showSpinner: false,
            activity: 0,
            counter: 60,
            showDialog: true,
            startTime: null,
            timeRemaining: '2:00',
            idleTime: 0,
            location: null,
            countInactivity: true,
            idleTtl: 300000,
            tick: 10000,
            webRating: 0,
            location: '',
            payRating: 0,
            workshop: false,
            ratingComment: '',
            paymentType: 'credit',
            timeframes: ['Jutro', 'Popodne', 'Veče', 'Bilo kada'],
            country: 'Bosnia and Herzegovina',
            newsletter: true,
            currency: 'BAM',
            paypalFactor: 1,
            subscribe: 'on',
            terms: 'off',
            cancel: 'off',
            cost: 0,
            termsIsDirty: false,
            cancelIsDirty: false,
            comment: '',
            paypalCurrencies: ['€', '$', 'kn', 'kr'],
            invoiceCurrencies: ['€', 'KM'],
            languages: [
                {
                    code: 'bam',
                    currency: 'KM',
                    rate: 1
                },
                {
                    code: 'eur',
                    currency: '€',
                    rate: 2
                },
                {
                    code: 'hrk',
                    currency: 'kn',
                    rate: 1 / 4
                },
                {
                    code: 'rsd',
                    currency: 'RSD',
                    rate: 1 / 60
                },
                {
                    code: 'sek',
                    currency: 'kr',
                    rate: 1 / 5
                },
                {
                    code: 'usd',
                    currency: '$',
                    rate: 1.6
                }
            ]
        };

        this.validatorTypes = this.props.location.query.workshop
            ? workshopValidator
            : (this.props.location.query.skype || this.props.location.query.email) ? onlineValidator : encounterValidator;

        this.resetCheckout = this.resetCheckout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderIssues = this.renderIssues.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleWebStar = this.handleWebStar.bind(this);
        this.handlePayStar = this.handlePayStar.bind(this);
        this.handleRatingComment = this.handleRatingComment.bind(this);
        this.postRating = this.postRating.bind(this);
        this.handlePaymentType = this.handlePaymentType.bind(this);
        this.payment = this.payment.bind(this);
        this.onAuthorize = this.onAuthorize.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.validate = this.validate.bind(this);
        this.handleTimePreference = this.handleTimePreference.bind(this);
        this.handleSelectTime = this.handleSelectTime.bind(this);
        this.handleSelectCountry = this.handleSelectCountry.bind(this);
        this.handleNewsletter = this.handleNewsletter.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onError = this.onError.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.resetOrder = this.resetOrder.bind(this);
    }

    componentWillMount() {
        const {location} = this.props;

        if (window.localStorage.getItem('order') !== null) {
            const cache = JSON.parse(window.localStorage.getItem('order'));
            this.setState({...cache, save: false});
        }

        if (window.localStorage.getItem('order') !== null) {
            this.props.dispatch(getIssues());
        }

        if (location.query.workshop || location.query.skype || location.query.email) {
            this.setState({
                language: this.props.location.query.currency,
                cancel: 'on',
                cost: {
                    total: parseInt(location.query.price)
                }
            }, () => {
                this.props.dispatch(getStripeToken());
                this.props.dispatch(getPaypalEnv());
            });

        }
    }

    componentWillUnmount() {
        this.resetOrder();
    }

    componentDidMount() {
        const {location} = this.props;

        if (location.query.skype) {
            this.calculateViewportSize();
            this.setState({
                skype: location.query.skype,
                skypeDescription: location.query.skypeDescription,
                skypeCost: location.query.skypeCost,
                skypeDuration: location.query.skypeDuration
            });
        }

        if (location.query.email) {
            this.calculateViewportSize();
            this.setState({
                email: location.query.email,
                emailDescription: location.query.emailDescription,
                emailCost: location.query.emailCost,
                emailResponse: location.query.emailResponse
            });
        }

        if (location.query.workshop) {
            this.calculateViewportSize();
            this.setState({
                workshop: true,
                workshopName: location.query.workshop,
                location: location.query.location,
                month: location.query.month,
                day: location.query.day
            });
        }

        if (window.localStorage.getItem('order') && !location.query.workshop && !location.query.skype && !location.query.email) {
            this.initStripe();
            this.setState({env: window.localStorage.getItem('pe')});
        }

        if (!window.localStorage.getItem('order') && !location.query.workshop && !location.query.skype && !location.query.email) {
            this.props.dispatch(routeActions.push('/'));
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    componentWillReceiveProps(nextProps) {
        const {location} = nextProps;
        if (location.query.workshop || location.query.skype || location.query.email) {
            this.setState({
                stripeToken: nextProps.stripeToken,
                paypalEnv: nextProps.paypalEnv
            }, () => {
                setTimeout(() => {
                    this.initStripe();
                }, 1000)
            });
        }

        this.prepInit(nextProps);
        this.handleRating(nextProps);
        this.handleSave(nextProps);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    prepInit(nextProps) {
        const {location} = nextProps;

        if (nextProps.issues === this.props.issues) return;

        this.setState({
            issues: nextProps.issues,
            language: window.localStorage.getItem('order') ? JSON.parse(window.localStorage.getItem('order')).language : this.state.language,
        });

        if (!location.query.workshop) {
            this.setState({cost: JSON.parse(window.localStorage.getItem('order')).cost});
        }

        if (window.localStorage.getItem('step') === null && !location.query.workshop && !location.query.skype && !location.query.email) {
            this.props.dispatch(routeActions.push('/'));
        }

        if (nextProps.errorMessage.length) {
            this.setState({showSpinner: false});
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleNewsletter() {
        const newsletter = this.state.newsletter;
        const subscribe = this.state.subscribe === 'on' ? 'off' : 'on';
        this.setState({subscribe});
        this.setState({newsletter: this.state.subscribe === 'on'});
        window.localStorage.setItem('newsletter', newsletter);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handlePaymentType(event) {
        const id = event.currentTarget.getAttribute('data-id');
        const options = document.getElementById('payment-options');
        let paypalFactor = 1;

        this.setState({paymentType: id}, () => {
            if (id === 'credit') {
                this.initStripe();
            }

            if (id === 'paypal') {
                paypalFactor = (this.state.paypalCurrencies.indexOf(this.state.language) > -1) ? 1 : 2;
                this.setState({termsIsDirty: true, cancelIsDirty: true});
            } else if (id === 'faktura') {
                paypalFactor = (this.state.invoiceCurrencies.indexOf(this.state.language) > -1) ? 1 : 2;
            } else {
                paypalFactor = 1;
            }

            this.setState({paypalFactor})
        });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleTimePreference(event) {
        const id = event.target.id;
        this.setState({timePreference: id});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSave(nextProps) {
        if (nextProps.save === true) {
            window.scrollTo(0, 0);
            window.localStorage.setItem('step', '2');
            this.setState({showSpinner: false, save: true});
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    postRating() {
        const stripe = JSON.parse(window.localStorage.getItem('stripe')) || this.state.stripeToken;
        const id = (stripe.data.encounterId) ? stripe.data.encounterId : stripe.data._id;

        this.props.dispatch(saveRating(
            id, {
                workshop: this.state.workshop,
                web: 5 - this.state.webRating + 1,
                pay: 10 - this.state.payRating + 1,
                comment: this.state.ratingComment
            }
        ));
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleRating(nextProps) {
        if (nextProps.rating === true) {
            window.localStorage.removeItem('step');
            window.localStorage.removeItem('order');
            window.localStorage.removeItem('stripe');
            this.props.dispatch(resetRating());
            this.props.dispatch(routeActions.push('/'));
        } else {
            if (Object.keys(nextProps.stripe).length) {
                window.localStorage.setItem('stripe', JSON.stringify(nextProps.stripe));
            }
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleCheckbox() {
        const terms = this.state.terms === 'on' ? 'off' : 'on';
        this.setState({terms});
        this.setState({termsIsDirty: true});
        this.handlePaypal();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleCancel() {
        const cancel = this.state.cancel === 'on' ? 'off' : 'on';
        this.setState({cancel});
        this.setState({cancelIsDirty: true});
        this.handlePaypal();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleRatingComment(event) {
        this.setState({ratingComment: event.target.value});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleWebStar(event) {
        const stars = document.querySelector('.stars-1');
        const star = stars.querySelectorAll('.star');

        for (let i = 1; i <= 5; i++) {
            if (event.target.id <= i) {
                star[i - 1].classList.add('filled');
            } else {
                star[i - 1].classList.remove('filled');
            }
        }

        this.setState({webRating: event.target.id});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handlePayStar(event) {
        const stars = document.querySelector('.stars-2');
        const star = stars.querySelectorAll('.star');

        for (let i = 6; i <= 10; i++) {
            if (event.target.id <= i) {
                star[i - 6].classList.add('filled');
            } else {
                star[i - 6].classList.remove('filled');
            }
        }

        this.setState({payRating: event.target.id});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    resetOrder() {
        this.props.dispatch(routeActions.push('/'));
        window.localStorage.removeItem('order');
        window.localStorage.removeItem('stripe');
        window.localStorage.removeItem('saved');
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    initStripe() {
        if (typeof Stripe === 'undefined') {
            return;
        }

        const {t} = this.props;
        const element = document.getElementById('card-element');

        if (element) {
            const stripe = Stripe(window.localStorage.getItem('st') || this.state.stripeToken);
            const elements = stripe.elements({locale: 'en'});
            const card = elements.create('card', {placeholder: 'Card'});

            this.card = card;
            this.stripe = stripe;

            card.addEventListener('change', event => {
                const displayError = document.getElementById('card-errors');
                displayError.textContent = (event.error) ? t(`stripe.${event.error.code}`) : '';
            });

            card.mount('#card-element');
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    calculateViewportSize() {
        if (!this.breakpoints) return;

        for (let item of this.breakpoints.children) {
            const width = (item.offsetParent !== null) ? item.dataset.size : '';
            if (width) this.width = width;
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getValidatorData() {
        return this.state
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    resetCheckout() {
        window.localStorage.removeItem('order');
        this.props.dispatch(resetEncounter());
        this.props.dispatch(routeActions.push('/'));
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleChange(e) {
        if (!this.props.location.query.workshop && !this.props.location.query.skype && !this.props.location.query.email) {
            let cache = JSON.parse(window.localStorage.getItem('order'));
            cache[e.target.id] = e.target.value;
            window.localStorage.setItem('order', JSON.stringify(cache));
        }
        this.setState({[e.target.id]: e.target.value});
        this.handlePaypal();
    }

    handlePaypal() {
        if (this.state.paymentType === 'paypal') {
            this.props.validate((error) => {
                if (error || (this.state.termsIsDirty && this.state.terms === 'off') || (this.state.cancelIsDirty && this.state.cancel === 'off')) {
                    this.actions && this.actions.disable();
                } else {
                    this.actions && this.actions.enable();
                }
            })
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            termsIsDirty: true,
            cancelIsDirty: true,
            currency: getSelectedCurrency(this.state)[0].code.toUpperCase()
        });

        this.props.validate((error) => {
            const {t} = this.props;

            if (!error && this.state.terms !== 'off' && this.state.cancel !== 'off') {
                if (this.state.paymentType === 'credit') {
                    this.stripe.createToken(this.card).then(result => {
                        // Inform the customer that there was an error
                        if (result.error) {
                            const errorElement = document.getElementById('card-errors');
                            errorElement.textContent = t(`stripe.${result.error.code}`);
                        } else {
                            // Send the token to your server
                            this.setState({showSpinner: true});
                            this.props.dispatch(saveEncounter(this.state, result.token.id));
                        }
                    });
                } else {
                    this.props.dispatch(saveEncounter(this.state, null));
                }
            }
        })
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getValidationMessages(prop) {
        const {t} = this.props;
        return (
            this.props.getValidationMessages(prop).map((message, i) => {
                const validationMessage = message.indexOf('pattern') > -1 ? t('validation.wrongRegexFormat') : t(`validation.${message}`);
                return <span key={i} className="error">{validationMessage}</span>;
            })
        )
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSelect(event) {
        this.setState({issue: event.target.value});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSelectTime(event) {
        this.setState({timeframe: event.target.value});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSelectCountry(event) {
        const countryObj = getCountries().filter((countryObj) => countryObj.name === event.target.value)[0];
        const currency = getCurrency()[countryObj.code];
        this.setState({country: event.target.value, currency});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    onCancel(data) {
        console.log('cancel', data);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    onError(data) {
        console.log('error', data)
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    payment(actions) {
        let amount, currency;

        if (!this.props.location.query.workshop && !this.props.location.query.skype && !this.props.location.query.email) {
            amount = getTotal(this.state);

            currency = this.state.paypalCurrencies.indexOf(getSelectedCurrency(this.state)[0].currency) > -1
                ? getSelectedCurrency(this.state)[0].code.toUpperCase() : 'EUR';
        } else {
            amount = getWorkshopCost(parseInt(this.props.location.query.price), this.state);
            currency = this.state.paypalCurrencies.indexOf(this.state.currency.toLowerCase()) > -1 ? this.state.currency : 'EUR' || 'KM';
        }

        return actions.payment.create({
            transactions: [
                {
                    amount: {total: amount, currency}
                }
            ]
        });

    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    onAuthorize(data, actions) {
        return actions.payment.execute().then((paymentData) => {
            console.log('executed', this.props);
            this.props.dispatch(saveEncounter(this.state, null));
        });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    renderTimeframes() {
        const {t} = this.props;
        const timeframes = [t('chooseTime'), ...this.state.timeframes];
        let frameName;
        let frameValue;

        return timeframes.map((frame, i) => {
            if (i > 0) {
                frameName = frame;
                frameValue = frame;
            } else {
                frameName = frame;
                frameValue = '';
            }

            return <option key={i} value={frameValue}>{t(`${frameName}`)}</option>
        });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    renderIssues() {
        const {t} = this.props;
        const issues = [t('chooseTheme'), ...issueObj.issues];
        let issueName;
        let issueValue;

        return issues.map((issue, i) => {
            if (i > 0) {
                issueName = `issues.${issue.name}.name`;
                issueValue = `issues.${issue.name}.name`;
            } else {
                issueName = issue;
                issueValue = '';
            }

            return (
                <option key={i} value={t(issueValue)}>{t(issueName)}</option>
            )
        })
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    renderCountries() {
        const {t} = this.props;

        return getCountries().map((country, i) => {
            return <option data-id={country.code} key={i} value={country.name}>{country.name}</option>;
        })
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    validate(actions) {
        this.actions = actions;
        this.handlePaypal(actions);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    render() {
        const {t, location} = this.props;

        if (window.localStorage.getItem('order') === null && !location.query) {
            return null;
        }

        const front = ((window.localStorage.getItem('step') === '1') || location.query) && window.localStorage.getItem('step') !== '2' ? 'front' : 'front none';
        const back = (window.localStorage.getItem('step') === '2') ? 'back' : 'back none';
        const firstColSize = (this.width === 'small') ? '50%' : '60%';
        const lastColSize = (this.width === 'small') ? '30%' : '20%';
        const currency = this.state.paypalFactor === 1 ? this.state.language : '€';
        const termErrorMsg = this.state.terms === 'off' && this.state.termsIsDirty ? 'Ovo polje je obavezno' : '';
        const cancelErrorMsg = this.state.cancel === 'off' && this.state.cancelIsDirty ? 'Ovo polje je obavezno' : '';

        let sumClass, centerClass;

        if (window.localStorage.getItem('order')) {
            sumClass =
                (typeof this.state.data.packageDiscount === 'undefined' &&
                typeof this.state.data.promoDiscount === 'undefined')
                    ? 'right heavy' : 'right';

            centerClass =
                (typeof this.state.data.packageDiscount === 'undefined' &&
                typeof this.state.data.promoDiscount === 'undefined')
                    ? 'center heavy' : 'center';
        }

        const spinnerClass = this.state.showSpinner ? 'showbox' : 'none';

        const paypalStyle = {
            label: 'en_US',
            size: 'responsive',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            tagline: false
        };

        return (
            <div className="page">
                <InactivityModal resetOrder={this.resetOrder}/>
                <div className={spinnerClass}>
                    <div className="loader">
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2"
                                    strokeMiterlimit="10"/>
                        </svg>
                        <p className="processing-text">Obrada nabavke</p>
                    </div>
                </div>
                <Header location={this.props.location}/>
                <div ref={(checkout) => {
                    this.checkout = checkout;
                }} className="checkout">
                    <div className="basket">
                        <div className="page-header">
                            <h1>{ t('heading') }</h1>
                        </div>
                        <div className="outer-frame">
                            <div className="inner-frame">
                                {(() => {
                                    if ((window.localStorage.getItem('step') === '1' || location.query.workshop || location.query.skype || location.query.email) &&
                                        window.localStorage.getItem('step') !== '2') {
                                        return (
                                            <div className="left-col-wrapper">
                                                <table>
                                                    <colgroup>
                                                        <col width={ firstColSize }/>
                                                        <col width="20%"/>
                                                        <col width={ lastColSize }/>
                                                    </colgroup>
                                                    <thead>
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            return (
                                                                <tr>
                                                                    <th>{ t('item') }</th>
                                                                    <th>{ t('weeks') }</th>
                                                                    <th>{ t('price') }</th>
                                                                </tr>
                                                            );
                                                        } else if (location.query.skype || location.query.email) {
                                                            return (
                                                                <tr>
                                                                    <th>{location.query.title}</th>
                                                                    <th>{ t('weeks') }</th>
                                                                    <th>{ t('price') }</th>
                                                                </tr>
                                                            );
                                                        } else if (location.query.workshop) {
                                                            return (
                                                                <tr>
                                                                    <th>Radionica</th>
                                                                    <th>{ t('price') }</th>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    </thead>
                                                    <tbody>
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.skype) {
                                                                return (
                                                                    <tr>
                                                                        <td>{ `${this.state.data.skype.description.split(' ').shift()} ${t('skypeWeeks')}`}</td>
                                                                        <td className="center">{ this.state.data.skype.week }</td>
                                                                        <td className="center">{ getSkypeCost(this.state) }&nbsp;{ currency }</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        } else if (location.query.skype) {
                                                            return (
                                                                <tr>
                                                                    <td>{location.query.skypeDescription}, {location.query.skypeDuration}</td>
                                                                    <td className="center">{ location.query.skype }</td>
                                                                    <td className="center">{ getWorkshopCost(parseInt(location.query.skypeCost), this.state) }&nbsp;{ currency }</td>
                                                                </tr>
                                                            )
                                                        } else {
                                                            return (
                                                                <tr>
                                                                    <td>{`${location.query.workshop.charAt(0).toUpperCase() + location.query.workshop.slice(1)} – ${location.query.day}.${location.query.month}, ${location.query.location.charAt(0).toUpperCase() + location.query.location.slice(1)}`}</td>
                                                                    <td className="center heavy">{ getWorkshopCost(parseInt(location.query.price), this.state) }&nbsp;{currency}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.email) {
                                                                const duration = this.state.data.email.description.match(/\d+/g).map(Number)[0].toString();
                                                                return (
                                                                    <tr>
                                                                        <td>{`${t('email')} ${t('emailResponse')} ${duration} ${t('hours')}`}</td>
                                                                        <td className="center">{ this.state.data.email.week }</td>
                                                                        <td className="center">{ getEmailCost(this.state) }&nbsp;{ currency }</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                        if (location.query.email) {
                                                            return (
                                                                <tr>
                                                                    <td>{location.query.emailDescription}</td>
                                                                    <td className="center">{ location.query.email }</td>
                                                                    <td className="center">{ getWorkshopCost(parseInt(location.query.emailCost), this.state) }&nbsp;{ currency }</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop || location.query.skype || location.query.email) {
                                                            return (
                                                                <tr>
                                                                    <td>&nbsp;</td>
                                                                    <td>&nbsp;</td>
                                                                    <td>&nbsp;</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            return (
                                                                <tr>
                                                                    <td className={sumClass}
                                                                        colSpan="2">{ t('sum') }</td>
                                                                    <td className={centerClass}>{ getSum(this.state) }&nbsp;{ currency }</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.packageDiscount || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                                return (
                                                                    <tr>
                                                                        <td className="right"
                                                                            colSpan="2">{ t('packageDiscount') }</td>
                                                                        <td className="center">{ getPackageDiscount(this.state) }&nbsp;{ currency }</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.packageDiscount > 0 || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                                const labelName = this.state.data.promoDiscount
                                                                    ? 'right' : 'right heavy';

                                                                const valueName = this.state.data.promoDiscount
                                                                    ? 'center' : 'center heavy';

                                                                return (
                                                                    <tr>
                                                                        <td className={labelName}
                                                                            colSpan="2">{ t('sumWithPackageDiscount')}</td>
                                                                        <td className={valueName}>
                                                                            { getPackageSum(this.state) }&nbsp;{ currency }
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.promoDiscount) {
                                                                return (
                                                                    <tr>
                                                                        <td className="right"
                                                                            colSpan="2">{ t('voucherDiscount') }</td>
                                                                        <td className="center">{ getVoucherDiscount(this.state) }&nbsp;{ currency }</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                            if (this.state.data.promoDiscount || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                                return (
                                                                    <tr>
                                                                        <td className="right heavy"
                                                                            colSpan="2">{ t('total') }</td>
                                                                        <td className="center heavy">{ getTotal(this.state) }&nbsp;{ currency }</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                        if (location.query.email || location.query.skype) {
                                                            let email = parseInt(location.query.emailCost) || 0;
                                                            let skype = parseInt(location.query.skypeCost) || 0;
                                                            return (
                                                                <tr>
                                                                    <td className="right heavy"
                                                                        colSpan="2">{ t('total') }</td>
                                                                    <td className="center heavy">{ getWorkshopCost((email + skype), this.state) }&nbsp;{ currency }</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })()}
                                                    </tbody>
                                                </table>
                                                <div className="disclaimer">
                                                    {(() => {
                                                        if (this.state.paypalFactor !== 1) {
                                                            return (
                                                                <div>
                                                                    <p className="paypal">
                                                                        Izabrana valuta nije podržana.
                                                                    </p>
                                                                </div>
                                                            )
                                                        }
                                                    })()}
                                                </div>
                                                <div>
                                                    {(() => {
                                                        if (this.props.errorMessage.length > 0) {
                                                            return (
                                                                <div className="card-error">
                                                                    <p>Neformalno smo mogli da obradimo vašu
                                                                        narudžbinu. {t(`stripe.${this.props.errorMessage}`)}</p>
                                                                </div>
                                                            )
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        )
                                    }
                                })()}
                                <div ref={(front) => {
                                    this.front = front;
                                }} className={front}>
                                    <div id="payment-form">
                                        <div className="form-element-wrapper">
                                            <label htmlFor="name">{ t('name') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                onKeyUp={ this.handleChange }
                                                id="name"
                                                className="name"
                                                type="text"
                                                value={ this.state.name }/>
                                            {this.getValidationMessages('name')}
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="adress">{ t('street') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                onKeyUp={ this.handleChange }
                                                id="street"
                                                className="street"
                                                type="text"
                                                value={ this.state.street }/>
                                            {this.getValidationMessages('street')}
                                        </div>
                                        <div className="city-wrapper">
                                            <div className="form-element-wrapper">
                                                <label htmlFor="postal">{ t('postal') }</label>
                                                <input
                                                    onChange={ this.handleChange }
                                                    onKeyUp={ this.handleChange }
                                                    id="postal"
                                                    className="postal"
                                                    type="text"
                                                    value={ this.state.postal }/>
                                                {this.getValidationMessages('postal')}
                                            </div>
                                            <div className="form-element-wrapper">
                                                <label htmlFor="city">{ t('city') }</label>
                                                <input
                                                    onChange={ this.handleChange }
                                                    onKeyUp={ this.handleChange }
                                                    id="city"
                                                    className="city"
                                                    type="text"
                                                    value={ this.state.city }/>
                                                {this.getValidationMessages('city')}
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="country">{ t('country') }</label>
                                            <div className="select-style">
                                                <select data-id={this.state.currency} value={this.state.country}
                                                        id="country" onChange={ this.handleSelectCountry }>
                                                    { this.renderCountries() }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="phone">{ t('phone') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                onKeyUp={ this.handleChange }
                                                id="phone"
                                                type="text"
                                                value={ this.state.phone }/>
                                            { this.getValidationMessages('phone') }
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="email">{ t('email') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                onKeyUp={ this.handleChange }
                                                id="mail"
                                                type="text"
                                                value={ this.state.mail }/>
                                            { this.getValidationMessages('mail') }
                                        </div>
                                        {(() => {
                                            if (!location.query.workshop && !location.query.skype && !location.query.email) {
                                                return (
                                                    <div className="form-element-wrapper">
                                                        <label htmlFor="issue">{t('issue')}</label>
                                                        <div className="select-style">
                                                            <select id="issue" onChange={ this.handleSelect }>
                                                                { this.renderIssues() }
                                                            </select>
                                                        </div>
                                                        {this.getValidationMessages('issue')}
                                                    </div>
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            if (!location.query.workshop & !location.query.skype && !location.query.email) {
                                                return (
                                                    <div className="form-element-wrapper">
                                                        <label htmlFor="timeframe">{ t('chooseTime') }</label>
                                                        <div className="select-style">
                                                            <select id="timeframe" onChange={ this.handleSelectTime }>
                                                                { this.renderTimeframes() }
                                                            </select>
                                                        </div>
                                                        {this.getValidationMessages('timeframe')}
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <div className="form-element-wrapper payment-type">
                                            <fieldset id="payment-options">
                                                <legend className="payment-type-header">{ t('paymentType') }</legend>
                                                <div className="payment-type-wrapper credit-wrapper">
                                                    <input id="credit" className="card-radio"
                                                           checked={ this.state.paymentType === 'credit' } type="radio"
                                                           name="payment-type"/>
                                                    <label data-id="credit" onClick={ this.handlePaymentType }
                                                           htmlFor="credit">
                                                        <img className="card" src="/images/visa.png"/>
                                                        <img className="card" src="/images/master.png"/>
                                                        <img className="card" src="/images/ae.png"/>
                                                    </label>
                                                </div>
                                                <div className="payment-type-wrapper paypal-wrapper">
                                                    <input id="paypal" className="card-radio"
                                                           checked={ this.state.paymentType === 'paypal' } type="radio"
                                                           name="payment-type"/>
                                                    <label data-id="paypal" onClick={ this.handlePaymentType }
                                                           htmlFor="paypal">
                                                        <img className="card" src="/images/paypal.png"/>
                                                    </label>
                                                </div>
                                                <div className="payment-type-wrapper faktura-wrapper">
                                                    <input id="faktura" checked={ this.state.paymentType === 'faktura' }
                                                           type="radio" name="payment-type"/>
                                                    <label data-id="faktura" onClick={ this.handlePaymentType }
                                                           htmlFor="paypal">{ t('invoice') }</label>
                                                </div>
                                                {(() => {
                                                    if (this.state.paymentType === 'faktura') {
                                                        return (
                                                            <div className="faktura-info">
                                                                <p>{ t('invoiceText') }</p>
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                            </fieldset>
                                        </div>
                                        {(() => {
                                            if (this.state.paymentType === 'credit') {
                                                return (
                                                    <div className="stripe form-element-wrapper">
                                                        <label htmlFor="card-element">{ t('creditCard')}</label>
                                                        <div id="card-element"/>
                                                        <div id="card-errors" role="alert"/>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <div className="form-element-wrapper">
                                            <label htmlFor="comment">{ t('comment') }</label>
                                            <textarea
                                                id="comment"
                                                className={ this.getValidatorData('comment') }
                                                onChange={ this.handleChange }
                                                value={ this.state.comment }/>
                                            {this.getValidationMessages('comment')}
                                        </div>
                                        <div className="form-element-wrapper">
                                            <div className="check-wrapper">
                                                <input id="subscription" checked={ this.state.subscribe === 'on' }
                                                       value={this.state.subscribe} className="checkbox"
                                                       type="checkbox"/>
                                                <label id="subscribe" onClick={ this.handleNewsletter }
                                                       className="checkbox"
                                                       htmlFor="subscription">{ t('newsletter') }</label>
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <div className="check-wrapper">
                                                <input id="conditions" ref="terms" checked={this.state.terms === 'on'}
                                                       value={this.state.terms} className="checkbox" type="checkbox"/>
                                                <label id="terms" onClick={ this.handleCheckbox } className="checkbox condition-label link"
                                                   htmlFor="conditions">{ t('agree') }</label>
                                                <a className="checkout-link link"
                                                   target="blank"
                                                   href="/politika-privatnosti">{ t('privacyPolicyLink') }</a>&nbsp;{ t('and') }&nbsp;
                                                <a className="checkout-link link" target="blank" href="/tac">{ t('rulesLink') }.</a>
                                            </div>
                                            <span className="error checkbox">{termErrorMsg}</span>
                                        </div>
                                        {(() => {
                                            if (!this.props.location.query.workshop && !this.props.location.query.skype && !this.props.location.query.email) {
                                                return (
                                                    <div className="form-element-wrapper">
                                                        <div className="check-wrapper">
                                                            <input id="cancel" checked={this.state.cancel === 'on'}
                                                                   value={this.state.cancel} className="checkbox"
                                                                   type="checkbox"/>
                                                            <label onClick={ this.handleCancel } className="checkbox"
                                                                   htmlFor="cancel">{ t('understand') }.</label>
                                                        </div>
                                                        <span className="error checkbox">{cancelErrorMsg}</span>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <div className="form-buttons">
                                            <button onClick={ this.resetCheckout }>{ t('back') }</button>
                                            {(() => {
                                                if (this.state.paymentType === 'credit' || this.state.paymentType === 'faktura') {
                                                    return <button className="stripe-button"
                                                         onClick={this.handleSubmit}>{ t('placeOrder') }</button>;
                                                }
                                            })()}
                                            {(() => {
                                                if (this.state.paymentType === 'paypal') {
                                                    return (
                                                        <PayPalButton
                                                            style={paypalStyle}
                                                            locale="en_US"
                                                            commit={ this.state.commit }
                                                            env={ this.state.env }
                                                            client={ this.state.client }
                                                            validate={ (actions) => this.validate(actions) }
                                                            payment={ (data, actions) => this.payment(data, actions) }
                                                            onCancel={ (data) => this.onCancel(data) }
                                                            onError={ (data) => this.onError(data) }
                                                            onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
                                                        />
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className={back}>
                                    <div>
                                        <h2 className="back-header">{ t('thankYou') }</h2>
                                        <p className="preamble">{ t('successfulOrder') }</p>
                                        <p className="preamble">{ t('feedback') }:</p>
                                        <div className="rating">
                                            <p className="rating-text">{ t('impressionWeb') } &#63;</p>
                                            <div ref="stars-1" className="stars stars-1">
                                                <span id="1" ref="star star-1" className="star"
                                                      onClick={ this.handleWebStar }>☆</span>
                                                <span id="2" ref="star star-2" className="star"
                                                      onClick={ this.handleWebStar }>☆</span>
                                                <span id="3" ref="star star-3" className="star"
                                                      onClick={ this.handleWebStar }>☆</span>
                                                <span id="4" ref="star star-4" className="star"
                                                      onClick={ this.handleWebStar }>☆</span>
                                                <span id="5" ref="star star-5" className="star"
                                                      onClick={ this.handleWebStar }>☆</span>
                                            </div>
                                        </div>
                                        <div className="rating">
                                            <p className="rating-text">{ t('impressionPayment') } &#63;</p>
                                            <div ref="stars-2" className="stars stars-2">
                                                <span id="6" ref="star star-6" className="star"
                                                      onClick={ this.handlePayStar }>☆</span>
                                                <span id="7" ref="star star-7" className="star"
                                                      onClick={ this.handlePayStar }>☆</span>
                                                <span id="8" ref="star star-8" className="star"
                                                      onClick={ this.handlePayStar }>☆</span>
                                                <span id="9" ref="star star-9" className="star"
                                                      onClick={ this.handlePayStar }>☆</span>
                                                <span id="10" ref="star star-10" className="star"
                                                      onClick={ this.handlePayStar }>☆</span>
                                            </div>
                                        </div>
                                        <label className="comment-label">{ t('otherComments') }</label>
                                        <textarea onChange={this.handleRatingComment} value={this.state.ratingComment}/>
                                        <button onClick={ this.postRating }>OK</button>
                                        <p className="close-button-explanation">{ t('redirected') }.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <div id="breakpoints" ref={(breakpoints) => {
                    this.breakpoints = breakpoints;
                }}>
                    <div className="breakpoint-small" data-size="small"/>
                    <div className="breakpoint-medium" data-size="medium"/>
                    <div className="breakpoint-large" data-size="large"/>
                </div>
            </div>

        );
    }
}

Checkout.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    save: state.encounter.saved,
    cost: state.encounter.cost,
    issues: state.issue.list,
    stripe: state.encounter.stripe,
    stripeToken: state.encounter.stripeToken,
    paypalEnv: state.encounter.paypalEnv,
    rating: state.encounter.rating,
    errorMessage: state.encounter.errorMessage,
    paypalId: state.encounter.paypalId
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(i18nValidation()))(Checkout)));
