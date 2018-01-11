import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import moment from 'moment';
import TableToExcel from 'table-to-excel';
import { getEncounters, eraseEncounter } from '../../../actions/encounter';
import Header from '../../Public/Header/index';
import Footer from '../../Public/Footer/index';
import styles from './styles.css';

export class Encounter extends Component {
    constructor (props) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
        this.eraseEncounter = this.eraseEncounter.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getEncounters());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.erased === true) {
            this.props.dispatch(getEncounters());
        }
    }

    handleExport () {
        const tableToExcel=new TableToExcel();
        tableToExcel.render("admin-table");
    }

    eraseEncounter (event) {
        const id = event.currentTarget.id;
        this.props.dispatch(eraseEncounter(id));
    }

    render () {
        return (
            <div className="page admin">
                <Header location={this.props.location} />
                <div className="page-header">
                    <h1 className="admin-heading">Rezervacije</h1>
                </div>
                <button className="export-button" onClick={ this.handleExport }>Izvoz u Excel</button>
                <ul className="mobile-list">
                    {this.props.encounters.map((encounter, i) => {
                        const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');
                        const webRating = encounter.rating ? encounter.rating.web : 0;
                        const payRating = encounter.rating ? encounter.rating.pay : 0;
                        const ratingComment = encounter.rating ? encounter.rating.comment : '';

                        return (
                            <li key={i} className="list-item">
                                <h3>informacije osobe</h3>
                                <div>
                                    <p>Ime:</p>
                                    <p>{encounter.name}</p>
                                </div>
                                <div>
                                    <p>Ulica</p>
                                    <p>{encounter.street}</p>
                                </div>
                                <div>
                                    <p>Poštanski broj</p>
                                    <p>{encounter.postalCode}</p>
                                </div>
                                <div>
                                    <p>Grad</p>
                                    <p>{encounter.city}</p>
                                </div>
                                <div>
                                    <p>Zemlja</p>
                                    <p>{encounter.country}</p>
                                </div>
                                <div>
                                    <p>Tip plaćanja</p>
                                    <p>{encounter.paymentType}</p>
                                </div>
                                <div>
                                    <p>Odaberite vrijeme</p>
                                    <p>{encounter.timeframe}</p>
                                </div>
                                <div>
                                    <p>E-pošta:</p>
                                    <p>{encounter.mail}</p>
                                </div>
                                <div>
                                    <p>Telefon:</p>
                                    <p>{encounter.phone}</p>
                                </div>
                                <div>
                                    <p>Tema:</p>
                                    <p>{encounter.issue}</p>
                                </div>
                                <div>
                                    <p>Datum:</p>
                                    <p>{localTime}</p>
                                </div>
                                <h3>E-pošta</h3>
                                <div>
                                    <p>Cena:</p>
                                    <p>{encounter.order.email.cost}</p>
                                </div>
                                <div>
                                    <p>Nedelje:</p>
                                    <p>{encounter.order.email.week}</p>
                                </div>
                                <h3>Skype</h3>
                                <div>
                                    <p>Cena:</p>
                                    <p>{encounter.order.skype.cost}</p>
                                </div>
                                <div>
                                    <p>Nedelje:</p>
                                    <p>{encounter.order.skype.week}</p>
                                </div>
                                <div>
                                    <p>Ukupan:</p>
                                    <p>{encounter.order.price}</p>
                                </div>
                                <h3>Rajting</h3>
                                <div>
                                    <p>Web:</p>
                                    <p>{webRating}</p>
                                </div>
                                <div>
                                    <p>Plaćanje:</p>
                                    <p>{payRating}</p>
                                </div>
                                <div>
                                    <p>Komentar:</p>
                                    <p>{ratingComment}</p>
                                </div>
                            </li>
                        );
                    })};
                </ul>
                <div className="admin-wrapper">
                    <table id="admin-table" className="admin-table">

                        <thead>
                            <tr>
                                <th>Ime</th>
                                <th>Ulica</th>
                                <th>Poštanski broj</th>
                                <th>Grad</th>
                                <th>Zemlja</th>
                                <th>Tip plaćanja</th>
                                <th>Odaberite vrijeme</th>
                                <th>E-pošta</th>
                                <th>Telefon</th>
                                <th>Tema</th>
                                <th>Datum</th>
                                <th>Skype</th>
                                <th>Komentar</th>
                                <th>Cena e-pošte</th>
                                <th>E-mail nedelje</th>
                                <th>Cena skype</th>
                                <th>Skype nedelje</th>
                                <th>Ukupan</th>
                                <th>Rejting web</th>
                                <th>Rejting plaćanje</th>
                                <th>Rejting komentar</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.encounters.map((encounter, i) => {
                                const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');
                                const webRating = encounter.rating ? encounter.rating.web : 0;
                                const payRating = encounter.rating ? encounter.rating.pay : 0;
                                const ratingComment = encounter.rating ? encounter.rating.comment : '';

                                return (
                                    <tr key={i}>
                                        <td>{encounter.name}</td>
                                        <td>{encounter.street}</td>
                                        <td>{encounter.postalCode}</td>
                                        <td>{encounter.city}</td>
                                        <td>{encounter.country}</td>
                                        <td>{encounter.paymentType}</td>
                                        <td>{encounter.timeframe}</td>
                                        <td>{encounter.mail}</td>
                                        <td>{encounter.phone}</td>
                                        <td>{encounter.issue}</td>
                                        <td>{localTime}</td>
                                        <td>{encounter.skype}</td>
                                        <td>{encounter.comment}</td>
                                        <td>{encounter.order.email.cost}</td>
                                        <td>{encounter.order.email.week}</td>
                                        <td>{encounter.order.skype.cost}</td>
                                        <td>{encounter.order.skype.week}</td>
                                        <td>{encounter.price}</td>
                                        <td>{webRating}</td>
                                        <td>{payRating}</td>
                                        <td>{ratingComment}</td>
                                        <td id={encounter._id} onClick={this.eraseEncounter}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                                <g fill="#C04C9C">
                                                    <path d="M414.846 57.962h-91.224v-28.98C323.622 13 310.62 0 294.642 0H217.36c-15.98 0-28.982 13.003-28.982 28.98v28.982H97.155c-18.944 0-34.362 15.418-34.362 34.362v42.92h386.414v-42.92c0-18.944-15.418-34.362-34.36-34.362zm-110.544 0h-96.604v-28.98c0-5.334 4.337-9.66 9.66-9.66h77.283c5.323 0 9.66 4.327 9.66 9.66v28.98zM82.114 475.977c0 19.86 16.16 36.023 36.023 36.023h275.717c19.87 0 36.023-16.162 36.023-36.023v-321.41H82.104v321.41h.01z"/>
                                                </g>
                                            </svg>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Encounter.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    encounters: state.encounter.list,
    erased: state.encounter.erased
});

export default connect(mapStateToProps)(validation(strategy())(Encounter));
