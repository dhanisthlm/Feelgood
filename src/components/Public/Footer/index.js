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
                    <h2>O Zdravlje.nu</h2>
                    <p>{ t('about') }</p>
                    <div className="address">
                        <p><span className="heading">Adresa:</span> Baunad doo Tuzla, Zdravlje.nu, Maršala Tita 109, 75000 Tuzla, Bosna i Hercegovina</p>
                    </div>
                </div>
                <div className="col col-2">
                    <h2>Blogovi</h2>
                    {
                        this.props.blogs.map((blog, i) => {
                            const href = `/blogovi#${blog.hash}`;
                            return (i < 6)
                                ? <a className="link" href={href} key={i}>{blog.title}</a>
                                : null;
                        })
                    }
                </div>
                <div className="col col-3">
                    <h2>Uslovi</h2>
                    <a className="link" href="/politika-privatnosti">Politika privatnosti</a>
                    <a className="link" href="/tac">Pravila i uslove</a>
                    <a className="link" href="/cookies">Politika kolačića</a>
                    <a className="link" href="/faq">FAQ - Pitanja</a>
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

export default connect(mapStateToProps)(translate('footerView')(Footer))

