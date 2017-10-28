import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import styles from './styles.css';

export class Hero extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    render () {
        return null;
    }
}

Hero.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Hero)
