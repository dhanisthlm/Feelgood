import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { saveEncounter, resetEncounter } from '../../../actions/encounter';
import styles from './styles.css';

export class Checkout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			name: '',
			mail: '',
			phone: '',
			comment: '',
			isOpen: false
		};

		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount () {
		this.setState({ isOpen: true });
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
		this.props.dispatch(saveEncounter(this.state));
	}

	render () {
        const front = (this.props.save === true) ? 'front none' : 'front';
        const back = (this.props.save === false) ? 'back none' : 'back';

		if (this.state.isOpen === true) {
            return (
				<div ref={(checkout) => { this.checkout = checkout; }} className="checkout">
					<div className="basket">
						<div className={front}>
							<h1>Potvrda narudžbe</h1>
							<label htmlFor="name">Ime</label>
							<input onChange={ this.handleChange } id="name" type="text" value={this.state.name}/>
							<label htmlFor="phone">Telefon</label>
							<input onChange={ this.handleChange } id="phone" type="text" value={this.state.phone}/>
							<label htmlFor="email">E-pošta</label>
							<input onChange={ this.handleChange } id="mail" type="text" value={this.state.mail}/>
							<label htmlFor="comment">Kommentar</label>
							<textarea onChange={ this.handleChange }>{this.state.comment}</textarea>
							<button onClick={ this.handleSubmit }>Zakažite</button>
						</div>
						<div className={back}>
							<h1>Potvrda narudžbe</h1>
							<p>Molimo uplatite xxx na bankovni računu:</p>
							<p className="big">YYY YYY YYY YYY</p>
							<p>Napišite vaše ime, telefon broj / e-poštu i šifru ispod na uplatnicu:</p>
							<p className="big">ABB CCD DDD</p>
							<p>Mi će mo vas zovnuti da rezerviramo termin za razgovor sa našim psiholozima kada smo
								primili novac.</p>
							<p>Dobićete fakturu na vašu e-poštu u roku od 24 sata sa detaljima plaćanja.</p>
							<p>Mnogo hvala,</p>
							<p>Tim zdravilje</p>
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

export default connect(mapStateToProps)(Checkout)
