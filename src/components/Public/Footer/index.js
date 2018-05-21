import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { translate } from 'react-i18next';
import { getBlogs } from '../../../actions/blog';
import i18n from '../../../config/i18n';
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
        const locale = this.state.locale || i18n.language;

        /*
         <div>
            <img src="/images/twitter.svg" />
            <span className="label">Twitter</span>
         </div>
         <div>
            <img src="/images/youtube.svg" />
            <span className="label">Youtube</span>
         </div>
         <div>
            <img src="/images/instagram.svg" />
            <span className="label">Instagram</span>
         </div>
         */

        return (
            <footer className="footer">
                <div className="col col-1">
                    <h2>{ t('aboutWord') } zdravlje.nu</h2>
                    <p>{ t('about') }</p>
                    <div className="address">
                        <p><span className="heading">{ t('address') }:</span> Baunad doo Tuzla, Zdravlje.nu, Maršala Tita 109, 75000 Tuzla, Bosna i Hercegovina</p>
                    </div>
                    <div className="share-mobile">
                        <div>
                            <a target="blank" href="https://www.facebook.com/zdravljenu-158721211521168" className="label">
                                <img src="/images/facebook.svg" />
                            </a>
                        </div>
                        <div>
                            <a target="blank" href="skype:info@zdravlje.nu?call" className="label">
                                <img src="/images/skype.svg" />
                            </a>
                        </div>
                        <div>
                            <a target="blank" href="mailto:info@zdravlje.nu" className="label">
                                <img src="/images/email.png" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col col-2">
                    <h2>{ t('blog') }</h2>
                    {
                        /*
                        this.props.blogs.map((blog, i) => {
                            const href = `/blogovi#${blog.hash}`;
                            return (i < 6)
                                ? <Link className="link" to={href} key={i}>{blog.title[locale]}</Link>
                                : null;
                        })
                        */
                    }
                </div>
                <div className="col col-3">
                    <h2>{ t('conditions') }</h2>
                    <Link className="link" to="/politika-privatnosti">{ t('privacyPolicy') }</Link>
                    <Link className="link" to="/tac">{ t('tac') }</Link>
                    <Link className="link" to="/cookies">{ t('cookiePolicy') }</Link>
                    <Link className="link" to="/faq">FAQ - { t('questions') }</Link>
                    <Link className="link" to="/kontakt">{ t('customerService') }</Link>
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

