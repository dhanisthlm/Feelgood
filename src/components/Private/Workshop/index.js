import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import moment from 'moment';
import TableToExcel from 'table-to-excel';
import { getWorkshops, eraseWorkshop } from '../../../actions/encounter';
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
        this.props.dispatch(getWorkshops());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.erased === true) {
            this.props.dispatch(getWorkshops());
        }
    }

    handleExport () {
        const tableToExcel=new TableToExcel();
        tableToExcel.render("admin-table");
    }

    eraseEncounter (event) {
        const id = event.currentTarget.id;
        this.props.dispatch(eraseWorkshop(id));
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
                    {this.props.workshops.map((workshop, i) => {
                        const localTime = moment(workshop.date).format('YYYY-MM-DD / HH:mm');
                        const webRating = workshop.rating ? workshop.rating.web : 0;
                        const payRating = workshop.rating ? workshop.rating.pay : 0;
                        const ratingComment = workshop.rating ? workshop.rating.comment : '';

                        return (
                            <li key={i} className="list-item">
                                <div>
                                    <p>Radionica grad:</p>
                                    <p>{workshop.location}</p>
                                </div>
                                <div>
                                    <p>Radionica ime:</p>
                                    <p>{workshop.workshopName}</p>
                                </div>
                                <div>
                                    <p>Mjesec:</p>
                                    <p>{workshop.month}</p>
                                </div>
                                <div>
                                    <p>Dan:</p>
                                    <p>{workshop.day}</p>
                                </div>
                                <div>
                                    <p>Ime:</p>
                                    <p>{workshop.name}</p>
                                </div>
                                <div>
                                    <p>Ulica</p>
                                    <p>{workshop.street}</p>
                                </div>
                                <div>
                                    <p>Poštanski broj</p>
                                    <p>{workshop.postalCode}</p>
                                </div>
                                <div>
                                    <p>Grad</p>
                                    <p>{workshop.city}</p>
                                </div>
                                <div>
                                    <p>Zemlja</p>
                                    <p>{workshop.country}</p>
                                </div>
                                <div>
                                    <p>Valuta</p>
                                    <p>{workshop.currency}</p>
                                </div>
                                <div>
                                    <p>Tip plaćanja</p>
                                    <p>{workshop.paymentType}</p>
                                </div>
                                <div>
                                    <p>E-pošta:</p>
                                    <p>{workshop.mail}</p>
                                </div>
                                <div>
                                    <p>Telefon:</p>
                                    <p>{workshop.phone}</p>
                                </div>
                                <div>
                                    <p>Datum:</p>
                                    <p>{localTime}</p>
                                </div>
                                <div>
                                    <p>Ukupan:</p>
                                    <p>{workshop.price}</p>
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
                            <th>Radionica grad</th>
                            <th>Radionica ime</th>
                            <th>Mjesec</th>
                            <th>Dan</th>
                            <th>Ime</th>
                            <th>Ulica</th>
                            <th>Poštanski broj</th>
                            <th>Grad</th>
                            <th>Zemlja</th>
                            <th>Tip plaćanja</th>
                            <th>E-pošta</th>
                            <th>Telefon</th>
                            <th>Datum</th>
                            <th>Valuta</th>
                            <th>Komentar</th>
                            <th>Ukupna</th>
                            <th>Rejting web</th>
                            <th>Rejting plaćanje</th>
                            <th>Rejting komentar</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.workshops.map((workshop, i) => {
                            const localTime = moment(workshop.date).format('YYYY-MM-DD / HH:mm');
                            const webRating = workshop.rating ? workshop.rating.web : 0;
                            const payRating = workshop.rating ? workshop.rating.pay : 0;
                            const ratingComment = workshop.rating ? workshop.rating.comment : '';

                            return (
                                <tr key={i}>
                                    <td>{workshop.location}</td>
                                    <td>{workshop.workshopName}</td>
                                    <td>{workshop.month}</td>
                                    <td>{workshop.day}</td>
                                    <td>{workshop.name}</td>
                                    <td>{workshop.street}</td>
                                    <td>{workshop.postalCode}</td>
                                    <td>{workshop.city}</td>
                                    <td>{workshop.country}</td>
                                    <td>{workshop.paymentType}</td>
                                    <td>{workshop.mail}</td>
                                    <td>{workshop.phone}</td>
                                    <td>{localTime}</td>
                                    <td>{workshop.currency}</td>
                                    <td>{workshop.comment}</td>
                                    <td>{workshop.price}</td>
                                    <td>{webRating}</td>
                                    <td>{payRating}</td>
                                    <td>{ratingComment}</td>
                                    <td id={workshop._id} onClick={this.eraseEncounter}>
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
    workshops: state.encounter.workshops,
    erased: state.encounter.workshopErased
});

export default connect(mapStateToProps)(validation(strategy())(Encounter));
