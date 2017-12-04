import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { routeActions } from 'redux-simple-router';
import { encounterValidator } from '../../../../validators/encounters';
import { getIssues } from '../../../actions/issue';
import { i18nValidation } from  '../../../../helpers/validation';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import Header from '../Header';
import styles from './styles.css';

export class Checkout extends FormComponent {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			phone: '',
			skype: '',
			skypeId: '',
			comment: '',
			code: '',
			data: '',
			issue: 'Stres',
			isOpen: false,
			issues: [],
			showSpinner: false
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderIssues = this.renderIssues.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentWillMount () {
		if (window.localStorage.getItem('order')) {
			const cache = JSON.parse(window.localStorage.getItem('order'));
			const data = this.props.data;

            this.setState({
                name: cache.name,
                mail: cache.mail,
                phone: cache.phone,
                skype: cache.skype,
                skypeId: cache.skypeId,
                comment: cache.comment,
                isOpen: false,
                skype: cache.skype,
                email: cache.email,
                cost: cache.cost,
				issue: cache.issue,
                packageDiscount: cache.packageDiscount,
                promoDiscount: cache.promoDiscount,
                data: cache.data,
				save: false
            }, () => {
            });
		}
	}

	componentDidMount () {
		if (!window.localStorage.getItem('order')) {
            this.setState({
                isOpen: true,
                skype: this.props.data.skype,
                email: this.props.data.email,
                cost: this.props.cost,
                packageDiscount: this.props.data.packageDiscount,
                promoDiscount: this.props.data.promoDiscount,
                data: this.props.data
            });
        }

        this.props.dispatch(getIssues());
        this.calculateWiewportSize();
        this.initStripe();
	}

    componentWillReceiveProps (nextProps) {
		this.setState({ issues: nextProps.issues });
		if (nextProps.save === true) {
			this.setState({ showSpinner: false });
		}
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    initStripe () {
        const style = {
            base: {
                fontSize: '16px',
                color: "#32325d",
            }
        };

        const stripe = Stripe('pk_test_CxCOETD4ltbadc9SZWuF2jm9');
        const elements = stripe.elements();
        const card = elements.create('card', { style, placeholder: 'Card' });

        card.addEventListener('change', event => {
            const displayError = document.getElementById('card-errors');
            displayError.textContent = (event.error) ? event.error.message: '';
        });

        card.mount('#card-element');

        this.card = card;
        this.stripe = stripe;
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object}
     */
    calculateWiewportSize () {
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
		return (
            this.props.getValidationMessages(prop).map((message, i) => {
				return <span key={i} className="error">{message}</span>;
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
		const { t } = this.props;
        const front = (this.state.save === true) ? 'front none' : 'front';
        const back = (this.state.save === false) ? 'back none' : 'back';
        const skypeCost = this.state.data.skype ? this.state.data.skype.cost : 0;
        const skypeDurationFactor = this.state.data.skypeDuration.factor;
		const emailCost = this.state.data.email ? this.props.emailDiscount / this.state.data.email.week : 0;
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
				<div className={spinnerClass}>
					<div className="loader">
						<svg className="circular" viewBox="25 25 50 50">
							<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
						</svg>
						<p className="processing-text">Processing purchase</p>
					</div>
				</div>
				<Header location={this.props.location} />
				<div ref={(checkout) => { this.checkout = checkout; }} className="checkout">
					<div ref={(basket) => { this.basket = basket; }} className="basket">
						<div className="header">
							<h1>{ t('heading') }</h1>
						</div>
						<div className="outer-frame">
							<div className="inner-frame">
								<div className="left-col-wrapper">
									<table>
										<colgroup>
											<col width={ firstColSize } />
											<col width="20%" />
											<col width={ lastColSize } />
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
													return(
														<tr>
															<td>{ this.state.data.skype.description }</td>
															<td className="center">{ this.state.data.skype.week }</td>
															<td className="right">{ Math.round(skypeCost * skypeDurationFactor) } KM</td>
														</tr>
													)
												}
											})()}
											{(() => {
												if (this.state.data.email) {
													return(
														<tr>
															<td>{this.state.data.email.description}</td>
															<td className="center">{ this.state.data.email.week }</td>
															<td className="right">{ this.state.emailDiscount } KM</td>
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
												<td className={sumClass}>{Math.round(skypeCost * skypeDurationFactor) + (emailCost * nWeeks)} KM</td>
											</tr>
											{(() => {
												if (this.state.data.packageDiscount) {
													return (
														<tr>
															<td className="right" colSpan="2">{ t('packageDiscount') }</td>
															<td className="right">{ this.state.data.packageDiscount } KM</td>
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
															<td className={className} colSpan="2">{ t('sumWithPackageDiscount')}</td>
															<td className={className}>
																{ (Math.round(this.state.data.skype.cost * skypeDurationFactor) + (emailCost * nWeeks)) - this.state.data.packageDiscount } KM
															</td>
														</tr>
													)
												}
											})()}
											{(() => {
												if (this.state.data.promoDiscount) {
													return(
														<tr>
															<td className="right" colSpan="2">{ t('voucherDiscount') }</td>
															<td className="right">{ this.state.data.promoDiscount } KM</td>
														</tr>
													)
												}
											})()}
											{(() => {
												if (this.state.data.promoDiscount) {
													return (
														<tr>
															<td className="right heavy" colSpan="2">{ t('total') }</td>
															<td className="right heavy">{ this.state.data.cost.total } KM</td>
														</tr>
													)
												}
											})()}
										</tbody>
									</table>
								</div>

								<div ref={(front) => { this.front = front; }} className={front}>
									<form id="payment-form" action="/charge" method="post">
										<div className="form-element-wrapper">
											<label htmlFor="name">{ t('name') }</label>
											<input
												onChange={ this.handleChange }
												id="name"
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
									<p>{ t('pleasePay') }</p>
									<p>YYY YYY YYY YYY</p>
									<p>{ t('includeIdData')}</p>
									<p >{this.props.cost.code}</p>
									<p>{ t('callbackAffirmation') }</p>
									<p>{ t('invoiceAffirmation') }</p>
									<p>Mnogo hvala, tim zdravilje</p>
									<button onClick={ this.resetCheckout }>{ t('close') }</button>
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
	data: state.encounter.data,
	cost: state.encounter.cost,
	issues: state.issue.list,
	emailDiscount: state.encounter.emailDiscount,
	promoDiscount: state.encounter.promoDiscount
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(i18nValidation()))(Checkout)));
