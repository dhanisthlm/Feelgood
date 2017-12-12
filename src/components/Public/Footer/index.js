import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getBlogs } from '../../../actions/blog';
import styles from './styles.css';

export class Footer extends Component {
    constructor (props) {
        super(props);

        this.state = {};
    }

    componentDidMount () {
        this.props.dispatch(getBlogs());
    }

    render () {
        const { t } = this.props;

        return (
            <footer className="footer">
                <div className="col col-1">
                    <h3>O Zdravlje.nu</h3>
                    <p>Mi smo praksa za svakodnevne probleme koje većina nas susreće u našim životima. Naš cilj je da savjetodavne usluge budu pristupačne za sve, diskretno i po razumnoj cijeni. Korišćenjem naučnih i evidencijom dokazane interventcije, možemo pomoći ljudima da nauče da prevaziđu svoje probleme i nauče da žive život koji žele živjeti, udobno i samopouzdano.</p>
                </div>
                <div className="col col-2">
                    <h3>Blogovi</h3>
                    {
                        this.props.blogs.map((blog, i) => {
                            const href = `/blogovi#${blog.hash}`;
                            return (i < 5)
                                ? <a className="link" href={href} key={i}>{blog.date} {blog.title}</a>
                                : null;
                        })
                    }
                </div>
                <div className="col col-3">
                    <h3>Uslovi</h3>
                    <a className="link" href="/politika-privatnosti">Pravila o privatnosti</a>
                    <p className="link">Uslovi</p>
                    <p className="link">Izjava o kolačićima</p>
                    <p className="link">FAQ - Pitanja</p>
                    <a className="link" href="/kontakt">Služba za korisnike</a>
                </div>
            </footer>
        )
    }
}

Footer.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    blogs: state.blog.list
});

export default connect(mapStateToProps)(translate('headerView')(Footer))

