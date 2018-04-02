import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import TableToExcel from 'table-to-excel';
import { getNewsletters, eraseNewsletter } from '../../../actions/encounter';
import Header from '../../Public/Header/index';
import styles from './styles.css';

export class Newsletter extends Component {
    constructor (props) {
        super(props);

        this.handleExport = this.handleExport.bind(this);
        this.eraseNewsletter = this.eraseNewsletter.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(getNewsletters());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.erased === true) {
            this.props.dispatch(getNewsletters());
        }
    }

    handleExport () {
        const tableToExcel=new TableToExcel();
        tableToExcel.render("admin-table");
    }

    eraseNewsletter (event) {
        const id = event.currentTarget.id;
        this.props.dispatch(eraseNewsletter(id));
    }

    render () {
        return (
            <div className="page admin">
                <Header location={this.props.location} />
                <div className="page-header">
                    <h1 className="admin-heading">Newsletter subscriptions</h1>
                </div>
                <button className="export-button" onClick={ this.handleExport }>Export to Excel</button>
                <ul className="mobile-list">
                    {this.props.newsletters.map((newsletter, i) => {
                        return (
                            <li key={i} className="list-item">
                                <div>
                                    <p>Email:</p>
                                    <p>{newsletter.email}</p>
                                </div>
                            </li>
                        );
                    })};
                </ul>
                <div className="admin-wrapper">
                    <table id="admin-table" className="admin-table">
                        <thead>
                        <tr>
                            <th colSpan="2">Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.newsletters.map((newsletter, i) => {
                            return (
                                <tr key={i}>
                                    <td>{newsletter.email}</td>
                                    <td id={newsletter._id} onClick={this.eraseNewsletter}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
                                            <g fill="#0e5ba5">
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

Newsletter.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    newsletters: state.encounter.newsletters,
    erased: state.encounter.newsletterErased
});

export default connect(mapStateToProps)(validation(strategy())(Newsletter));
