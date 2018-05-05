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

        this.state = {
            openItems: []
        };

        this.handleExport = this.handleExport.bind(this);
        this.eraseEncounter = this.eraseEncounter.bind(this);
        this.renderMobile = this.renderMobile.bind(this);
        this.renderDesktop = this.renderDesktop.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getWorkshops());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.erased === true) {
            this.props.dispatch(getWorkshops());
        }
    }

    handleClick(event) {
        const index = this.state.openItems.indexOf(event.currentTarget.id);
        const openItems = this.state.openItems;

        if (index < 0) {
            openItems.push(event.currentTarget.id);
        } else {
            openItems.splice(index, 1);
        }

        console.log(openItems);

        this.setState({ openItems });
    }

    handleExport () {
        const tableToExcel=new TableToExcel();
        tableToExcel.render("admin-table");
    }

    eraseEncounter (event) {
        const id = event.currentTarget.id;
        this.props.dispatch(eraseWorkshop(id));
    }

    isMobile () {
        return window.innerWidth <= 800;
    }

    renderMobile() {
        return (<ul className="mobile-list">
            {this.props.workshops.map((workshop, i) => {
                const localTime = moment(workshop.date).format('YYYY-MM-DD / HH:mm');
                const isOpen = this.state.openItems.indexOf(workshop._id);
                const detailClass = isOpen < 0 ? 'details' : 'detailsOpen';
                const arrowClass = isOpen < 0 ? 'admin-arrow-right': 'admin-arrow-down';

                return (
                <li onClick={this.handleClick}
                    id={workshop._id}
                    key={i} className="list-item">
                    <div className="row">
                        <div
                            className={arrowClass}>
                            <div className='arrow-mask' />
                        </div>
                        <div className="name">
                            <p>{workshop.name}</p>
                        </div>
                        <p className="price">{workshop.price} {workshop.currency}</p>
                    </div>
                    <div className={detailClass}>
                        <div className="detail-inner">
                            <div className="col-1">
                                {(() => {
                                    if (workshop.street) {
                                        return <p>{workshop.street}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.city) {
                                        return <p>{workshop.postalCode} {workshop.city}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.country) {
                                        return <p>{workshop.country}</p>
                                    }
                                })()}
                            </div>
                            {(() => {
                            })()}
                            <div className="col-2">
                                {(() => {
                                    if (workshop.workshopName) {
                                        return <p>{workshop.workshopName}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.location) {
                                        return <p>{workshop.location}</p>
                                    }
                                })()}
                            </div>
                            <div className="col-3">
                                {(() => {
                                    if (workshop.rating && workshop.rating.web) {
                                        return <p>Rejting web: {workshop.rating.web}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.rating && workshop.rating.pay) {
                                        return <p>Rejting payment: {workshop.rating.pay}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.rating && workshop.rating.comment) {
                                        return <p>Komentar: {workshop.rating.comment}</p>
                                    }
                                })()}
                            </div>
                            <div className="col-4">
                                {(() => {
                                    if (workshop.paymentType) {
                                        return <p>Plaćanja: {workshop.paymentType}</p>
                                    }
                                })()}
                            </div>
                            <div className="col-5">
                                {localTime}
                                {(() => {
                                    if (workshop.phone) {
                                        return <p>Tel.broj: {workshop.phone}</p>
                                    }
                                })()}
                                {(() => {
                                    if (workshop.mail) {
                                        return <p>E-pošta: {workshop.mail}</p>
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </li>);
            })};
        </ul>);
    }

    renderDesktop() {
        return (<ul className="mobile-list">
            <li>
                <div>
                    <p>Ime i adresa</p>
                    <p>Radionica</p>
                    <p>Grad</p>
                    <p>Komentar</p>
                    <p>Narudžba</p>
                    <p>Kontakt info</p>
                    <p>Ukupno</p>
                </div>
            </li>
            {this.props.workshops.map((workshop, i) => {
                const localTime = moment(workshop.date).format('YYYY-MM-DD / HH:mm');
                const isOpen = this.state.openItems.indexOf(workshop._id);
                const detailClass = isOpen < 0 ? 'details' : 'detailsOpen';
                const arrowClass = isOpen < 0 ? 'admin-arrow-right' : 'admin-arrow-down';

                return (
                    <li onClick={this.handleClick}
                        id={workshop._id}
                        key={i} className="list-item">
                        <div>
                            <div
                                className={arrowClass}>
                                <div className='arrow-mask'/>
                            </div>
                            <div>
                                {(() => {
                                    if (workshop.name) {
                                        return <p>{workshop.name}</p>
                                    }
                                })()}
                            </div>
                            <div>
                                {(() => {
                                    if (workshop.workshopName) {
                                        return <p>{workshop.workshopName}</p>
                                    }
                                })()}
                            </div>
                            <div>
                                {(() => {
                                    if (workshop.location) {
                                        return <p>{workshop.location}</p>
                                    }
                                })()}
                            </div>
                            {(() => {
                                if (workshop.rating && workshop.rating.web && workshop.rating.pay) {
                                    return <p
                                        className="rating-number">{Math.round((parseInt(workshop.rating.web) + parseInt(workshop.rating.pay)) / 2)}</p>
                                }
                            })()}
                            <p>{localTime}</p>
                            {(() => {
                                if (workshop.mail) {
                                    return <p>{workshop.mail}</p>
                                }
                            })()}
                            {(() => {
                                if (workshop.currency) {
                                    return <p>{workshop.price} {workshop.currency}</p>
                                }
                            })()}
                        </div>
                        <div className={detailClass}>
                            <div className="detail-inner">
                                <div className="col-1">
                                    {(() => {
                                        if (workshop.street) {
                                            return <p>{workshop.street}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (workshop.city) {
                                            return <p>{workshop.postalCode} {workshop.city}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (workshop.country) {
                                            return <p>{workshop.country}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-2" />
                                <div className="col-3" />
                                <div className="col-4">
                                    <p>Web: {workshop.rating.web}</p>
                                    <p>Payment: {workshop.rating.pay}</p>
                                    <p>Komentar: {workshop.rating.comment}</p>
                                </div>
                                <div className="col-5">
                                    {(() => {
                                        if (workshop.paymentType) {
                                            return <p>Plaćanja: {workshop.paymentType}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-6">
                                    {(() => {
                                        if (workshop.phone) {
                                            return <p>Tel.broj: {workshop.phone}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-7">
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })};
        </ul>);
    }

    render () {
        return (
            <div className="page admin">
                <Header location={this.props.location} />
                <div className="page-header">
                    <h1 className="admin-heading">Rezervacije</h1>
                </div>
                <button className="export-button" onClick={ this.handleExport }>Izvoz u Excel</button>
                {(() => {
                    if (this.isMobile()) {
                        return this.renderMobile();
                    } else {
                        return this.renderDesktop();
                    }
                })()}
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
                <Footer />
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
