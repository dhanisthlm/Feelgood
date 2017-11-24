import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import { getEncounters } from '../../actions/encounter';
import styles from './styles.css';

export class Admin extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount () {
        this.props.dispatch(getEncounters());
    }

    render () {
        console.log(this.props);

        return (
            <div className="admin">

            </div>
        )
    }
}

Admin.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    encounters: state.encounter.list
});

export default connect(mapStateToProps)(validation(strategy())(Admin));
