import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Checkout from '../Checkout';
import styles from './styles.css';

export class Payment extends Component {
	constructor (props) {
		super(props);

		this.state = {
			checkout: false,
			skype: {
				s: {
					active: true,
					cost: 45,
					week: 1
				},
				m: {
					active: false,
					cost: 126,
					week: 3
				},
				l: {
					active: false,
					cost: 320,
					week: 8
				}
			},
			email: {
				s: {
					active: false,
					cost: 30,
					week: 1
				},
				m: {
					active: false,
					cost: 80,
					week: 1
				}
			},
			skypeDuration: {
				s: {
					length: 20,
					active: true,
					factor: 0.675
				},
				l: {
					length: 45,
					active: false,
					factor: 1
				}
			},
			lastSize: {
				skype: 's',
				email: ''
			}
		};

		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.handleWeeks = this.handleWeeks.bind(this);
		this.handleSkypeDuration = this.handleSkypeDuration.bind(this);
		this.handleCheckout = this.handleCheckout.bind(this);
		this.resetCheckout = this.resetCheckout.bind(this);
	}

	handleCheckbox (e) {
		const type = e.target.id.split('-')[0];
		const size = e.target.id.split('-')[1];

		if (type === 'skype') {
			if ( size !== this.state.lastSize.skype) {
				this.setState({
					skype: {
						s: { active: false, cost: this.state.skype.s.cost, week: this.state.skype.s.week },
						m: { active: false, cost: this.state.skype.m.cost, week: this.state.skype.m.week },
						l: { active: false, cost: this.state.skype.l.cost, week: this.state.skype.l.week }
					}
				}, () => {
					this.setCategorySize(size, type);
				})
			} else {
				this.setCategorySize(size, type);
			}
		} else if (type === 'email') {
			if ( size !== this.state.lastSize.email) {
				this.setState({
					email: {
						s: { active: false, cost: this.state.email.s.cost, week: this.state.email.s.week },
						m: { active: false, cost: this.state.email.m.cost, week: this.state.email.m.week }
					}
				}, () => {
					this.setCategorySize(size, type);
				})
			} else {
				this.setCategorySize(size, type);
			}
		}
	}

	calculateEmailDiscount (cost, weeks) {
		var factor = 1;

		if (weeks === 2) {
			factor = .95;
		} else if (weeks === 3) {
			factor = .925;
		} else if (weeks === 4) {
			factor = .9;
		} else if (weeks > 4) {
			factor = .875;
		}

		return Math.round(cost * factor) * weeks;
	}

	resetCheckout () {
		const body = document.getElementsByTagName('body')[0];
		body.style.overflow = 'scroll';
		this.setState({ checkout: false });
	}

	handleCheckout () {
		const body = document.getElementsByTagName('body')[0];
		if (!this.state.checkout) {
			this.setState({checkout: true});
			body.style.overflow = 'hidden';
		} else {
			body.style.overflow = 'scroll';
		}
	}

	calculateCost () {
		let skype = 0;
		let email = 0;
		let skypeDuration = this.state.skypeDuration.s.active ? 's' : 'l';
		let emailWeeks = 1;
		let skypeWeeks = 1;

		for (let nSkype in this.state.skype) {
			if (this.state.skype[nSkype].active === true) {
				skype = this.state.skype[nSkype].cost * this.state.skypeDuration[skypeDuration].factor;
				skypeWeeks = this.state.skype[nSkype].week;
			}
		}

		for (let nEmail in this.state.email) {
			if (this.state.email[nEmail].active === true) {
				email = this.calculateEmailDiscount(this.state.email[nEmail].cost, this.state.email[nEmail].week);
				emailWeeks = this.state.email[nEmail].week;
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

		return {
			total: function () { return (this.email * emailWeeks) + (this.skype * skypeWeeks )},
			email: (skype > 0 && email > 0) ? Math.round((email / emailWeeks) * 0.95) : Math.round(email / emailWeeks),
			skype: (skype > 0 && email > 0) ? Math.round((skype / skypeWeeks) * 0.95) : Math.round(skype / skypeWeeks)
		}
	}

	handleWeeks (e) {
		const type = e.target.id.split('-')[0];
		const size = e.target.id.split('-')[1];

		if (type === 'add') {
			let nWeeks = this.state.email[size].week +1;

			this.setState({
				email: {
					s: { active: this.state.email.s.active, cost: this.state.email.s.cost, week: size === 's' ? nWeeks : this.state.email.s.week },
					m: { active: this.state.email.m.active, cost: this.state.email.m.cost, week: size === 'm' ? nWeeks : this.state.email.m.week }
				}
			});
		} else {
			if (this.state.email[size].week > 1) {
				let nWeeks = this.state.email[size].week - 1;

				this.setState({
					email: {
						s: { active: this.state.email.s.active, cost: this.state.email.s.cost, week: size === 's' ? nWeeks : this.state.email.s.week },
						m: { active: this.state.email.m.active, cost: this.state.email.m.cost, week: size === 'm' ? nWeeks : this.state.email.m.week }
					}
				});
			}
		}
	}

	setCategorySize (size, type) {
		let category = this.state[type];
		category[size].active = !category[size].active;
		let lastSize = this.state.lastSize;
		lastSize[type] = size;
		this.setState({ category, lastSize });
	}

	handleSkypeDuration (e) {
		const size = e.currentTarget.id.split('-')[1];
		this.setState({
			skypeDuration: {
				s: {
					active: size === 's',
					length: this.state.skypeDuration.s.length,
					factor: this.state.skypeDuration.s.factor
				},
				l: {
					active: size === 'l',
					length: this.state.skypeDuration.l.length,
					factor: this.state.skypeDuration.l.factor
				}
			}
		})
	}

	render () {
		return (
			<dic>
				{(() => {
					if (this.state.checkout === true) {
						return <Checkout resetCheckout={ this.resetCheckout } />
					}
				})()}
				<div className="payment">
					<h3>Koliko kosta terapija?</h3>
					<p className="intro">
						Ovde smo za vas, ako trebate sa kom razgovarati. Se Zdravlje.nu, svako moze dobiti terapiju
						diskretno i po razumnoj cijeni. U terapiji prepoznajemo/identifikujemo koje misli i emocije.
					</p>
					<div className="payment-wrapper">
						<div className="container skype">
							<h4 className="heading">Skype</h4>
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
								<input type="radio" checked={this.state.skypeDuration.s.active} className="toggle_option" id="duration-s" name="toggle_option" />
								<input type="radio" checked={this.state.skypeDuration.l.active} className="toggle_option" id="duration-l" name="toggle_option" />
								<label id="duration-s" onClick={this.handleSkypeDuration} className="small-skype" htmlFor="duration-s"><p>20 min poziv</p></label>
								<label id="duration-l" onClick={this.handleSkypeDuration} className="large-skype" htmlFor="duration-l"><p>45 min poziv</p></label>
								<div className="toggle_option_slider"></div>
							</div>
							<p ref="duration-text" className="duration-text">
								Izaberite opciju videopoziva za vašu terapiju.  Cijena odabrane terapije je prikazana u doljnem polju.</p>
						</div>
						<div className="email">
							<h4 className="heading">E-pošta</h4>
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
									Det här är en text som ska fyll upp utrymme så att layouten ska se bättre ut, vi får komma på vad det ska stå här.
								</p>
								<div className="week-wrapper">
									<div className="wrapper">
										<div className="week-title">
											<span>Broj</span>
											<span>sedmica</span>
										</div>
										<div id="sub-s" onClick={this.handleWeeks} className="border-left" />
										<div className="n-weeks">
											<span>{this.state.email.s.week}</span>
										</div>
										<div id="add-s" onClick={this.handleWeeks} className="border-right" />
									</div>
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
									Det här är en text som ska fyll upp utrymme så att layouten ska se bättre ut, vi får komma på vad det ska stå här.
								</p>
								<div className="week-wrapper">
									<div className="wrapper">
										<div className="week-title">
											<span>Broj</span>
											<span>sedmica</span>
										</div>
										<div id="sub-m" onClick={this.handleWeeks} className="border-left" />
										<div className="n-weeks">
											<span>{this.state.email.m.week}</span>
										</div>
										<div id="add-m" onClick={this.handleWeeks} className="border-right" />
									</div>
								</div>
							</div>
						</div>
						<div className="right">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita officia quasi. Alias aliquam architecto corporis culpa cupiditate doloremque eaque facere fugit harum illo ipsam, iste labore minima necessitatibus odio quidem quisquam sed sit, totam ut.</p><p>Animi autem corporis cum dignissimos impedit magnam maiores, minus nemo omnis possimus, sed vel!</p>
						</div>
					</div>
				</div>
				<div className="payment-text">
					<h2 className="payment-sum-header">Cijena: { this.calculateCost().total() } KM</h2>
					<div className="payment-spec">
						<span>Skype: { this.calculateCost().skype } KM / posiv</span>
						<span>E-pošta: { this.calculateCost().email } KM / sedmica</span>
					</div>
					<button onClick={ this.handleCheckout }>Zakazite</button>
				</div>
			</dic>
		);
	}
}

Payment.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Payment)
