import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import moment from 'moment';
import TableToExcel from 'table-to-excel';
import { getEncounters } from '../../actions/encounter';
import Header from '../Public/Header';
import styles from './styles.css';

export class Admin extends Component {
    constructor (props) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getEncounters());
    }

    handleExport () {
        const tableToExcel=new TableToExcel();
        tableToExcel.render("admin-table");
    }

    render () {
        return (
            <div className="page admin">
                <Header location={this.props.location} />
                <div className="page-header">
                    <h1 className="admin-heading">Zdravlje - Susreti</h1>
                </div>
                <button className="export-button" onClick={ this.handleExport }>Izvoz u Excel</button>
                <ul className="mobile-list">
                    {this.props.encounters.map((encounter) => {
                        const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');

                        return (
                            <li className="list-item">
                                <h3>informacije osobe</h3>
                                <div>
                                    <p>Ime:</p>
                                    <p>{encounter.name}</p>
                                </div>
                                <div>
                                    <p>E-posta:</p>
                                    <p>{encounter.mail}</p>
                                </div>
                                <div>
                                    <p>Telefon:</p>
                                    <p>{encounter.phone}</p>
                                </div>
                                <div>
                                    <p>Date:</p>
                                    <p>{localTime}</p>
                                </div>
                                <h3>E-posta</h3>
                                <div>
                                    <p>Cost:</p>
                                    <p>{encounter.order.email.cost}</p>
                                </div>
                                <div>
                                    <p>Weeks:</p>
                                    <p>{encounter.order.email.week}</p>
                                </div>
                                <h3>Skype</h3>
                                <div>
                                    <p>Cost:</p>
                                    <p>{encounter.order.skype.cost}</p>
                                </div>
                                <div>
                                    <p>Weeks:</p>
                                    <p>{encounter.order.skype.week}</p>
                                </div>
                                <div>
                                    <p>Price:</p>
                                    <p>{encounter.order.price}</p>
                                </div>
                            </li>
                        );
                    })};
                </ul>
                <table id="admin-table" className="admin-table">
                    <colgroup>
                        <col width="17%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="18%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="7%" />
                        <col width="9%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>E-cost</th>
                            <th>E-weeks</th>
                            <th>S-cost</th>
                            <th>S-weeks</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.encounters.map((encounter) => {
                            const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');

                            return (
                                <tr>
                                    <td>{encounter.name}</td>
                                    <td>{encounter.mail}</td>
                                    <td>{encounter.phone}</td>
                                    <td>{localTime}</td>
                                    <td>{encounter.order.email.cost}</td>
                                    <td>{encounter.order.email.week}</td>
                                    <td>{encounter.order.skype.cost}</td>
                                    <td>{encounter.order.skype.week}</td>
                                    <td>{encounter.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

Admin.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    encounters: state.encounter.list
});

export default connect(mapStateToProps)(validation(strategy())(Admin));
