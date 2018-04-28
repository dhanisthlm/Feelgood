import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
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
                            <img src="/images/facebook.svg" />
                            <span className="label">Facebook</span>
                        </div>
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
                        <div>
                            <img src="/images/skype.svg" />
                            <span className="label">Skype</span>
                        </div>
                    </div>
                </div>
                <div className="col col-2">
                    <h2>{ t('blog') }</h2>
                    {
                        this.props.blogs.map((blog, i) => {
                            const href = `/blogovi#${blog.hash}`;
                            return (i < 6)
                                ? <a className="link" href={href} key={i}>{blog.title[locale]}</a>
                                : null;
                        })
                    }
                </div>
                <div className="col col-3">
                    <h2>{ t('conditions') }</h2>
                    <a className="link" href="/politika-privatnosti">{ t('privacyPolicy') }</a>
                    <a className="link" href="/tac">{ t('tac') }</a>
                    <a className="link" href="/cookies">{ t('cookiePolicy') }</a>
                    <a className="link" href="/faq">FAQ - { t('questions') }</a>
                    <a className="link" href="/kontakt">{ t('customerService') }</a>
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

