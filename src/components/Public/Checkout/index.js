import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { saveEncounter } from '../../../actions/encounter';
import styles from './styles.css';

export class Checkout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			phone: '',
			comment: ''
		};

		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	resetCheckout () {
		this.props.resetCheckout();
	}

	handleChange (e) {
		this.setState({ [e.target.id]: e.target.value })
	}

	handleSubmit () {
		console.log(this.state)
		//this.props.dispatch(saveEncounter(this.state));
	}

	render () {
        const front = (this.props.save === true) ? 'front none' : 'front';
        const back = (this.props.save === false) ? 'back none' : 'back';

		return (
			<div className="checkout">
				<div className="basket">
					<svg onClick={ this.resetCheckout } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="512" height="512">
						<path d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z" fill="#c04c9c"/>
					</svg>
					<div className={front}>
						<h1>Potvrda narudžbe</h1>
						<label htmlFor="name">Ime</label>
						<input onChange={ this.handleChange } id="name" type="text" value={this.state.name} />
						<label htmlFor="phone">Telefon</label>
						<input onChange={ this.handleChange } id="phone" type="text" value={this.state.phone} />
						<label htmlFor="email">E-pošta</label>
						<input onChange={ this.handleChange } id="mail" type="text" value={this.state.mail} />
						<label htmlFor="comment">Kommentar</label>
						<textarea onChange={ this.handleChange }>{this.state.comment}</textarea>
						<button onClick={ this.handleSubmit }>Zakažite</button>
					</div>
					<div className={back}>
						<h1>Potvrda narudžbe</h1>
						<p>Uplatite xxxx KM na račun:</p>
						<p className="big">YYY YYY YYY YYY</p>
						<p>Napišite vaše ime, telefon broj / e-poštu i šifru ispod na uplatnicu:</p>
						<p className="big">ABB CCD DDD</p>
						<p>Mi će mo vas zovnuti da rezerviramo termin za razgovor sa našim psiholozima kada smo primili novac.</p>
						<p>Dobićete fakturu na vašu e-poštu u roku od 24 sata sa detaljima plaćanja.</p>
						<p>Mnogo hvala, tim zdravilje</p>
					</div>
				</div>
			</div>
		);
	}
}

Checkout.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
	save: state.encounter.saved
});

export default connect(mapStateToProps)(Checkout)
