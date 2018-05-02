import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
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

        this.state = {
            openItems: []
        };

        this.handleExport = this.handleExport.bind(this);
        this.eraseEncounter = this.eraseEncounter.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderDesktop = this.renderDesktop.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getEncounters());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.erased === true) {
            this.props.dispatch(getEncounters());
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
        this.props.dispatch(eraseEncounter(id));
    }

    isMobile () {
        return window.innerWidth <= 800;
    }

    renderMobile() {
        return (<ul className="mobile-list">
                {this.props.encounters.map((encounter, i) => {
                    const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');
                    const isOpen = this.state.openItems.indexOf(encounter._id);
                    const detailClass = isOpen < 0 ? 'details' : 'detailsOpen';
                    const arrowClass = isOpen < 0 ? 'admin-arrow-right': 'admin-arrow-down';
                    const type = encounter.fb === false ? 'Webstranica' : 'Facebook';

                    let serviceType;

                    if ('order' in encounter) {
                        if (encounter.order.email.cost !== 0 && encounter.order.skype.cost !== 0) {
                            serviceType = 'combo';
                        } else if (encounter.order.skype.cost === 0 && encounter.order.email.cost !== 0) {
                            serviceType = 'email'
                        } else if (encounter.order.skype.cost !== 0 && encounter.order.email.cost === 0) {
                            serviceType = 'skype';
                        }
                    } else {
                        if (encounter.email === 0 && encounter.skype !== 0) {
                            serviceType = 'email';
                        } else if (encounter.email !== 0 && encounter.skype === 0) {
                            serviceType = 'skype';
                        } else if (encounter.email !== 0 && encounter.skype !== 0) {
                            serviceType = 'combo';
                        }
                    }

                    return (
                        <li onClick={this.handleClick}
                            id={encounter._id}
                            key={i} className="list-item">
                            <div className="row">
                                <div
                                    className={arrowClass}>
                                    <div className='arrow-mask' />
                                </div>
                                <div className="name">
                                    <p>{encounter.name}</p>
                                </div>
                                <p className="price">{encounter.price} {encounter.currency}</p>
                            </div>
                            <div className={detailClass}>
                                <div className="detail-inner">
                                    <div className="col-1">
                                        {(() => {
                                            if (encounter.street) {
                                                return <p>{encounter.street}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.city) {
                                                return <p>{encounter.postalCode} {encounter.city}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.country) {
                                                return <p>{encounter.country}</p>
                                            }
                                        })()}
                                    </div>
                                    {(() => {
                                    })()}
                                    <div className="col-2">
                                        {(() => {
                                            if (serviceType === 'combo' || serviceType === 'skype') {
                                                return <p>Online razgovor: {encounter.order.skype.week}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (serviceType === 'skype' || serviceType === 'combo') {
                                                return <p>Vrsta: {encounter.order.skype.duration} minuta</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (serviceType === 'combo' || serviceType === 'email') {
                                                return <p>E-pošta: {encounter.order.email.week}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (serviceType === 'email' || serviceType === 'combo') {
                                                return <p>Odgovor:</p>
                                            }
                                        })()}
                                    </div>
                                    <div className="col-3">
                                        {(() => {
                                            if (encounter.rating && encounter.rating.web) {
                                                return <p>Rejting web: {encounter.rating.web}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.rating && encounter.rating.pay) {
                                                return <p>Rejting payment: {encounter.rating.pay}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.rating && encounter.rating.comment) {
                                                return <p>Komentar: {encounter.rating.comment}</p>
                                            }
                                        })()}
                                    </div>
                                    <div className="col-4">
                                        {(() => {
                                            if (encounter.issue) {
                                                return <p>Vrijeme: {encounter.timeframe}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.timeframe) {
                                                return <p>Tip: {type}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.paymentType) {
                                                return <p>Plaćanja: {encounter.paymentType}</p>
                                            }
                                        })()}
                                    </div>
                                    <div className="col-5">
                                        {localTime}
                                        {(() => {
                                            if (encounter.phone) {
                                                return <p>Tel.broj: {encounter.phone}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.mail) {
                                                return <p>E-pošta: {encounter.mail}</p>
                                            }
                                        })()}
                                    </div>
                                    <div className="col-6">
                                        {(() => {
                                            if (encounter.order.skype.cost > 0) {
                                                return <p>Online razgovor: {encounter.order.skype.cost} {encounter.currency}</p>
                                            }
                                        })()}
                                        {(() => {
                                            if (encounter.order.email.cost > 0) {
                                                return <p>E-pošta: {encounter.order.email.cost} {encounter.currency}</p>
                                            }
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }

    renderDesktop() {
        return (<ul className="mobile-list">
            <li>
                <div>
                    <p>Ime i adresa</p>
                    <p>Usluga</p>
                    <p>Komentar</p>
                    <p>Narudžba</p>
                    <p>Kontakt info</p>
                    <p>Ukupan</p>
                    <p>Tip</p>
                </div>
            </li>
            {this.props.encounters.map((encounter, i) => {
                const localTime = moment(encounter.date).format('YYYY-MM-DD / HH:mm');
                const isOpen = this.state.openItems.indexOf(encounter._id);
                const detailClass = isOpen < 0 ? 'details' : 'detailsOpen';
                const arrowClass = isOpen < 0 ? 'admin-arrow-right': 'admin-arrow-down';
                const type = encounter.fb === false ? 'Webstranica' : 'Facebook';

                let serviceLabel;
                let serviceType;

                if ('order' in encounter) {
                    if (encounter.order.email.cost !== 0 && encounter.order.skype.cost !== 0) {
                        serviceLabel = 'Online razgovor i e-pošta';
                        serviceType = 'combo';
                    } else if (encounter.order.skype.cost === 0 && encounter.order.email.cost !== 0) {
                        serviceLabel = 'E-pošta';
                        serviceType = 'email'
                    } else if (encounter.order.skype.cost !== 0 && encounter.order.email.cost === 0) {
                        serviceLabel = 'Online razgovor';
                        serviceType = 'skype';
                    }
                } else {
                    if (encounter.email === 0 && encounter.skype !== 0) {
                        serviceLabel = 'E-pošta';
                        serviceType = 'email';
                    } else if (encounter.email !== 0 && encounter.skype === 0) {
                        serviceLabel = 'Online razgovor';
                        serviceType = 'skype';
                    } else if (encounter.email !== 0 && encounter.skype !== 0) {
                        serviceLabel = 'Online razgovor i e-pošta';
                        serviceType = 'combo';
                    }
                }

                return (
                    <li onClick={this.handleClick}
                        id={encounter._id}
                        key={i} className="list-item">
                        <div>
                            <div
                                className={arrowClass}>
                                <div className='arrow-mask' />
                            </div>
                            <div>
                                {(() => {
                                    if (encounter.name) {
                                        return <p>{encounter.name}</p>
                                    }
                                })()}
                            </div>
                            <p>{serviceLabel}</p>
                            {(() => {
                                if (encounter.rating && encounter.rating.web && encounter.rating.pay) {
                                    return <p
                                        className="rating-number">{Math.round((parseInt(encounter.rating.web) + parseInt(encounter.rating.pay)) / 2)}</p>
                                }
                            })()}
                            <p>{localTime}</p>
                            {(() => {
                                if (encounter.mail) {
                                    return <p>{encounter.mail}</p>
                                }
                            })()}
                            {(() => {
                                if (encounter.currency) {
                                    return <p>{encounter.price} {encounter.currency}</p>
                                }
                            })()}
                            {(() => {
                                if (encounter.fb === true) {
                                    return <p>Facebook</p>
                                } else {
                                    return <p>Web stranica</p>
                                }
                            })()}
                        </div>
                        <div className={detailClass}>
                            <div className="detail-inner">
                                <div className="col-1">
                                    {(() => {
                                        if (encounter.street) {
                                            return <p>{encounter.street}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (encounter.city) {
                                            return <p>{encounter.postalCode} {encounter.city}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (encounter.country) {
                                            return <p>{encounter.country}</p>
                                        }
                                    })()}
                                </div>
                                {(() => {
                                })()}
                                <div className="col-2">
                                    {(() => {
                                        if (serviceType === 'combo' || serviceType === 'skype') {
                                            return <p>Online razgovor: {encounter.order.skype.week}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (serviceType === 'skype' || serviceType === 'combo') {
                                            return <p>Vrsta: {encounter.order.skype.duration} minuta</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (serviceType === 'combo' || serviceType === 'email') {
                                            return <p>E-pošta: {encounter.order.email.week}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (serviceType === 'email' || serviceType === 'combo') {
                                            return <p>Odgovor:</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-3">
                                    <p>Web: {encounter.rating.web}</p>
                                    <p>Payment: {encounter.rating.pay}</p>
                                    <p>Komentar: {encounter.rating.comment}</p>
                                </div>
                                <div className="col-4">
                                    {(() => {
                                        if (encounter.issue) {
                                            return <p>Vrijeme: {encounter.timeframe}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (encounter.timeframe) {
                                            return <p>Tip: {type}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (encounter.paymentType) {
                                            return <p>Plaćanja: {encounter.paymentType}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-5">
                                    {(() => {
                                        if (encounter.phone) {
                                            return <p>Tel.broj: {encounter.phone}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-6">
                                    {(() => {
                                        if (encounter.order.skype.cost > 0) {
                                            return <p>Online razgovor: {encounter.order.skype.cost} {encounter.currency}</p>
                                        }
                                    })()}
                                    {(() => {
                                        if (encounter.order.email.cost > 0) {
                                            return <p>E-pošta: {encounter.order.email.cost} {encounter.currency}</p>
                                        }
                                    })()}
                                </div>
                                <div className="col-7" />
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
        )
    }

    render () {
        const { t } = this.props;

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
                                <th>Valuta</th>
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
                                        <td>{encounter.currency}</td>
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
                <Footer />
            </div>
        )
    }
}

Encounter.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    encounters: state.encounter.list,
    erased: state.encounter.erased
});

export default connect(mapStateToProps)(translate('checkoutView')(validation(strategy())(Encounter)));
