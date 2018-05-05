import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { login } from '../../../actions/auth';
import Header from '../../Public/Header/index';
import Footer from '../../Public/Footer/index';
import styles from './styles.css';

export class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, type) {
        this.setState({[type]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(login(this.state));
    }

    render () {
        const { t } = this.props;

        return (
            <div className="page login">
                <Header location={this.props.location} />
                <div className="page-header"><h1>Login</h1></div>
                <div className="login-wrapper">
                    <div>
                        <label htmlFor="username">Korisničko ime</label>
                        <input
                            id="username"
                            type="text"
                            onChange={(e) => this.handleChange(e, 'username')}
                            value={ this.state.username }
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Lozinka</label>
                        <input
                            id="password"
                            type="password"
                            onChange={(e) => this.handleChange(e, 'password')}
                            value={ this.state.password }
                        />
                    </div>
                    <button onClick={ this.handleSubmit }>Ulogovati se</button>
                    <div className="push" />
                </div>
                <Footer />
            </div>
        )
    }
}

Login.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(translate('headerView')(Login))

