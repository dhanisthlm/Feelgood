import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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
		this.setState({
			isOpen: true,
			skype: this.props.data.skype,
			email: this.props.data.email,
			cost: this.props.cost,
			packageDiscount: this.props.data.packageDiscount,
			promoDiscount: this.props.data.promoDiscount
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
		const { t } = this.props;
        const front = (this.props.save === true) ? 'front none' : 'front';
        const back = (this.props.save === false) ? 'back none' : 'back';
        const skypeCost = this.state.skype ? this.state.skype.cost : 0;
        const skypeDurationFactor = this.props.data.skypeDuration.factor;
		const emailCost = this.state.email ? this.props.emailDiscount(this.state.email) / this.state.email.week : 0;
		const nWeeks = this.state.email ? this.state.email.week : 0;

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
                                        if (this.state.skype) {
                                            return(
                                            	<tr>
													<td>{this.state.skype.description}</td>
													<td>{this.state.skype.week}</td>
													<td className="right">{Math.round(skypeCost * skypeDurationFactor)} KM</td>
												</tr>
											)
                                        }
                                    })()}
                                    {(() => {
                                        if (this.state.email) {
                                            return(
												<tr>
													<td>{this.state.email.description}</td>
													<td>{this.state.email.week}</td>
													<td className="right">{this.props.emailDiscount(this.state.email)} KM</td>
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
                                        if (this.props.data.packageDiscount) {
                                            return (
												<tr>
													<td className="right" colSpan="2">Kombinacija popust</td>
													<td className="right">{this.state.packageDiscount} KM</td>
												</tr>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (this.props.data.packageDiscount > 0) {
                                        	const className = this.state.promoDiscount
												? 'right' : 'right heavy';

                                        	return (
												<tr>
													<td className={className} colSpan="2">Suma iza kominacijskog popusta</td>
													<td className={className}>{(Math.round(this.state.skype.cost * skypeDurationFactor) + (emailCost * nWeeks)) - this.state.packageDiscount} KM
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
													<td className="right">{this.state.promoDiscount} KM</td>
												</tr>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if (this.state.promoDiscount) {
                                            return (
												<tr>
													<td className="right heavy" colSpan="2">Ukupno</td>
													<td className="right heavy">{ this.state.cost.total } KM</td>
												</tr>
                                            )
                                        }
                                    })()}
								</table>
								<div ref={(front) => { this.front = front; }} className={front}>
									<h1>{ t('heading') }</h1>
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

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy(options))(Checkout)));
