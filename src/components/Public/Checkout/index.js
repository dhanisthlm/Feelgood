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
			issues: []
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderIssues = this.renderIssues.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	componentDidMount () {
        this.setState({
            isOpen: true,
            skype: this.props.data.skype,
            email: this.props.data.email,
            cost: this.props.cost,
            packageDiscount: this.props.data.packageDiscount,
            promoDiscount: this.props.data.promoDiscount,
            data: this.props.data
        });

        this.props.dispatch(getIssues());
        this.calculateWiewportSize();
        this.initStripe();
    }

    componentWillReceiveProps (nextProps) {
		this.setState({ issues: nextProps.issues });
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
                    	console.log(result.error);
                        // Inform the customer that there was an error
                        const errorElement = document.getElementById('card-errors');
                        errorElement.textContent = t(`stripe.${result.error.code}`);
                    } else {
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
            this.props.getValidationMessages(prop).map((message) => {
				return <span className="error">{message}</span>;
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
	renderIssues () {
		const { t } = this.props;

		return this.state.issues.map(issue => {
			const issueName = `issues.${issue.name}.name`;
			return (
				<option value={t(issueName)}>{t(issueName)}</option>
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
        const front = (this.props.save === true) ? 'front none' : 'front';
        const back = (this.props.save === false) ? 'back none' : 'back';
        const skypeCost = this.props.data.skype ? this.props.data.skype.cost : 0;
        const skypeDurationFactor = this.props.data.skypeDuration.factor;
		const emailCost = this.props.data.email ? this.props.emailDiscount / this.props.data.email.week : 0;
		const nWeeks = this.props.data.email ? this.props.data.email.week : 0;
		const firstColSize = (this.width === 'small') ? '50%' : '60%';
		const lastColSize = (this.width === 'small') ? '30%' : '20%';
		const sumClass =
			(typeof this.props.data.packageDiscount === 'undefined' &&
			typeof this.props.data.promoDiscount === 'undefined')
				? 'right heavy' : 'right';

		console.log(this.props)

		return (
			<div className="page">
				<Header />
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
											<col width={firstColSize} />
											<col width="20%" />
											<col width={lastColSize} />
										</colgroup>
										<thead>
											<tr>
												<th>{ t('item') }</th>
												<th>{ t('weeks') }</th>
												<th>{ t('price') }</th>
											</tr>
										</thead>
										{(() => {
											if (this.props.data.skype) {
												return(
													<tr>
														<td>{this.props.data.skype.description}</td>
														<td className="center">{this.props.data.skype.week}</td>
														<td className="right">{Math.round(skypeCost * skypeDurationFactor)} KM</td>
													</tr>
												)
											}
										})()}
										{(() => {
											if (this.props.data.email) {
												return(
													<tr>
														<td>{this.props.data.email.description}</td>
														<td className="center">{this.props.data.email.week}</td>
														<td className="right">{this.props.emailDiscount} KM</td>
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
											if (this.props.data.packageDiscount) {
												return (
													<tr>
														<td className="right" colSpan="2">{ t('packageDiscount') }</td>
														<td className="right">{this.props.data.packageDiscount} KM</td>
													</tr>
												)
											}
										})()}
										{(() => {
											if (this.props.data.packageDiscount > 0) {
												const className = this.props.data.promoDiscount
													? 'right' : 'right heavy';

												return (
													<tr>
														<td className={className} colSpan="2">{ t('sumWithPackageDiscount')}</td>
														<td className={className}>
															{(Math.round(this.props.data.skype.cost * skypeDurationFactor) + (emailCost * nWeeks)) - this.props.data.packageDiscount} KM
														</td>
													</tr>
												)
											}
										})()}
										{(() => {
											if (this.props.data.promoDiscount) {
												return(
													<tr>
														<td className="right" colSpan="2">{ t('voucherDiscount') }</td>
														<td className="right">{this.props.data.promoDiscount} KM</td>
													</tr>
												)
											}
										})()}
										{(() => {
											if (this.props.data.promoDiscount) {
												return (
													<tr>
														<td className="right heavy" colSpan="2">{ t('total') }</td>
														<td className="right heavy">{ this.props.cost.total } KM</td>
													</tr>
												)
											}
										})()}
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
												value={this.state.name}/>
											{this.getValidationMessages('name')}
										</div>
										<div className="form-element-wrapper">
											<label htmlFor="phone">{ t('phone') }</label>
											<input
												onChange={ this.handleChange }
												id="phone"
												type="text"
												value={this.state.phone}/>
											{this.getValidationMessages('phone')}
										</div>
										<div className="form-element-wrapper">
											<label htmlFor="email">{ t('email') }</label>
											<input
												onChange={ this.handleChange }
												id="mail"
												type="text"
												value={this.state.mail}/>
											{this.getValidationMessages('mail')}
										</div>
										<div className="form-element-wrapper">
											<label htmlFor="skype">Skype ID</label>
											<input
												onChange={ this.handleChange }
												id="skypeId"
												type="text"
											/>
											{this.getValidationMessages('skype')}
										</div>
										<div className="form-element-wrapper">
											<label htmlFor="skype">{t('issue')}</label>
											<div className="select-style">
												<select id="issue" onChange={this.handleSelect} value={this.state.issue}>
													{this.renderIssues()}
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
												{this.state.comment}
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
					<div className="breakpoint-small" data-size="small"></div>
					<div className="breakpoint-medium" data-size="medium"></div>
					<div className="breakpoint-large" data-size="large"></div>
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
