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
        console.log(this.props.encounters);

        return (
            <div className="page">
                <ul>
                {this.props.encounters.map((encounter) => {
                    return (
                        <li>
                            <p>Name: {encounter.name}</p>
                            <p>E-mail: {encounter.mail}</p>
                            <p>Phone: {encounter.phone}</p>
                            <p>Date: {encounter.date}</p>
                            <p>Email cost: {encounter.order.email.cost}</p>
                            <p>Email number of weeks: {encounter.order.email.week}</p>
                            <p>Skype cost: {encounter.order.skype.cost}</p>
                            <p>Skype number of weeks: {encounter.order.skype.week}</p>
                            <p>Total price: {encounter.price}</p>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}

Admin.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    encounters: state.encounter.list
});

export default connect(mapStateToProps)(validation(strategy())(Admin));
