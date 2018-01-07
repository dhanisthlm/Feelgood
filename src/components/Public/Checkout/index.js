import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { routeActions } from 'redux-simple-router';
import ReactDOM from 'react-dom'
import { encounterValidator } from '../../../../validators/encounters';
import { getIssues } from '../../../actions/issue';
import { saveRating, resetRating } from '../../../actions/encounter';
import { i18nValidation } from  '../../../../helpers/validation';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import { getCountries } from '../../../../helpers/countries';
import { getCurrency } from '../../../../helpers/currencies';
import Header from '../Header';
import Footer from '../Footer';
import styles from './styles.css';

let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

export class Checkout extends FormComponent {
	constructor (props) {
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
            showDialog: false,
            startTime: null,
            timeRemaining: '2:00',
            idleTime: 0,
            location: null,
            countInactivity: true,
            idleTtl: 300000,
            tick: 10000,
			webRating: 0,
			payRating: 0,
            ratingComment: '',
            paymentType: 'credit',
            timeframes: ['Jutro', 'Popodne', 'Veče', 'Bilo kada'],
            country: 'Bosnia and Herzegovina',
            newsletter: true,
            currency: 'BAM',
            cost: 0,
            paypalFactor: 1,
            subscribe: 'on',
            terms: 'off',
            cancel: 'off',
            termsIsDirty: false,
            cancelIsDirty: false,
            comment: '',
            paypalCurrencies: ['€', '$', 'kn', 'kr'],
            invoiceCurrencies: ['€', 'KM']
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderIssues = this.renderIssues.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.debounce = this.debounce.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.timeIncrement = this.timeIncrement.bind(this);
        this.listenForActivity = this.listenForActivity.bind(this);
        this.startCountInactivity = this.startCountInactivity.bind(this);
        this.stopCountInactivity = this.stopCountInactivity.bind(this);
        this.resetInactivity = this.resetInactivity.bind(this);
        this.debounce = this.debounce.bind(this);
        this.countDownToCancel = this.countDownToCancel.bind(this);
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
    }

	componentWillMount () {
		if (window.localStorage.getItem('order') !== null) {
			const cache = JSON.parse(window.localStorage.getItem('order'));
            this.setState({ ...cache, save: false });
            this.props.dispatch(getIssues());
        }
	}

	componentWillUnmount () {
	    this.resetOrder();
    }

	componentDidMount () {
        if (window.localStorage.getItem('order')) {
            this.initStripe();
            this.startCountInactivity();
            this.listenForActivity();
            this.calculateViewportSize();
            this.setState({ env: window.localStorage.getItem('pe') });
        } else {
            this.props.dispatch(routeActions.push('/'));
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    componentWillReceiveProps (nextProps) {
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
	prepInit (nextProps) {
	    if (nextProps.issues === this.props.issues) return;

        this.setState({
            issues: nextProps.issues,
            language: JSON.parse(window.localStorage.getItem('order')).language,
            cost: JSON.parse(window.localStorage.getItem('order')).cost
        });

        if (window.localStorage.getItem('step') === null) {
            this.props.dispatch(routeActions.push('/'));
        }

        if (nextProps.errorMessage.length) {
            this.setState({ showSpinner: false });
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	handleNewsletter () {
       const newsletter = this.state.newsletter;
       const subscribe = this.state.subscribe === 'on' ? 'off' : 'on';
       this.setState({ subscribe });
       this.setState({ newsletter: this.state.subscribe === 'on' });
        window.localStorage.setItem('newsletter', newsletter);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	handlePaymentType (event) {
        const id = event.currentTarget.getAttribute('data-id');
        const options = document.getElementById('payment-options');
        let paypalFactor = 1;

        this.setState({ paymentType: id }, () => {
           if (id === 'credit') {
               this.initStripe();
           }

           if (id === 'paypal') {
               paypalFactor = (this.state.paypalCurrencies.indexOf(this.state.language) > -1) ? 1 : 2;
               this.setState({ termsIsDirty: true, cancelIsDirty: true })
           } else if (id === 'faktura') {
               paypalFactor = (this.state.invoiceCurrencies.indexOf(this.state.language) > -1) ? 1 : 2;
           } else {
               paypalFactor = 1;
           }

           this.setState({ paypalFactor })
       });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleTimePreference (event) {
        const id = event.target.id;
        this.setState({timePreference: id});
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSave (nextProps) {
        if (nextProps.save === true) {
            window.scrollTo(0, 0);
            window.localStorage.setItem('step', '2');
            window.removeEventListener('mousemove', this.throttledDebounce);
            window.removeEventListener('keydown', this.throttledDebounce);
            this.stopCountInactivity();
            this.setState({ showSpinner: false, save: true });
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	postRating () {
    	const stripe = JSON.parse(window.localStorage.getItem('stripe'));
    	const id = (stripe.data.encounterId) ? stripe.data.encounterId : stripe.data._id;

    	this.props.dispatch(saveRating(
    		id, {
				web: 5 - this.state.webRating +1,
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
    handleRating (nextProps) {
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
    handleCheckbox () {
            const terms = this.state.terms === 'on' ? 'off' : 'on';
            this.setState({ terms });
            this.setState({ termsIsDirty: true });
            this.handlePaypal ();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleCancel () {
        const cancel = this.state.cancel === 'on' ? 'off' : 'on';
        this.setState({ cancel });
        this.setState({ cancelIsDirty: true });
        this.handlePaypal();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	handleRatingComment (event) {
    	this.setState({ ratingComment: event.target.value });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	handleWebStar (event) {
        const stars = document.querySelector('.stars-1');
        const star = stars.querySelectorAll('.star');

        for (let i = 1; i <= 5; i++) {
            if (event.target.id <= i) {
                star[i - 1].classList.add('filled');
            } else {
                star[i - 1].classList.remove('filled');
            }
        }

        this.setState({ webRating: event.target.id });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handlePayStar (event) {
        const stars = document.querySelector('.stars-2');
        const star = stars.querySelectorAll('.star');

		for (let i = 6; i <= 10; i++) {
            if (event.target.id <= i) {
                star[i - 6].classList.add('filled');
            } else {
                star[i - 6].classList.remove('filled');
			}
		}

		this.setState({ payRating: event.target.id });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    closeDialog () {
        clearInterval(this.countdownToLogoutInterval);
        this.setState({ showDialog: false, timeRemaining: '' });
        this.resetInactivity();
        this.startCountInactivity();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    startCountInactivity () {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(this.timeIncrement.bind(this), this.state.tick);
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    debounce () {
        this.setState({ idleTime: 0 });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    listenForActivity () {
        this.throttledDebounce = _.throttle(this.debounce, this.state.tick);
        window.addEventListener('mousemove', this.throttledDebounce);
        window.addEventListener('keydown', this.throttledDebounce);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    stopCountInactivity () {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            delete this.timerInterval;
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    resetInactivity () {
        this.setState({ idleTime: 0, showDialog: false });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    timeIncrement () {
        this.setState({ idleTime: parseInt(this.state.idleTime + parseInt(this.state.tick)) });
        if (this.state.idleTime > parseInt(this.state.idleTtl)) {
            this.stopCountInactivity();

            this.setState({
                startTime: Date.now(),
                showDialog: true
            }, () => {
                this.countdownToLogoutInterval = setInterval(this.countDownToCancel, 1000);
            });
        }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    resetOrder () {
		clearInterval(this.countdownToLogoutInterval);
		clearInterval(this.timerInterval);

		this.setState({ showDialog: false });
		this.stopCountInactivity();
		this.setState({ countInactivity: false });
		this.props.dispatch(routeActions.push('/'));

		window.localStorage.removeItem('order');
        window.localStorage.removeItem('stripe');
        window.localStorage.removeItem('saved');
        window.removeEventListener('mousemove', this.throttledDebounce);
        window.removeEventListener('keydown', this.throttledDebounce);
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	countDownToCancel () {
        const MODAL_COUNTDOWN_START = 120000; //2 minutes
        const startTime = this.state.startTime;
        const timeDiff = Date.now() - startTime;
        const ns = (((MODAL_COUNTDOWN_START - timeDiff) / 1000) >> 0);
        const m = (ns / 60) >> 0;
        const s = ns - m * 60;

        if (ns > 0) {
            this.setState({ timeRemaining: m + ':' + (('' + s).length > 1 ? '' : '0') + s });
        }

        if (ns === 0) {
            this.resetOrder();
        }
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    initStripe () {
    	if (typeof Stripe === 'undefined') {
    	    return;
        }

    	const { t } = this.props;
    	const element = document.getElementById('card-element');

    	if (element) {
            const stripe = Stripe(window.localStorage.getItem('st'));
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
    calculateViewportSize () {
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
	resetCheckout () {
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
	handleChange (e) {
		const cache = JSON.parse(window.localStorage.getItem('order'));
		cache[e.target.id] = e.target.value;
		window.localStorage.setItem('order', JSON.stringify(cache));
		this.setState({ [e.target.id]: e.target.value });
        this.handlePaypal ();
    }

	handlePaypal () {
        if (this.state.paymentType === 'paypal') {
            this.props.validate((error) => {
                if (error || (this.state.termsIsDirty && this.state.terms === 'off') || (this.state.cancelIsDirty && this.state.cancel === 'off')) {
                     this.actions.disable();
                } else {
                     this.actions.enable();
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
	handleSubmit (event) {
		event.preventDefault();
        this.setState({
            termsIsDirty: true,
            cancelIsDirty: true,
            currency: this.getSelectedCurrency()[0].code.toUpperCase()
        });

		this.props.validate((error) => {
			const { t } = this.props;

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
	getValidationMessages (prop) {
		const { t } = this.props;
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
  	handleSelect (event) {
        this.setState({ issue: event.target.value });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSelectTime (event) {
        this.setState({ timeframe: event.target.value });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    handleSelectCountry (event) {
  	    const countryObj = getCountries().filter((countryObj) => countryObj.name === event.target.value)[0];
  	    const currency = getCurrency()[countryObj.code];
        this.setState({ country: event.target.value, currency });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    onCancel (data) {
        console.log('cancel', data);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    onError (data) {
        console.log('error', data)
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    payment(data, actions) {
        const amount = this.state.paypalFactor === 1
            ? this.getCurrencied(this.state.cost.total)
            : this.state.cost.total / this.getSelectedCurrency()[0].rate / 2;

        const currency = this.state.paypalCurrencies.indexOf(this.getSelectedCurrency()[0].currency) > -1
            ? this.getSelectedCurrency()[0].code.toUpperCase() : 'EUR';

        return actions.payment.create({
              transactions: [
                  {
                      amount: { total: amount, currency }
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
    renderTimeframes () {
  	    const timeframes = ['Odaberite vrijeme', ...this.state.timeframes];
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

            return <option key={i} value={frameValue}>{frameName}</option>
        });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	renderIssues () {
		const { t } = this.props;
		const issues = ['Izaberite temu', ...this.state.issues];
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
    renderCountries () {
        const { t } = this.props;

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
    validate (actions) {
        this.actions = actions;
        this.handlePaypal(actions);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getSelectedCurrency () {
        return this.state.languages.filter((country) => {
            return country.currency === this.state.language;
        });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getCurrencied (value) {
        return this.state.paypalFactor === 1 ? (value / this.getSelectedCurrency()[0].rate).toFixed(0) : (value).toFixed(0);
    }

    getSkypeCost() {
        if (!this.state.data.skype) return 0;
        const skypeCost = this.state.data.skype ? 60 * this.state.data.skype.week : 0;
        const skypeDurationFactor = this.state.data.skypeDuration.factor;
        const skype = skypeCost * skypeDurationFactor;
        return this.getCurrencied(skype) / this.state.paypalFactor;
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getEmailCost() {
        if (!this.state.data.email) return 0;
        return this.getCurrencied(this.state.data.email.cost * this.state.data.email.week) / this.state.paypalFactor;
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getSum () {
        const skype = this.state.data.skype ? this.getSkypeCost() : 0;
        const email = this.state.data.email ? this.getEmailCost() : 0;
        return (skype + email);
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getPackageSum() {
        return Math.round(this.getSum() - this.getPackageDiscount());
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getPackageDiscount() {
        const skypeCost = this.state.data.skype ? this.state.data.skype.cost * this.state.data.skypeDuration.factor : 0;
        const skypeDiscount = this.getSkypeCost() - (this.getCurrencied(skypeCost) / this.state.paypalFactor);
        const emailDiscount = this.getEmailCost() - (this.getCurrencied(this.state.emailDiscount) / this.state.paypalFactor);
        const packageDiscount = this.state.data.email && this.state.data.skype ? (this.getEmailCost() + this.getSkypeCost() - skypeDiscount - emailDiscount) * 0.05 : 0;
        return Math.floor(Math.round(packageDiscount) + parseFloat(skypeDiscount) + parseFloat(emailDiscount));
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getVoucherDiscount () {
        return this.state.data.promoDiscount > 0
            ? Math.floor(this.getPackageSum() / 2)
            : 0;
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    getTotal () {
        return this.getVoucherDiscount() > 0 ? this.getPackageSum() - this.getVoucherDiscount() : this.getPackageSum();
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	render () {
	    if (window.localStorage.getItem('order') === null) {
	        return null;
        }

		const { t } = this.props;
		const front = (window.localStorage.getItem('step') === '1') ? 'front' : 'front none';
        const back = (window.localStorage.getItem('step') === '2') ? 'back' : 'back none';
		const firstColSize = (this.width === 'small') ? '50%' : '60%';
		const lastColSize = (this.width === 'small') ? '30%' : '20%';
		const currency = this.state.paypalFactor === 1 ? this.state.language : '€';
        const termErrorMsg = this.state.terms === 'off' && this.state.termsIsDirty ? 'Ovo polje je obavezno' : '';
        const cancelErrorMsg = this.state.cancel === 'off' && this.state.cancelIsDirty ? 'Ovo polje je obavezno' : '';

		const sumClass =
			(typeof this.state.data.packageDiscount === 'undefined' &&
			typeof this.state.data.promoDiscount === 'undefined')
				? 'right heavy' : 'right';

        const centerClass =
            (typeof this.state.data.packageDiscount === 'undefined' &&
            typeof this.state.data.promoDiscount === 'undefined')
                ? 'center heavy' : 'center';

		const spinnerClass = this.state.showSpinner ? 'showbox' : 'none';

        const paypalStyle = {
            lable: 'en_US',
            size: 'responsive',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            tagline: false
        };

        return (
			<div className="page">
                {(() => {
                    if (this.state.showDialog === true) {
                        return (
							<div className="activity-wrapper">
								<div className="box">
									<p>Dugo ste bili neaktivni, ako ne kliknete na moju kupovinu, vaš započeti nalog će se završiti i u {this.state.timeRemaining} minuta ćete biti preusmereni na početnu stranicu.</p>
									<button onClick={this.closeDialog}>Nastaviti</button>
								</div>
							</div>
                        )
                    }
				})()}
				<div className={spinnerClass}>
					<div className="loader">
						<svg className="circular" viewBox="25 25 50 50">
							<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
						</svg>
						<p className="processing-text">Obrada nabavke</p>
					</div>
				</div>
				<Header location={this.props.location} />
				<div ref={(checkout) => { this.checkout = checkout; }} className="checkout">
					<div className="basket">
						<div className="page-header">
							<h1>{ t('heading') }</h1>
						</div>
						<div className="outer-frame">
							<div className="inner-frame">
                                {(() => {
                                    if (window.localStorage.getItem('step') === '1') {
                                        return (
											<div className="left-col-wrapper">
												<table>
													<colgroup>
														<col width={ firstColSize }/>
														<col width="20%"/>
														<col width={ lastColSize }/>
													</colgroup>
													<thead>
													<tr>
														<th>{ t('item') }</th>
														<th>{ t('weeks') }</th>
														<th>{ t('price') }</th>
													</tr>
													</thead>
													<tbody>
                                                    {(() => {
                                                        if (this.state.data.skype) {
                                                            return (
																<tr>
																	<td>{ this.state.data.skype.description }</td>
																	<td className="center">{ this.state.data.skype.week }</td>
																	<td className="center">{ this.getSkypeCost() }&nbsp;{ currency }</td>
                                                        </tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.email) {
                                                            return (
																<tr>
																	<td>{this.state.data.email.description}</td>
																	<td className="center">{ this.state.data.email.week }</td>
																	<td className="center">{ this.getEmailCost() }&nbsp;{ currency }</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
													<tr>
														<td>&nbsp;</td>
														<td>&nbsp;</td>
														<td>&nbsp;</td>
													</tr>
													<tr>
														<td className={sumClass} colSpan="2">{ t('sum') }</td>
														<td className={centerClass}>{ this.getSum() }&nbsp;{ currency }</td>
													</tr>
                                                    {(() => {
                                                        if (this.state.data.packageDiscount || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                            return (
																<tr>
																	<td className="right"
																		colSpan="2">{ t('packageDiscount') }</td>
																	<td className="center">{ this.getPackageDiscount() }&nbsp;{ currency }</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.packageDiscount > 0 || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                            const labelName = this.state.data.promoDiscount
                                                                ? 'right' : 'right heavy';

                                                            const valueName = this.state.data.promoDiscount
                                                                ? 'center' : 'center heavy';

                                                            return (
																<tr>
																	<td className={labelName}
																		colSpan="2">{ t('sumWithPackageDiscount')}</td>
																	<td className={valueName}>
                                                                        { this.getPackageSum() }&nbsp;{ currency }
																	</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.promoDiscount) {
                                                            return (
																<tr>
																	<td className="right"
																		colSpan="2">{ t('voucherDiscount') }</td>
																	<td className="center">{ this.getVoucherDiscount() }&nbsp;{ currency }</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.promoDiscount || this.state.data.skype && this.state.data.skype.week > 1 || this.state.data.email && this.state.data.email.week > 1) {
                                                            return (
																<tr>
																	<td className="right heavy"
																		colSpan="2">{ t('total') }</td>
																	<td className="center heavy">{ this.getTotal() }&nbsp;{ currency }<span className="asterix">*</span></td>
																</tr>
                                                            )
                                                        }
                                                    })()}
													</tbody>
												</table>
                                                <p className="asterix-text">
                                                    <span>*</span>Mogu se pojaviti određeni krugovi
                                                </p>
                                                <div className="disclaimer">
                                                    {(() => {
                                                        if (this.state.paypalFactor !== 1) {
                                                            return(
                                                                <div>
                                                                    <p className="paypal">
                                                                        Nažalost, model plaćanja ne podržava odabranu valutu, stoga će se iznos koji će biti isplaćen EUR.
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
																	<p>Neformalno smo mogli da obradimo vašu narudžbinu. {t(`stripe.${this.props.errorMessage}`)}</p>
																</div>
                                                            )
                                                        }
                                                    })()}
												</div>
											</div>
                                        )
                                    }
                                })()}
								<div ref={(front) => { this.front = front; }} className={front}>
									<form id="payment-form">
										<div className="form-element-wrapper">
											<label htmlFor="name">{ t('name') }</label>
											<input
												onChange={ this.handleChange }
												id="name"
												className="name"
												type="text"
												value={ this.state.name }/>
											{this.getValidationMessages('name')}
										</div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="adress">Ulica</label>
                                            <input
                                                onChange={ this.handleChange }
                                                id="street"
                                                className="street"
                                                type="text"
                                                value={ this.state.street }/>
                                            {this.getValidationMessages('street')}
                                        </div>
                                        <div className="city-wrapper">
                                            <div className="form-element-wrapper">
                                                <label htmlFor="postal">Poštanski broj</label>
                                                <input
                                                    onChange={ this.handleChange }
                                                    id="postal"
                                                    className="postal"
                                                    type="text"
                                                    value={ this.state.postal }/>
                                                {this.getValidationMessages('postal')}
                                            </div>
                                            <div className="form-element-wrapper">
                                                <label htmlFor="city">Grad</label>
                                                <input
                                                    onChange={ this.handleChange }
                                                    id="city"
                                                    className="city"
                                                    type="text"
                                                    value={ this.state.city }/>
                                                {this.getValidationMessages('city')}
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="country">Zemlja</label>
                                            <div className="select-style">
                                                <select data-id={this.state.currency} value={this.state.country} id="country" onChange={ this.handleSelectCountry }>
                                                    { this.renderCountries() }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="phone">{ t('phone') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                id="phone"
                                                type="text"
                                                value={ this.state.phone }/>
                                            { this.getValidationMessages('phone') }
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="email">{ t('email') }</label>
                                            <input
                                                onChange={ this.handleChange }
                                                id="mail"
                                                type="text"
                                                value={ this.state.mail }/>
                                            { this.getValidationMessages('mail') }
                                        </div>
										<div className="form-element-wrapper">
											<label htmlFor="issue">{t('issue')}</label>
											<div className="select-style">
												<select id="issue" onChange={ this.handleSelect }>
													{ this.renderIssues() }
												</select>
											</div>
                                            {this.getValidationMessages('issue')}
										</div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="skype">Skype ID</label>
                                            <input
                                                onChange={ this.handleChange }
                                                id="skypeId"
                                                type="text"
                                                value={ this.state.skypeId }
                                            />
                                            { this.getValidationMessages('skype') }
                                        </div>
                                        <div className="form-element-wrapper">
                                            <label htmlFor="timeframe">Odaberite vrijeme</label>
                                            <div className="select-style">
                                                <select id="timeframe" onChange={ this.handleSelectTime }>
                                                    { this.renderTimeframes() }
                                                </select>
                                            </div>
                                            {this.getValidationMessages('timeframe')}
                                        </div>
                                        <div className="form-element-wrapper payment-type">
                                            <fieldset id="payment-options">
                                                <legend className="payment-type-header">Tip plaćanja</legend>
                                                <div className="payment-type-wrapper credit-wrapper">
                                                    <input id="credit" className="card-radio" checked={ this.state.paymentType === 'credit' } type="radio" name="payment-type" />
                                                    <label data-id="credit" onClick={ this.handlePaymentType } htmlFor="credit">
                                                        <img className="card" src="/images/visa.png" />
                                                        <img className="card" src="/images/master.png" />
                                                        <img className="card" src="/images/ae.png" />
                                                    </label>
                                                </div>
                                                <div className="payment-type-wrapper paypal-wrapper">
                                                    <input id="paypal" className="card-radio" checked={ this.state.paymentType === 'paypal' } type="radio" name="payment-type" />
                                                    <label data-id="paypal" onClick={ this.handlePaymentType } htmlFor="paypal">
                                                        <img className="card" src="/images/paypal.png" />
                                                    </label>
                                                </div>
                                                <div className="payment-type-wrapper faktura-wrapper">
                                                    <input id="faktura" checked={ this.state.paymentType === 'faktura' } type="radio" name="payment-type" />
                                                    <label data-id="faktura" onClick={ this.handlePaymentType } htmlFor="paypal">Faktura</label>
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
                                                        <label htmlFor="card-element">Kreditna kartica</label>
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
                                                value={ this.state.comment } />
											{this.getValidationMessages('comment')}
										</div>
                                        <div className="form-element-wrapper">
                                            <div className="check-wrapper">
                                                <input id="subscription" checked={ this.state.subscribe === 'on' } value={this.state.subscribe} className="checkbox" type="checkbox" />
                                                <label id="subscribe" onClick={ this.handleNewsletter } className="checkbox" htmlFor="subscription">Da, hvala, želim da dobijam informacije o popustima i drugim ponudama od zdravlje.nu.</label>
                                            </div>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <div className="check-wrapper">
                                                <input id="conditions" ref="terms" checked={this.state.terms === 'on'} value={this.state.terms} className="checkbox" type="checkbox" />
                                                <label id="terms" onClick={ this.handleCheckbox } className="checkbox" htmlFor="conditions">Slažem se sa <a className="checkout-link" target="blank" href="/politika-privatnosti">Politikom privatnosti</a> i <a className="checkout-link" target="blank" href="/tac">Pravilima i uslovima.</a>.</label>
                                            </div>
                                            <span className="error checkbox">{termErrorMsg}</span>
                                        </div>
                                        <div className="form-element-wrapper">
                                            <div className="check-wrapper">
                                                <input id="cancel" checked={this.state.cancel === 'on'} value={this.state.cancel} className="checkbox" type="checkbox" />
                                                <label onClick={ this.handleCancel } className="checkbox" htmlFor="cancel">Razumijem da imam besplatnu promjenu termina najkasnije 24 sata do početka samog termina.</label>
                                            </div>
                                            <span className="error checkbox">{cancelErrorMsg}</span>
                                        </div>
										<div className="form-buttons">
											<button onClick={ this.resetCheckout }>{ t('back') }</button>
                                            {(() => {
                                                if (this.state.paymentType === 'credit' || this.state.paymentType === 'faktura') {
                                                    return <button className="stripe-button" onClick={this.handleSubmit}>{ t('placeOrder') }</button>;
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
									</form>
								</div>
								<div className={back}>
									<div>
										<h2 className="back-header">Hvala vam na nalogu</h2>
										<p className="preamble">Vaša kupovina je uspješna i dobili smo Vašu narudžbu. Uskoro ćemo Vas kontaktirat za inicijalnu besplatnu procjenu i za zakazivanje termina.</p>
                                        <p className="preamble">Molimo Vas, uzmite trenutak da nam date povratne informacije:</p>
                                        <div className="rating">
											<p className="rating-text">Kakav je vaš utisak o web stranici &#63;</p>
											<div ref="stars-1" className="stars stars-1">
												<span id="1" ref="star star-1" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="2" ref="star star-2" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="3" ref="star star-3" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="4" ref="star star-4" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="5" ref="star star-5" className="star" onClick={ this.handleWebStar }>☆</span>
											</div>
										</div>
										<div className="rating">
											<p className="rating-text">Kakav je vaš utisak o postupku plaćanja &#63;</p>
											<div ref="stars-2" className="stars stars-2">
												<span id="6" ref="star star-6" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="7" ref="star star-7" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="8" ref="star star-8" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="9" ref="star star-9" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="10" ref="star star-10" className="star" onClick={ this.handlePayStar }>☆</span>
											</div>
										</div>
										<label className="comment-label">Ostali komentari</label>
										<textarea onChange={this.handleRatingComment} value={this.state.ratingComment} />
										<button onClick={ this.postRating }>OK</button>
                                        <p className="close-button-explanation">Vratit ćete se natrag na početnu stranicu kada pritisnete ok.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
				<div id="breakpoints" ref={(breakpoints) => { this.breakpoints = breakpoints; }}>
					<div className="breakpoint-small" data-size="small" />
					<div className="breakpoint-medium" data-size="medium" />
					<div className="breakpoint-large" data-size="large" />
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
	rating: state.encounter.rating,
	errorMessage: state.encounter.errorMessage,
    paypalId: state.encounter.paypalId
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(i18nValidation()))(Checkout)));
