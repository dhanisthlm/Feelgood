import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Checkout from '../Checkout';
import styles from './styles.css';

export class Payment extends Component {
	constructor (props) {
		super(props);

		this.initialState = {
			checkout: false,
			promoCode: 'zdravlje.nu',
			promoDiscount: 0.5,
			enteredCode: '',
			code: '',
			skype: {
				s: { active: false, cost: 60, week: 1, code: '1' },
				m: { active: false, cost: 174, week: 3, code: '3' },
				l: { active: false, cost: 448, week: 8, code: '8' }
			},
			email: {
				s: { active: false, cost: 30, week: 1, code: '04' },
				m: { active: false, cost: 80, week: 1, code: '24' }
			},
			skypeDuration: {
				s: { length: 20, active: true, factor: 0.675, code: '20' },
				l: { length: 45, active: false, factor: 1, code: '45' }
			},
			lastSize: { skype: 's', email: '' }
		};

		this.state = {...this.initialState};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleWeeks = this.handleWeeks.bind(this);
		this.handleSkypeDuration = this.handleSkypeDuration.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.resetCheckout = this.resetCheckout.bind(this);
		this.getData = this.getData.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	handleCheckbox (e) {
		const type = e.target.id.split('-')[0];
		const size = e.target.id.split('-')[1];
		const skype = this.state.skype;
        const email = this.state.email;

		if (type === 'skype') {
			if ( size !== this.state.lastSize.skype) {
				skype.s.active = false;
				skype.m.active = false;
				skype.l.active = false;
				this.setState({ skype }, () => this.setCategorySize(size, type));
			} else {
				this.setCategorySize(size, type);
			}
		} else if (type === 'email') {
			if ( size !== this.state.lastSize.email) {
				email.s.active = false;
				email.m.active = false;
                this.setState({ email }, () => this.setCategorySize(size, type));
			} else {
				this.setCategorySize(size, type);
			}
		}
	}

	handleKeyUp (e) {
		this.setState({ enteredCode: e.target.value });
	}

	calculateEmailDiscount (cost, weeks) {
		let factor;

		switch (true) {
			case (weeks === 2):
				factor = .95;
				break;
			case (weeks === 3):
				factor = .925;
				break;
			case (weeks === 4):
				factor = .9;
				break;
			case (weeks > 4):
				factor = .875;
				break;
			default:
				factor = 1;
		}

		return Math.round(cost * factor) * weeks;
	}

	resetCheckout () {
		const body = document.getElementsByTagName('body')[0];
		body.style.overflow = 'scroll';
        //this.setState({...this.initialState});
	}

	handleCheckout () {
		const body = document.getElementsByTagName('body')[0];
		body.style.overflow = (!this.state.checkout) ? 'hidden' : 'scroll';
        this.setState({ checkout: !this.state.checkout });
    }

    getData () {
		const data = {};

		Object.keys(this.state).filter((item) => {
			return Object.keys(this.state[item]).filter((subItem) => {
				if (item === 'skype' || item === 'email' || item === 'skypeDuration') {
                    if (this.state[item][subItem].hasOwnProperty('active') && this.state[item][subItem].active === true) {
                        data[item] = this.state[item][subItem];
                    }
                }
			})
		});

		//console.log('data', data);
		return data;
	}

	calculateCost () {
		let skypeDuration = this.state.skypeDuration.s.active ? 's' : 'l';
        let email = 0;
        let emailWeeks = 1;
		let skypeWeeks = 1;
		let skypeCode = '0';
		let skypeDurationCode = '00';
		let emailCode = '00';
        let skype = 0;

        for (let size in this.state.skype) {
			if (this.state.skype.hasOwnProperty(size)) {
                if (this.state.skype[size].active === true) {
                    skype = this.state.skype[size].cost * this.state.skypeDuration[skypeDuration].factor;
                    skypeWeeks = this.state.skype[size].week;
                    skypeCode = this.state.skype[size].code;
                    skypeDurationCode = this.state.skypeDuration[skypeDuration].code;
                }
            }
		}

		for (let size in this.state.email) {
            if (this.state.email.hasOwnProperty(size)) {
				if (this.state.email[size].active === true) {
                    email = this.calculateEmailDiscount(this.state.email[size].cost, this.state.email[size].week);
                    emailWeeks = this.state.email[size].week;
                    emailCode = this.state.email[size].code;
                }
			}
		}

		if (this.refs['duration-text'] && this.refs['duration-radios']) {
			if (skype === 0) {
				this.refs['duration-text'].style.display = 'block';
				this.refs['duration-radios'].style.display = 'none';
			} else {
				this.refs['duration-text'].style.display = 'none';
				this.refs['duration-radios'].style.display = 'block';
			}
		}

		if (this.state.enteredCode.toLowerCase() === this.state.promoCode) {
        	skype = skype * this.state.promoDiscount;
        	email = email * this.state.promoDiscount;
		}

		return {
			total: function () { return (this.email * emailWeeks) + (this.skype * skypeWeeks )},
			email: (skype > 0 && email > 0) ? Math.round((email / emailWeeks) * 0.95) : Math.round(email / emailWeeks),
			skype: (skype > 0 && email > 0) ? Math.round((skype / skypeWeeks) * 0.95) : Math.round(skype / skypeWeeks),
			code: skypeCode + '' + skypeDurationCode + '' + emailCode
		}
	}

	handleWeeks (e) {
		const type = e.target.id.split('-')[0];
		const size = e.target.id.split('-')[1];
        const email = this.state.email;

        if (type === 'add') {
			let nWeeks = this.state.email[size].week +1;
			email.s.week = size === 's' ? nWeeks : this.state.email.s.week;
            email.m.week = size === 'm' ? nWeeks : this.state.email.m.week;
		} else if (this.state.email[size].week > 1) {
			let nWeeks = this.state.email[size].week - 1;
			email.s.week = size === 's' ? nWeeks : this.state.email.s.week;
			email.m.week = size === 'm' ? nWeeks : this.state.email.m.week;
		}

        this.setState({ email });
	}

	setCategorySize (size, type) {
		let category = this.state[type];
        let lastSize = this.state.lastSize;

        category[size].active = !category[size].active;
		lastSize[type] = size;
		this.setState({ category, lastSize });
	}

	handleSkypeDuration (e) {
		const size = e.currentTarget.id.split('-')[1];
		const skypeDuration = this.state.skypeDuration;
		skypeDuration.s.active = size === 's';
		skypeDuration.l.active = size === 'l';
		this.setState({ skypeDuration });
	}

	render () {
		const order = this.calculateCost();
		const buttonStyle = (order.total() === 0) ? 'checkout-button disabled' : 'checkout-button';

		return (
			<div>
				{(() => {
					if (this.state.checkout === true) {
						return <Checkout data={this.getData()} cost={this.calculateCost()} resetCheckout={ this.resetCheckout } />
					}
				})()}
				<div className="payment">
					<h3 className="heading">Koliko kosta psihološko savjetovanje?</h3>
					<p className="preamble">
						Ovdje možete naručiti psihološko savjetovanje. Cijenu za vase izbore mozete naci u doljnem dio stranice. Izaberite Skype-poziv, e-postu ili kombinaciju Skype-poziv i e-postu. Što više poziva ili sedmica e-poste odlučite da kupite, sto jeftinija je cena po pozivu i po sedmicu e-poste.
					</p>
					<div className="payment-type-wrapper">
						<div className="container skype">
							<h4 className="category-heading">Skype</h4>
							<div className="wrapper">
								<input
									id="skype-s"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.s.active }
									onClick={ this.handleCheckbox }
								/>
								<label htmlFor="skype-s">1 Skype poziv</label>
							</div>
							<div className="wrapper">
								<input
									id="skype-m"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.m.active }
									onClick={ this.handleCheckbox }
								/>
								<label htmlFor="skype-m">Paket za 3 skype poziva</label>
							</div>
							<div className="wrapper">
								<input
									id="skype-l"
									type="checkbox"
									name="skype"
									checked={ this.state.skype.l.active }
									onClick={ this.handleCheckbox }
								/>
								<label htmlFor="skype-l">Paket za 8 skype poziva</label>
							</div>
							<div ref="duration-radios" className="toggle_radios">
								<input type="radio" checked={ this.state.skypeDuration.s.active } className="toggle_option" id="duration-s" name="toggle_option" />
								<input type="radio" checked={ this.state.skypeDuration.l.active } className="toggle_option" id="duration-l" name="toggle_option" />
								<label id="duration-s" onClick={ this.handleSkypeDuration } className="small-skype" htmlFor="duration-s"><p>20 min poziv</p></label>
								<label id="duration-l" onClick={ this.handleSkypeDuration } className="large-skype" htmlFor="duration-l"><p>45 min poziv</p></label>
								<div className="toggle_option_slider"></div>
							</div>
							<p ref="duration-text" className="duration-text">
								Izaberite jedan Skype-poziv ili paket sa više Skype-poziva. Možete kombinovati sa e-poštom.
							</p>
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
									onClick={ this.handleCheckbox }
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
									onClick={ this.handleCheckbox }
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
					<h2 className="total">Cijena: { this.calculateCost().total() } KM</h2>
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
							onChange={ this.handleKeyUp }
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

export default connect(mapStateToProps)(Payment)
