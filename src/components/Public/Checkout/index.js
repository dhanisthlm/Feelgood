import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { encounterValidator } from '../../../../validators/encounters';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import styles from './styles.css';

const options = {
    language: {
        any: {
            empty: '!!Tekstno polje ne sme biti prazno',
        },
        string: {
            regex: {
                base: '!!Netačan format telefona',
                phone: '!!Netačan format telefona',
            },
            email: '!!Netačan format e-pošte',
        },
    }
};

export class Checkout extends FormComponent {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			phone: '',
			comment: '',
			code: '',
			isOpen: false
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
		this.setState({ isOpen: true, data: this.props.data, cost: this.props.cost });
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

		this.props.resetCheckout();
		this.props.dispatch(resetEncounter());
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
        const front = (this.props.save === true) ? 'front none' : 'front';
        const back = (this.props.save === false) ? 'back none' : 'back';

        const skypeCost = this.props.data.skype ? this.props.data.skype.cost : 0;
        const skypeDurationFactor = this.props.data.skypeDuration.factor;
		const emailCost = this.props.data.email ? this.props.calculateEmailDiscount(this.props.data.email.cost, this.props.data.email.week) / this.props.data.email.week : 0;
		const nWeeks = this.props.data.email ? this.props.data.email.week : 0;
		const combinationDiscount = this.props.data.combinationDiscount ? this.props.data.combinationDiscount : 0;

		if (this.state.isOpen === true) {
            return (
				<div ref={(checkout) => { this.checkout = checkout; }} className="checkout">
					<div ref={(basket) => { this.basket = basket; }} className="basket">
						<div className="header" />
						<div className="outer-frame">
							<div className="inner-frame">
								<svg onClick={ this.resetCheckout } viewBox="0 0 94.926 94.926">
									<path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0   c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096   c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476   c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62   s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z" fill="#c04c9c"/>
								</svg>
								<table>
									<colgroup>
										<col width="60%" />
										<col width="20%" />
										<col width="20%" />
									</colgroup>
									<thead>
										<tr>
											<th>Stavka</th>
											<th>Sedmica</th>
											<th>Cijena</th>
										</tr>
									</thead>
                                    {(() => {
                                        if (this.props.data.skype) {
                                            return(
                                            	<tr>
													<td>{this.props.data.skype.description}</td>
													<td>{this.props.data.skype.week}</td>
													<td className="right">{Math.round(this.props.data.skype.cost * skypeDurationFactor)} KM</td>
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
													<td className="right">{this.props.calculateEmailDiscount(this.props.data.email.cost, this.props.data.email.week)} KM</td>
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
										<td className="right" colSpan="2">Suma</td>
										<td className="right">{Math.round(skypeCost * skypeDurationFactor) + (emailCost * nWeeks)} KM</td>
									</tr>
                                    {(() => {
                                        if (this.props.data.combinationDiscount) {
                                            return (
												<tr>
													<td className="right" colSpan="2">kombinacija popust</td>
													<td className="right">{combinationDiscount} KM</td>
												</tr>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (this.props.data.combinationDiscount > 0) {
                                            return (
												<tr>
													<td className="right" colSpan="2">Suma iza kominacijskog popusta</td>
													<td className="right">{(Math.round(skypeCost * skypeDurationFactor) + (emailCost * nWeeks)) - this.props.data.combinationDiscount} KM
													</td>
												</tr>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (this.props.data.promoDiscount) {
                                            return(
												<tr>
													<td className="right" colSpan="2">Voucher popust</td>
													<td className="right">{this.props.data.promoDiscount} KM</td>
												</tr>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (this.props.data.promoDiscount) {
                                            return (
												<tr>
													<td className="right" colSpan="2">Ukupno</td>
													<td className="right">{this.props.cost.total()} KM</td>
												</tr>
                                            )
                                        }
                                    })()}
								</table>
								<div ref={(front) => { this.front = front; }} className={front}>
									<h1>Potvrda narudžbe</h1>
									<div className="form-element-wrapper">
										<label htmlFor="name">Ime</label>
										<input
											onChange={ this.handleChange }
											id="name"
											type="text"
											value={this.state.name}/>
										{this.getValidationMessages('name')}
									</div>
									<div className="form-element-wrapper">
										<label htmlFor="phone">Telefon</label>
										<input
											onChange={ this.handleChange }
											id="phone"
											type="text"
											value={this.state.phone}/>
										{this.getValidationMessages('phone')}
									</div>
									<div className="form-element-wrapper">
										<label htmlFor="email">E-pošta</label>
										<input
											onChange={ this.handleChange }
											id="mail"
											type="text"
											value={this.state.mail}/>
										{this.getValidationMessages('mail')}
									</div>
									<div className="form-element-wrapper">
										<label htmlFor="comment">Kommentar</label>
										<textarea
											className={ this.getValidatorData('comment') }
											onChange={ this.handleChange }>
											{this.state.comment}
										</textarea>
										{this.getValidationMessages('comment')}
									</div>
									<div className="form-buttons">
										<button onClick={ this.resetCheckout }>Natrag</button>
										<button onClick={ this.handleSubmit }>Zakažite</button>
									</div>
								</div>
								<div className={back}>
									<h1>Potvrda narudžbe</h1>
									<p>Molimo uplatite xxx na bankovni računu:</p>
									<p>YYY YYY YYY YYY</p>
									<p>Napišite vaše ime, telefon broj / e-poštu i šifru ispod na uplatnicu:</p>
									<p >{this.props.cost.code}</p>
									<p>Mi će mo vas zovnuti da rezerviramo termin za razgovor sa našim psiholozima kada smo primili novac.</p>
									<p>Dobićete fakturu na vašu e-poštu u roku od 24 sata sa detaljima plaćanja.</p>
									<p>Mnogo hvala, tim zdravilje</p>
									<button onClick={ this.resetCheckout }>Blizu</button>
								</div>
							</div>
						</div>
					</div>
				</div>
            );
        } else {
			return null;
		}
	}
}

Checkout.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
	save: state.encounter.saved
});

export default connect(mapStateToProps)(validation(strategy(options))(Checkout));
