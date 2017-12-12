import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { routeActions } from 'redux-simple-router';
import { encounterValidator } from '../../../../validators/encounters';
import { getIssues } from '../../../actions/issue';
import { saveRating } from '../../../actions/encounter';
import { getStripeToken } from '../../../actions/config';
import { i18nValidation } from  '../../../../helpers/validation';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import Header from '../Header';

import styles from './styles.css';

export class Checkout extends FormComponent {
	constructor (props) {
		super(props);

		this.state = {
			issue: 'Stres',
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
            idleTtl: 10000,
            tick: 10000,
			webRating: 0,
			payRating: 0,
            ratingComment: ''
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
	}

	componentWillMount () {
		if (window.localStorage.getItem('order')) {
			const cache = JSON.parse(window.localStorage.getItem('order'));
            this.props.dispatch(getStripeToken());
            this.setState({ ...cache, save: false });
		} else {
            this.props.dispatch(routeActions.push('/anka'));
        }
	}

	componentDidMount () {
        if (window.localStorage.getItem('order') && !window.localStorage.getItem('saved')) {
            this.startCountInactivity();
            this.listenForActivity();
            this.props.dispatch(getIssues());
            this.calculateViewportSize();
            this.initStripe();
        }
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    componentWillReceiveProps (nextProps) {
		this.setState({ issues: nextProps.issues });

		if (nextProps.rating === true) {
            window.localStorage.removeItem('saved');
            window.localStorage.removeItem('order');
            window.localStorage.removeItem('stripe');
			this.props.dispatch(routeActions.push('/anka'));
		}

		if (nextProps.stripeToken.length) {

        }

		if (Object.keys(nextProps.stripe).length) {
			window.localStorage.setItem('stripe', JSON.stringify(nextProps.stripe));
		}

		if (nextProps.save === true) {
			window.localStorage.setItem('saved', true);
            window.removeEventListener('mousemove', this.throttledDebounce);
            window.removeEventListener('keydown', this.throttledDebounce);
            this.stopCountInactivity();
			this.setState({ showSpinner: false, save: true });
		}

		if (nextProps.errorMessage.length) {
            this.setState({ showSpinner: false });
		}
	}

	postRating () {
    	const stripe = JSON.parse(window.localStorage.getItem('stripe'));
    	const id = stripe.data.encounterId;
    	this.props.dispatch(saveRating(
    		id, {
				web: 5 - this.state.webRating +1,
				pay: 10 - this.state.payRating + 1,
				comment: this.state.ratingComment
			}
		))
	}

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
		this.props.dispatch(routeActions.push('/anka'));

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
    	if (typeof Stripe === 'undefined') return;
    	const { t } = this.props;
        const stripe = Stripe('pk_test_CxCOETD4ltbadc9SZWuF2jm9');
        const elements = stripe.elements({ locale: 'en' });
        const card = elements.create('card', { placeholder: 'Card' });

        this.card = card;
        this.stripe = stripe;

        card.addEventListener('change', event => {
            const displayError = document.getElementById('card-errors');
            displayError.textContent = (event.error) ? t(`stripe.${event.error.code}`) : '';
        });

        card.mount('#card-element');
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
        this.props.dispatch(routeActions.push('/anka'));
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
		this.setState({ [e.target.id]: e.target.value })
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	handleSubmit (event) {
		event.preventDefault();

		this.props.validate((error) => {
			const { t } = this.props;

            if (!error) {
                this.stripe.createToken(this.card).then(result => {
                    if (result.error) {
                        // Inform the customer that there was an error
                        const errorElement = document.getElementById('card-errors');
                        errorElement.textContent = t(`stripe.${result.error.code}`);
                    } else {
                    	this.setState({ showSpinner: true });
                        // Send the token to your server
                        this.props.dispatch(saveEncounter(result.token.id, this.state));
                    }
                });
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
        const cache = JSON.parse(window.localStorage.getItem('order'));
        cache.issue = event.target.value;
        window.localStorage.setItem('order', JSON.stringify(cache));
    	this.setState({ issue: event.target.value });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	renderIssues () {
		const { t } = this.props;

		return this.state.issues.map((issue, i) => {
			const issueName = `issues.${issue.name}.name`;
			return (
				<option key={i} value={t(issueName)}>{t(issueName)}</option>
			)
		})
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
	render () {
		if (!window.localStorage.getItem('order') && this.props.save === false) {
			//return null;
		}

		const { t } = this.props;
		const front = (!window.localStorage.getItem('saved')) ? 'front' : 'front none';
        const back = (window.localStorage.getItem('saved')) ? 'back' : 'back none';

        const skypeCost = this.state.data.skype ? this.state.data.skype.cost : 0;
        const skypeDurationFactor = this.state.data.skypeDuration.factor;
		const emailCost = this.state.data.email ? this.state.emailDiscount / this.state.data.email.week : 0;
		const nWeeks = this.state.data.email ? this.state.data.email.week : 0;

		const firstColSize = (this.width === 'small') ? '50%' : '60%';
		const lastColSize = (this.width === 'small') ? '30%' : '20%';

		const sumClass =
			(typeof this.state.data.packageDiscount === 'undefined' &&
			typeof this.state.data.promoDiscount === 'undefined')
				? 'right heavy' : 'right';

		const spinnerClass = this.state.showSpinner ? 'showbox' : 'none';

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
                                    if (!window.localStorage.getItem('saved')) {
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
																	<td className="right">{ Math.round(skypeCost * skypeDurationFactor) }&nbsp;KM</td>
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
																	<td className="right">{ this.state.data.email.cost }&nbsp;KM</td>
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
														<td className={sumClass}>{Math.round(skypeCost * skypeDurationFactor) + (emailCost * nWeeks)}&nbsp;KM</td>
													</tr>
                                                    {(() => {
                                                        if (this.state.data.packageDiscount) {
                                                            return (
																<tr>
																	<td className="right"
																		colSpan="2">{ t('packageDiscount') }</td>
																	<td className="right">{ this.state.data.packageDiscount }&nbsp;KM</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.packageDiscount > 0) {
                                                            const className = this.state.data.promoDiscount
                                                                ? 'right' : 'right heavy';

                                                            return (
																<tr>
																	<td className={className}
																		colSpan="2">{ t('sumWithPackageDiscount')}</td>
																	<td className={className}>
                                                                        { (Math.round(this.state.data.skype.cost * skypeDurationFactor) + (emailCost * nWeeks)) - this.state.data.packageDiscount }&nbsp;KM
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
																	<td className="right">{ this.state.data.promoDiscount }&nbsp;KM</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (this.state.data.promoDiscount) {
                                                            return (
																<tr>
																	<td className="right heavy"
																		colSpan="2">{ t('total') }</td>
																	<td className="right heavy">{ this.state.cost.total }&nbsp;KM</td>
																</tr>
                                                            )
                                                        }
                                                    })()}
													</tbody>
												</table>
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
								<div ref={(front) => { this.front = front; }} className={front}>
									<form id="payment-form" action="/charge" method="post">
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
											<label htmlFor="skype">{t('issue')}</label>
											<div className="select-style">
												<select id="issue" onChange={ this.handleSelect } value={ this.state.issue }>
													{ this.renderIssues() }
												</select>
											</div>
										</div>
										<div className="stripe form-element-wrapper">
											<label htmlFor="card-element">Payment</label>
											<div id="card-element" />
											<div id="card-errors" role="alert" />
										</div>
										<div className="form-element-wrapper">
											<label htmlFor="comment">{ t('comment') }</label>
											<textarea
												id="comment"
												className={ this.getValidatorData('comment') }
												onChange={ this.handleChange }>
												{ this.state.comment }
											</textarea>
											{this.getValidationMessages('comment')}
										</div>
										<div className="form-buttons">
											<button onClick={ this.resetCheckout }>{ t('back') }</button>
											<button onClick={ this.handleSubmit }>{ t('placeOrder') }</button>
										</div>
									</form>
								</div>
								<div className={back}>
									<div>
										<h2 className="back-header">Mnogo hvala</h2>
										<p className="preamble">Vaša uplata je uspješna i dobili smo vašu porudžbinu. Uskoro ćemo vas kontaktirati.</p>
										<div className="rating">
											<p className="rating-text">Kako doživljavate web stranicu &#63;</p>
											<div ref="stars-1" className="stars stars-1">
												<span id="1" ref="star star-1" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="2" ref="star star-2" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="3" ref="star star-3" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="4" ref="star star-4" className="star" onClick={ this.handleWebStar }>☆</span>
												<span id="5" ref="star star-5" className="star" onClick={ this.handleWebStar }>☆</span>
											</div>
										</div>
										<div className="rating">
											<p className="rating-text">Kako se doživljava plaćanja &#63;</p>
											<div ref="stars-2" className="stars stars-2">
												<span id="6" ref="star star-6" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="7" ref="star star-7" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="8" ref="star star-8" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="9" ref="star star-9" className="star" onClick={ this.handlePayStar }>☆</span>
												<span id="10" ref="star star-10" className="star" onClick={ this.handlePayStar }>☆</span>
											</div>
										</div>
										<label className="comment-label">Ostali komentari</label>
										<textarea onChange={this.handleRatingComment}>{this.state.ratingComment}</textarea>
										<button onClick={ this.postRating }>Na Prvu stranicu</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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
	errorMessage: state.encounter.errorMessage
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(i18nValidation()))(Checkout)));
