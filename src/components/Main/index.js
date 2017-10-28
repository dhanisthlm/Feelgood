import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import Header from '../Header';
import Hero from '../Hero';
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
            </div>
        )
    }
}

Header.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Main)
