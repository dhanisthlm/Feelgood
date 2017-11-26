import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { routeActions } from 'react-simple-router';
import Checkout from '../Checkout';
import styles from './styles.css';

export class Payment extends Component {
	constructor (props) {
		super(props);

		this.state = {};

		this.handlePackage = this.handlePackage.bind(this);
		this.handleWeeks = this.handleWeeks.bind(this);
		this.handleSkypeDuration = this.handleSkypeDuration.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.resetCheckout = this.resetCheckout.bind(this);
		this.getData = this.getData.bind(this);
		this.handlePromoCode = this.handlePromoCode.bind(this);
	}

	componentWillMount () {
		this.setState(this.createInitialState());
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
    handlePromoCode (e) {
        this.setState({ enteredCode: e.target.value });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
    resetCheckout () {
        this.setState(this.createInitialState());
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
    handleCheckout () {
        this.setState({ checkout: !this.state.checkout });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
	 * @return {void}
     */
	createInitialState () {
		return {
            checkout: false,
            combinationDiscount: 0,
            promoDiscount: 0,
            promoCode: 'zdravlje.nu',
            promoDiscountFactor: 0.5,
            enteredCode: '',
			durationText: true,
            code: '',
            skype: {
                s: { active: false, cost: 60, week: 1, code: '1', description: '1 Skype poziva' },
                m: { active: false, cost: 174, week: 3, code: '3', description: 'Paket za 3 skype poziva' },
                l: { active: false, cost: 448, week: 8, code: '8', description: 'Paket za 8 Skype poziva' }
            },
            email: {
                s: { active: false, cost: 40, week: 1, code: '24', description: 'E-posta, odgovor u toku 24 sata'},
                m: { active: false, cost: 110, week: 1, code: '04', description: 'E-posta, odgovor u toku 4 sata'}
            },
            skypeDuration: {
                s: { length: 20, active: true, factor: 0.666666, code: '20' },
                l: { length: 45, active: false, factor: 1, code: '45' }
            },
            lastSize: { skype: 's', email: '' }
        };
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
    resetPackage (type, lastSize) {
    	const resetObj = this.state[type];

        if (lastSize[type].length) {
            resetObj[lastSize[type]] = this.createInitialState()[type][lastSize[type]];
        }

        this.setState({ resetObj })
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
    handlePackage (e) {
        const type = e.target.id.split('-')[0];
        const size = e.target.id.split('-')[1];
        const lastSize = this.state.lastSize;

		if ( size !== lastSize[type]  || e.currentTarget.checked) {
			this.resetPackage(type, lastSize);
		}

        this.setCategorySize(size, type);
        this.calculateCost();

        const showDurationText = (this.skypePackage)
			? this.skypePackage.cost === 0 : true;

        this.setState({ durationText: showDurationText });
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {number}
     */
	calculateEmailDiscount (_package) {
		let factor;

		switch (true) {
			case (_package.week === 2):
				factor = .95;
				break;
			case (_package.week === 3):
				factor = .925;
				break;
			case (_package.week === 4):
				factor = .9;
				break;
			case (_package.week > 4):
				factor = .875;
				break;
			default:
				factor = 1;
		}

		return Math.round(_package.cost * factor) * _package.week;
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object} data
     */
    getData () {
		const active = {};
		const keys= [
			'skype',
			'email',
			'skypeDuration'
		];

		Object.keys(this.state).filter((key) => {
			return Object.keys(this.state[key]).filter((subKey) => {
				if (keys.includes(key)) {
                    if (this.state[key][subKey].active === true) {
						active[key] = this.state[key][subKey];
                    }
                }
			})
		});

		active.packageDiscount = this.packageDiscount;
		active.promoDiscount = this.promoDiscount;

		return active;
	}

	calculateDiscounts (skypeCost, emailCost) {
    	let packageFactor = 1;
    	let promoFactor = 1;
    	let skypeDiscount = 0;
    	let emailDiscount = 0;

        if (skypeCost > 0 && emailCost > 0) {
            packageFactor = 0.95;
            this.packageDiscount = Math.round(
				emailCost - Math.round(emailCost * 0.95) +
				skypeCost - Math.round(skypeCost * 0.95)
			);
        } else {
            delete this.packageDiscount;
        }

        if (this.state.enteredCode.toLowerCase() === this.state.promoCode) {
            skypeDiscount = skypeCost * this.state.promoDiscountFactor;
            emailDiscount = emailCost * this.state.promoDiscountFactor;
            promoFactor = 0.5;

            this.promoDiscount = (skypeCost > 0 && emailCost > 0)
                ? Math.round((emailDiscount + skypeDiscount) * 0.95)
                : Math.round(emailDiscount + skypeDiscount);
        } else {
            promoFactor = 1;
            delete this.promoDiscount;
        }

        return { promoFactor, packageFactor }
    }

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {object} cost
     */
	calculateCost () {
        const email = this.state.email;
        const skype = this.state.skype;
        const skypeDuration = this.state.skypeDuration.s.active ? 's' : 'l';

        let emailCost = 0;
        let emailWeeks = 1;
        let emailCode = '00';

        let skypeCost = 0;
        let skypeWeeks = 1;
        let skypeCode = '0';
        let skypeDurationCode = '00';

        const amount = {};

        this.skypePackage = skype[Object.keys(skype)
			.filter(key => skype[key].active)[0]];

        this.emailPackage = email[Object.keys(email)
			.filter(key => email[key].active)[0]];

        if (this.skypePackage) {
            skypeWeeks = this.skypePackage.week;
            skypeCode = this.skypePackage.code;
            skypeCost = this.skypePackage.cost * this.state.skypeDuration[skypeDuration].factor;
            skypeDurationCode = this.state.skypeDuration[skypeDuration].code;
        }

        if (this.emailPackage) {
            emailWeeks = this.emailPackage.week;
            emailCode = this.emailPackage.code;
            emailCost = this.calculateEmailDiscount(this.emailPackage);
		}

        const discount = this.calculateDiscounts(skypeCost, emailCost);

        amount.skype = Math.round(skypeCost / skypeWeeks);
        amount.email = Math.round(emailCost / emailWeeks);
        amount.code = skypeCode + '' + skypeDurationCode + '' + emailCode;
        amount.total = Math.round((emailCost + skypeCost) * discount.promoFactor * discount.packageFactor);

        return amount;
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
	handleWeeks (e) {
		const type = e.target.id.split('-')[0];
		const size = e.target.id.split('-')[1];
        const email = this.state.email;
        const factor = (type === 'add') ? 1 : -1;

        if (email[size].week === 1 && type !== 'add') return;

		email[size].week = email[size].week + factor;
        this.setState({ email });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
	setCategorySize (size, type) {
		let category = this.state[type];
        let lastSize = this.state.lastSize;

        category[size].active = !category[size].active;
		lastSize[type] = size;

		this.setState({ category, lastSize });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {void}
     */
	handleSkypeDuration (e) {
		const size = e.currentTarget.id.split('-')[1];
		const skypeDuration = this.state.skypeDuration;

		skypeDuration.s.active = size === 's';
		skypeDuration.l.active = size === 'l';

		this.setState({ skypeDuration });
	}

    /**
     * This callback type is called `requestCallback
     * @callback requestCallback
     * @param {number} responseCode
     * @return {node}
     */
	render () {
		const { t } = this.props;
		const order = this.calculateCost();
		const buttonStyle = (order.total === 0) ? 'checkout-button disabled' : 'checkout-button';

		return (
			<div>
				{(() => {
					if (this.state.checkout === true) {
						return(
							<Checkout data={this.getData()}
								  cost={this.calculateCost()}
								  calculateEmailDiscount={this.calculateEmailDiscount}
								  resetCheckout={ this.resetCheckout }
							/>
						)
					}
				})()}
				<div id="cijene" className="payment">
					<h3 className="heading">{ t('heading') }</h3>
					<p className="preamble">{ t('intro') }</p>
					<div className="payment-type-wrapper">
						<div className="container skype">
							<h4 className="category-heading">Skype</h4>
							<div className="wrapper">
								<input
									id="skype-s"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.s.active }
									onClick={ this.handlePackage }
								/>
								<label htmlFor="skype-s">1 Skype poziv</label>
							</div>
							<div className="wrapper">
								<input
									id="skype-m"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.m.active }
									onClick={ this.handlePackage }
								/>
								<label htmlFor="skype-m">Paket za 3 skype poziva</label>
							</div>
							<div className="wrapper">
								<input
									id="skype-l"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.l.active }
									onClick={ this.handlePackage }
								/>
								<label htmlFor="skype-l">Paket za 8 skype poziva</label>
							</div>
                            {(() => {
                                if (this.state.durationText === true) {
                                    return(
										<p ref="duration-text" className="duration-text">
											Izaberite jedan Skype-poziv ili paket sa više Skype-poziva. Možete kombinovati sa e-poštom.
										</p>
                                    )
                                } else {
                                    return(
										<div ref="duration-radios" className="toggle_radios">
											<input type="radio" checked={ this.state.skypeDuration.s.active } className="toggle_option" id="duration-s" name="toggle_option" />
											<input type="radio" checked={ this.state.skypeDuration.l.active } className="toggle_option" id="duration-l" name="toggle_option" />
											<label id="duration-s" onClick={ this.handleSkypeDuration } className="small-skype" htmlFor="duration-s"><p>20 min poziv</p></label>
											<label id="duration-l" onClick={ this.handleSkypeDuration } className="large-skype" htmlFor="duration-l"><p>45 min poziv</p></label>
											<div className="toggle_option_slider"></div>
										</div>
									);
								}
                            })()}

						</div>
						<div className="email">
							<h4 className="category-heading">E-pošta</h4>
							<div className="wrapper">
								<input
									id="email-s"
									className="email-s"
									type="checkbox"
									name="skype"
									checked={ this.state.email.s.active }
									onClick={ this.handlePackage }
								/>
								<label className="email-s-label" htmlFor="email-s">Odgovar u toku 24h</label>
								<p className="week-text week-text-s">
									Neograničen broj e-pošte, odgovor u toku 24h. Možete kombinovati sa Skype-pozivom.
								</p>
								<div className="weeks">
									<div className="week-title">
										<span>Broj</span>
										<span>sedmica</span>
									</div>
									<div id="sub-s" onClick={ this.handleWeeks } className="arrow-left" />
									<div className="n-weeks">
										<span>{this.state.email.s.week}</span>
									</div>
									<div id="add-s" onClick={ this.handleWeeks } className="arrow-right" />
								</div>
							</div>
							<div className="wrapper">
								<input
									id="email-m"
									className="email-m"
									type="checkbox"
									name="skype"
									checked={ this.state.email.m.active }
									onClick={ this.handlePackage }
								/>
								<label className="email-m-label" htmlFor="email-m">Odgovar u toku 4h</label>
								<p className="week-text week-text-m">
									Neograničen broj e-pošte, odgovor u toku 4h radnim danima 07.00-22.00, vikend i praznik 09.00-18.00.
								</p>
								<div className="weeks">
									<div className="week-title">
										<span>Broj</span>
										<span>sedmica</span>
									</div>
									<div id="sub-m" onClick={this.handleWeeks} className="arrow-left" />
									<div className="n-weeks">
										<span>{this.state.email.m.week}</span>
									</div>
									<div id="add-m" onClick={this.handleWeeks} className="arrow-right" />
								</div>
							</div>
						</div>
						<div className="info-text">
							<div className="promo">
								<div className="promo-text">
									<span className="percent-text">50% popust</span>
									<span className="launch">za slavlje lansiranja</span>
									<span className="web-adress">Zdravlje.nu</span>
									<span className="launch-date">Otvaram 16og dec!</span>
									<span className="kod-text">Konristite kod </span>
									<span className="kod-text2">Zdravlje.nu</span>
									<span className="year-1">Vazi do kraja 2017 god</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-wrapper">
					<h2 className="total">Cijena: { this.calculateCost().total } KM</h2>
					<div className="spec">
						<span>Skype: { this.calculateCost().skype } KM / posiv</span>
						<span>E-pošta: { this.calculateCost().email } KM / sedmica</span>
					</div>
					<button
						className={buttonStyle}
						onClick={ this.handleCheckout }>
						Zakažite
					</button>
					<div className="promo-textfield">
						<input type="text"
							onChange={ this.handlePromoCode }
							placeholder="Unesite kod"
							value={this.state.enteredCode}
						/>
					</div>
				</div>
			</div>
		);
	}
}

Payment.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({ });

export default connect(mapStateToProps)(translate('paymentView')(Payment));
