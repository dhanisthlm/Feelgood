import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import FormComponent from '../../FormComponent';
import { encounterValidator } from '../../../../validators/encounters';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import styles from './styles.css';

export class Checkout extends FormComponent {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			phone: '',
			comment: '',
			isOpen: false
		};

		this.validatorTypes = encounterValidator;
		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
		this.setState({ isOpen: true });
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
            this.basket.style.height = this.front.offsetHeight + 'px';
            if (!error) {
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
										<button onClick={ this.resetCheckout }>Otkazati</button>
										<button onClick={ this.handleSubmit }>Zakažite</button>
									</div>
								</div>
								<div className={back}>
									<h1>Potvrda narudžbe</h1>
									<p>Molimo uplatite xxx na bankovni računu:</p>
									<p className="big">YYY YYY YYY YYY</p>
									<p>Napišite vaše ime, telefon broj / e-poštu i šifru ispod na uplatnicu:</p>
									<p className="big">ABB CCD DDD</p>
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

export default connect(mapStateToProps)(validation(strategy)(Checkout));
