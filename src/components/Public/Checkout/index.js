import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { routeActions } from 'redux-simple-router';
import { encounterValidator } from '../../../../validators/encounters';
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
			comment: '',
			code: '',
			data: '',
			isOpen: false
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
        let width = '';


        console.log('props', this.state, this.props);


        for (let item of breakpoints.children) {
        	const width = this.getWinWidth(item);

        	if (width) {
        		this.width = width;
			}
		}

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

    getWinWidth(el) {
		if (el.offsetParent !== null) {
			return el.dataset.size;
		} else {
			return '';
		}
	}

	componentWillReceiveProps (nextProps) {
		console.log('foooooo', nextProps)
		this.setState({
			isOpen: true,
			skype: nextProps.data.skype,
			email: nextProps.data.email,
			cost: nextProps.cost,
			packageDiscount: nextProps.data.packageDiscount,
			promoDiscount: nextProps.data.promoDiscount,
			data: nextProps.data
		});
	}

    getValidatorData() {
        return this.state
    }

	resetCheckout () {
		this.setState({
            name: '',
            mail: '',
            phone: '',
            comment: '',
			code: '',
			isOpen: false
		});

		this.props.dispatch(resetEncounter());
        this.props.dispatch(routeActions.push('/anka'));
	}

	handleChange (e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	handleSubmit () {
		this.props.validate((error) => {
            this.basket.style.height = this.front.offsetHeight  + 40 + 'px';
            if (!error) {
                this.basket.style.height = this.front.offsetHeight + 'px';
                this.props.dispatch(saveEncounter(this.state));
			}
        })
	}

	getValidationMessages (prop) {
		return (
            this.props.getValidationMessages(prop).map((message) => {
				return <span className="error">{message}</span>;
            })
		)
	}

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
													<td>{this.props.data.skype.week}</td>
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
													<td>{this.props.data.email.week}</td>
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
								<div ref={(front) => { this.front = front; }} className={front}>
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
										<label htmlFor="skype">Skype name</label>
										<input
											onChange={ this.handleChange }
											id="mail"
											type="text"
											value={this.state.mail}/>
										{this.getValidationMessages('mail')}
									</div>
									<div className="form-element-wrapper">
										<label htmlFor="skype">Issue</label>
										<div className="select-style">
											<select>
												<option value="volvo">Stres</option>
												<option value="saab">Diete</option>
												<option value="mercedes">Sukob</option>
												<option value="audi">Bol</option>
											</select>
										</div>
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
								</div>
								<div className={back}>
									<h1>{ t('heading') }</h1>
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
	emailDiscount: state.encounter.emailDiscount,
	promoDiscount: state.encounter.promoDiscount
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(i18nValidation()))(Checkout)));
