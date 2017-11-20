import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { saveEncounter } from '../../../actions/encounter';
import styles from './styles.css';

export class Checkout extends Component {
	constructor (props) {
		super(props);

		this.state = {};

		this.resetCheckout = this.resetCheckout.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	resetCheckout () {
		this.props.resetCheckout();
	}

	handleSubmit () {
		const payload = {
			name: 'Daniel Jansson',
			mail: 'janzon.daniel@gmail.com',
			phone: '0812345678',
			skype: 's-40',
			email: 's-4',
			price: 345
		};

		this.props.dispatch(saveEncounter(payload));
	}

	render () {
		return (
			<div className="checkout">
				<div className="basket">
					<svg onClick={ this.resetCheckout } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="512" height="512">
						<path d="M22 0C9.8 0 0 9.8 0 22s9.8 22 22 22 22-9.8 22-22S34.2 0 22 0zm3.2 22.4l7.5 7.5c.2.2.3.5.3.7s-.1.5-.3.7l-1.4 1.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-7.5-7.5c-.2-.2-.5-.2-.7 0l-7.5 7.5c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3l-1.4-1.4c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l7.5-7.5c.2-.2.2-.5 0-.7l-7.5-7.5c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.2-.2.5-.3.7-.3s.5.1.7.3l7.5 7.5c.2.2.5.2.7 0l7.5-7.5c.2-.2.5-.3.7-.3.3 0 .5.1.7.3l1.4 1.4c.2.2.3.5.3.7s-.1.5-.3.7l-7.5 7.5c-.2.1-.2.5 0 .7z" fill="#c04c9c"/>
					</svg>
					<button onClick={ this.handleSubmit }>Save</button>
				</div>
			</div>
		);
	}
}

Checkout.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Checkout)
