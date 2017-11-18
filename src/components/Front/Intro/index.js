import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class Hero extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div className="introduction">
                <img src="/images/flowers.jpg" alt="hero-image" />
                <div className="text-wrapper">
                    <h3 className="heading">Terapija za svaskoga</h3>
                    <p className="preamble">Ovdje smo za vas, ako trebate s kim razgovarati. Zdravlje.nu nudi vam terapiju diskretno i po razumnoj cijeni. U terapiji prepoznajemo koje misli i emocije vas sprečavaju da se osjećate dobro i budete uspješni u životu, te radimo na promjeni.</p>
                    <button className="intro-button">Zapocnite</button>
                </div>
            </div>
        );
    }
}

Hero.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Hero)
