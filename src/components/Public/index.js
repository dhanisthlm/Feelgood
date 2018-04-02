import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from './Header';
import Hero from './Intro';
import Payment from './Payment';
import Quote from './Quote';
import Traitments from './Issues';
import QuoteImage from './Quoteimage';
import Staff from './Staff';
import HowItWorks from './HowItWorks';
import Newsletter from './Newsletter';
import Footer from './Footer';
import styles from './styles.css';

export class Main extends Component {
    constructor (props) {
        super(props);
        this.state = {};
    }

    render () {
        return (
            <div className="page">
                <Header location={this.props.location} />
                <Hero location={this.props.location} />
                <Quote />
                <Traitments />
                <Payment />
                <QuoteImage />
                <Staff />
                <HowItWorks />
                <Newsletter />
                <Footer />
            </div>
        )
    }
}

Header.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Main)
