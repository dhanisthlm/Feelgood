import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import Hero from './Hero';
import Payment from './Payment';
import Quote from './Quote';
import Traitments from './Traitments';
import QuoteImage from './QuoteImage';
import Staff from './Staff';
import styles from './styles.css';

export class Main extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return (
            <div className="page">
                <Header />
                <Hero />
                <Quote />
                <Traitments />
                <Payment />
                <QuoteImage />
                <Staff />
            </div>
        )
    }
}

Header.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Main)
