import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ping, logout } from '../../../actions/auth';
import styles from './styles.css';

export class Footer extends Component {
    constructor (props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount () {}

    render () {
        const { t } = this.props;

        return (
            <footer className="footer">
                <div className="col col-1">
                    <h3>O Zdravlje.nu</h3>
                    <p>Mi smo praksa za svakodnevne probleme koje većina nas susreće u našim životima. Naš cilj je da savjetodavne usluge budu pristupačne za sve, diskretno i po razumnoj cijeni. Korišćenjem naučnih i evidencijom dokazane interventcije, možemo pomoći ljudima da nauče da prevaziđu svoje probleme i nauče da žive život koji žele živjeti, udobno i samopouzdano.</p>
                </div>
                <div className="col col-2">
                    <h3>Blogovi</h3>
                    <p>Det är är länk till blogg nummer 1</p>
                    <p>Det är är länk till blogg nummer 2</p>
                    <p>Det är är länk till blogg nummer 3</p>
                    <p>Det är är länk till blogg nummer 4</p>
                    <p>Det är är länk till blogg nummer 5</p>
                </div>
                <div className="col col-3">
                    <h3>Uslovi</h3>
                    <p>Privacy policy</p>
                    <p>Terms and conditions</p>
                    <p>FAQ</p>
                    <p>Customer service</p>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(translate('headerView')(Footer))

