import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ping, logout } from '../../../actions/auth';
import i18n from '../../../config/i18n';
import styles from './styles.css';

export class Header extends Component {
    constructor (props) {
        super(props);

        this.state = {
            logoutIsVisible: false,
            menu: 'close',
            languages: [
                {
                    code: "ba-BA",
                    name: "bosnian",
                    flag: "https://lipis.github.io/flag-icon-css/flags/4x3/ba.svg"
                },
                {
                    code: "en-US",
                    name: "english",
                    flag: "https://lipis.github.io/flag-icon-css/flags/4x3/um.svg"
                }
            ]
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.navToggle = this.navToggle.bind(this);
        this.closeMobileMenu = this.closeMobileMenu.bind(this);
        this.renderFlags = this.renderFlags.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.openLanguage = this.openLanguage.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(ping());

        if (window.localStorage.getItem('lang')) {
            console.log(JSON.parse(window.localStorage.getItem('lang')));
            this.updateLanguage(JSON.parse(window.localStorage.getItem('lang')));
        }
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ logoutIsVisible: nextProps.isAuthenticated });
    }

    openLanguage() {
        const picker = document.querySelector('.languagepicker');
        picker.classList.toggle('open');
    }

    updateLanguage(event) {
        const id = event.currentTarget.id;
        const languages = this.state.languages;
        const i = this.state.languages.map(lang => lang.code).indexOf(id);
        const storage = { currentTarget: { id }};
        const stringified = JSON.stringify(storage);
        const objectFound = languages[i];

        if (i === 0) return;

        if (i > 0) {
            languages.splice( i, 1 );
        }

        languages.unshift( objectFound );
        languages.length = Math.min( languages.length, 2 );

        this.setState({ languages }, () => {
            window.localStorage.setItem('lang', stringified);
            i18n.changeLanguage(id);
        });
    }

    renderFlags() {
        const { t } = this.props;

        return this.state.languages.map((item, i) => {
            return (
                <span key={i} onClick={this.updateLanguage} id={item.code}>
                    <li>
                        <div className="flag-wrapper">
                            <img src={item.flag} />
                        </div>
                        {t(`${item.name}`)}
                    </li>
                </span>
            )
        })
    }

    closeMobileMenu () {
        const nav = document.getElementById("topNav");
        const close = document.getElementById("closebtn");
        const header = document.querySelector('.header');
        const menuText = document.querySelector('.menu-text');
        const menuIcon = close.children;

        if (this.props.location.pathname !== '/') return;

        for (let i = 0; i < menuIcon.length; i++){
            menuIcon[i].classList.remove("active");
        }

        this.setState({ menu: 'close' });
        header.classList.remove('show');
        nav.classList.remove('show');
        nav.classList.add('close');
        header.classList.add('close');
        menuText.style.opacity = 1;
    }

    navToggle() {
        const nav = document.getElementById("topNav");
        const close = document.getElementById("closebtn");
        const header = document.querySelector('.header');
        const menuText = document.querySelector('.menu-text');
        const menuIcon = close.children;

        for (let i = 0; i < menuIcon.length; i++){
            menuIcon[i].classList.toggle("active");
        }

        if (this.state.menu === 'close') {
            this.setState({ menu: 'show'});
            header.classList.remove('close');
            nav.classList.remove('close');
            header.classList.add('show');
            nav.classList.add('show');
            menuText.style.opacity = 0;
        } else if (this.state.menu === 'show') {
            this.setState({ menu: 'close'});
            header.classList.remove('show');
            nav.classList.remove('show');
            nav.classList.add('close');
            header.classList.add('close');
            menuText.style.opacity = 1;
        }
};


handleLogout (event) {
        event.preventDefault();
        this.props.dispatch(logout());
    }

    render () {
        const { t } = this.props;
        const headerClass = (this.props.location.pathname === '/admin')
            ? 'header admin-header' : 'header';

        const logoutBtn = (this.props.location.pathname === '/admin')
            ? 'auth-controls is-visible' : 'auth-controls is-hidden';

        const issueHref = typeof window.orientation !== 'undefined' ? '/#usluge-mobile' : '/#usluge';

        return (
            <header className={headerClass}>
                <div className={logoutBtn}>
                    <a className="auth" onClick={this.handleLogout}>Logout</a>
                </div>
                <div className="logo-text">
                    <a href="/kontakt">{ t('contactUs') }</a>
                    <a href="/hitna-pomoc">{ t('emergency') }</a>
                </div>
                <div className="contact">
                    <span>{ t('callUs') } 08.00 - 17.00</span>
                    <span>+387 603 21 22 90 &nbsp;|&nbsp; +387 66 23 60 83</span>
                </div>
                <h1 className="logo">
                    <a href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="411.445" height="101.206" viewBox="0 0 411.445 101.206">
                            <g fill="#BF4D9C">
                                <path d="M353.906 70.17c0 .52-.182.962-.547 1.327-.366.363-.808.547-1.325.547-.52 0-.96-.184-1.326-.547-.366-.365-.548-.807-.548-1.326 0-.517.182-.958.547-1.323s.806-.547 1.325-.547c.518 0 .96.182 1.324.547s.546.806.546 1.324zM358.455 58.636c1.168-.904 2.545-1.357 4.127-1.357.922 0 1.8.18 2.63.54.83.36 1.56.85 2.194 1.47s1.135 1.35 1.504 2.188c.37.838.553 1.732.553 2.682v6.5c0 .387-.135.715-.402.982s-.59.402-.968.402c-.387 0-.715-.135-.982-.402s-.402-.596-.402-.982v-6.5c0-.562-.11-1.094-.328-1.594-.22-.502-.518-.94-.89-1.312s-.812-.67-1.313-.89c-.5-.22-1.033-.33-1.594-.33-.572 0-1.105.108-1.604.323-.497.215-.935.512-1.312.89-.38.378-.676.817-.89 1.32-.216.5-.323 1.03-.323 1.593v6.5c0 .387-.135.715-.402.982s-.592.402-.97.402c-.386 0-.714-.135-.98-.402s-.403-.596-.403-.982V58.663c0-.38.135-.703.402-.977.268-.27.596-.408.982-.408.377 0 .7.137.97.408.266.274.4.59.4.95zM383.898 72.044c-.395 0-.72-.133-.975-.396-.256-.264-.387-.584-.396-.96-.605.474-1.248.817-1.924 1.032-.678.217-1.41.324-2.2.324-.942 0-1.83-.184-2.665-.547-.836-.365-1.564-.86-2.188-1.484-.625-.623-1.12-1.354-1.484-2.188-.365-.836-.547-1.723-.547-2.664v-6.51c0-.38.134-.702.4-.97.27-.27.597-.402.983-.402.377 0 .7.133.97.402.267.268.4.59.4.97v6.51c0 .573.108 1.108.323 1.61.215.5.51.938.883 1.31.374.376.81.67 1.31.886.503.215 1.038.322 1.61.322.56 0 1.094-.107 1.594-.322.502-.217.94-.512 1.318-.89.38-.378.676-.815.89-1.313.216-.496.323-1.03.323-1.602v-6.51c0-.38.135-.702.402-.97.268-.27.596-.402.982-.402.376 0 .7.133.968.402.268.268.402.59.402.97V70.67c0 .377-.135.7-.402.97s-.593.402-.98.402z"/></g><g stroke="#FFF" strokeMiterlimit="10"><path fill="#AEDDF7" strokeWidth=".5" d="M63.257 30.648s67.386-15.35 128.417 18.68C283.01 100.26 386.407 78.672 404.987 76.1c0 0-105.277 4.627-185.787-31.324C138.69 8.83 70.068 28.596 63.257 30.648z"/><path fill="#036096" d="M-4.595 40.04S119.668-7.594 206.45 48.932c74.793 48.71 210.104 33.017 210.104 33.017s-58.002 2.592-119.79-11.527c-18.687-4.27-51.4-11.566-83.895-32.835-90.504-59.25-217.465 2.45-217.465 2.45z"/><path fill="#40A5DC" d="M6.31 42.442s123.614-49.11 210.335 5.41c74.946 47.117 211 39.29 211 39.29s-127.106.515-203.87-45.84C132.045-14.08 6.31 42.443 6.31 42.443z"/></g><g fill="#C14D9C" stroke="#FFF" strokeWidth="3" strokeMiterlimit="10"><path d="M78.632 74.06h-30.02c-.58 0-1.12-.105-1.62-.316-.502-.21-.937-.508-1.306-.89-.37-.382-.66-.825-.87-1.325-.21-.503-.316-1.03-.316-1.583 0-.977.277-1.832.83-2.57L69.814 38.03h-21.2c-1.107 0-2.063-.402-2.867-1.207-.805-.804-1.207-1.786-1.207-2.946 0-1.134.4-2.103 1.206-2.907.804-.804 1.76-1.206 2.867-1.206h30.02c.58 0 1.12.105 1.62.316.5.21.937.508 1.306.89.368.383.665.824.89 1.325.223.5.335 1.028.335 1.582 0 1.08-.33 1.99-.99 2.73l-24.44 29.19H78.63c1.133 0 2.096.4 2.887 1.204s1.186 1.774 1.186 2.91c0 1.16-.396 2.14-1.187 2.944s-1.755 1.206-2.888 1.206zM108.532 29.762c5.247 0 9.874 1.62 13.882 4.865V14.89c0-1.186.39-2.168 1.167-2.945s1.76-1.167 2.948-1.167c1.16 0 2.142.39 2.947 1.167.804.777 1.206 1.76 1.206 2.946v37.02c0 6.17-2.16 11.392-6.485 15.663-4.377 4.324-9.598 6.486-15.662 6.486-6.117 0-11.338-2.163-15.662-6.487-4.324-4.324-6.485-9.545-6.485-15.662s2.162-11.337 6.486-15.662c4.324-4.324 9.545-6.486 15.662-6.486zm13.883 22.15c0-1.9-.363-3.687-1.087-5.36-.726-1.674-1.714-3.145-2.967-4.41s-2.722-2.267-4.41-3.006c-1.687-.737-3.493-1.107-5.417-1.107-1.952 0-3.77.37-5.458 1.106-1.688.74-3.15 1.735-4.39 2.987-1.24 1.252-2.222 2.723-2.947 4.41s-1.087 3.48-1.087 5.38.363 3.69 1.088 5.378 1.707 3.16 2.947 4.41c1.24 1.253 2.703 2.25 4.39 2.987 1.687.738 3.506 1.107 5.458 1.107 1.924 0 3.73-.37 5.418-1.107 1.688-.738 3.158-1.74 4.41-3.006s2.242-2.735 2.968-4.41c.724-1.675 1.087-3.46 1.087-5.36zM145.117 33.875v.79c1.978-1.58 4.126-2.794 6.447-3.638 2.32-.844 4.8-1.266 7.436-1.266 1.16 0 2.406.08 3.737.238s2.558.44 3.68.85c1.12.41 2.05.97 2.787 1.682.738.712 1.107 1.635 1.107 2.77 0 .58-.11 1.12-.335 1.62-.225.502-.52.943-.89 1.325-.37.383-.805.68-1.305.89-.5.212-1.042.316-1.622.316-.5 0-1.082-.144-1.74-.434-1.66-.66-3.467-.99-5.418-.99-1.925 0-3.73.364-5.418 1.09-1.688.725-3.158 1.714-4.41 2.966-1.253 1.252-2.242 2.723-2.967 4.41s-1.087 3.492-1.087 5.418v18.035c0 1.133-.402 2.102-1.207 2.906s-1.772 1.208-2.906 1.208c-1.16 0-2.143-.402-2.947-1.207s-1.206-1.772-1.206-2.905v-36.07c0-1.134.403-2.103 1.207-2.907.804-.804 1.786-1.206 2.947-1.206 1.133 0 2.103.402 2.907 1.206.804.805 1.207 1.774 1.207 2.907zM211.008 69.946v-.79c-1.978 1.58-4.127 2.794-6.447 3.638-2.32.844-4.798 1.266-7.435 1.266-6.117 0-11.338-2.162-15.662-6.486-4.325-4.324-6.486-9.545-6.486-15.662s2.162-11.338 6.486-15.663c4.324-4.325 9.545-6.487 15.662-6.487 6.064 0 11.285 2.162 15.662 6.486 4.324 4.323 6.486 9.544 6.486 15.662v18.035c0 1.133-.402 2.102-1.206 2.906-.805.805-1.773 1.207-2.907 1.207-1.16 0-2.143-.402-2.946-1.207-.804-.805-1.206-1.774-1.206-2.907zm-13.882-31.918c-1.952 0-3.77.37-5.458 1.107-1.688.74-3.15 1.735-4.39 2.987-1.24 1.252-2.222 2.723-2.947 4.41s-1.086 3.48-1.086 5.38.362 3.69 1.087 5.378 1.708 3.158 2.948 4.41c1.24 1.252 2.703 2.248 4.39 2.986 1.687.738 3.506 1.107 5.458 1.107 1.924 0 3.73-.37 5.418-1.107 1.687-.738 3.157-1.74 4.41-3.006s2.24-2.736 2.967-4.41c.726-1.676 1.088-3.46 1.088-5.36s-.363-3.685-1.087-5.358c-.725-1.674-1.713-3.145-2.966-4.41s-2.723-2.267-4.41-3.006c-1.687-.738-3.494-1.108-5.418-1.108zM243.756 74.06c-1.74 0-2.953-.738-3.64-2.215L223.43 35.537c-.212-.554-.316-1.107-.316-1.66s.104-1.082.316-1.583c.21-.5.5-.942.87-1.325.368-.383.804-.68 1.305-.89s1.042-.317 1.622-.317c.71 0 1.396.178 2.057.534.658.355 1.172.863 1.542 1.522l12.933 28.2 12.895-28.162c.764-1.396 1.965-2.096 3.6-2.096.58 0 1.12.105 1.62.316.5.21.937.508 1.306.89.37.383.666.824.89 1.325.224.5.337 1.028.337 1.582 0 .606-.12 1.16-.355 1.66l-16.652 36.31c-.742 1.476-1.955 2.215-3.642 2.215zM270.215 69.946V14.93c0-1.16.39-2.142 1.168-2.946.777-.804 1.76-1.206 2.945-1.206 1.188 0 2.17.402 2.947 1.206.777.805 1.166 1.787 1.166 2.946v50.864h1.9c1.134 0 2.103.4 2.907 1.205.803.804 1.205 1.786 1.205 2.946 0 1.133-.402 2.102-1.205 2.906-.805.805-1.773 1.207-2.908 1.207h-6.052c-1.135 0-2.096-.403-2.887-1.208s-1.185-1.773-1.185-2.906zM303.44 33.915v39.948c0 2.61-.51 5.074-1.524 7.395-1.016 2.32-2.393 4.352-4.133 6.092s-3.77 3.117-6.092 4.133c-2.32 1.014-4.784 1.523-7.394 1.523-1.188 0-2.17-.396-2.947-1.188s-1.167-1.78-1.167-2.967c0-1.185.39-2.167 1.166-2.944.776-.78 1.76-1.168 2.946-1.168 1.502 0 2.912-.283 4.23-.85 1.318-.568 2.473-1.346 3.46-2.334s1.774-2.143 2.355-3.46.872-2.73.872-4.23v-39.95c0-1.158.4-2.14 1.205-2.945.805-.805 1.773-1.207 2.908-1.207 1.133 0 2.102.402 2.906 1.206.807.803 1.21 1.785 1.21 2.945zm.75-12.024c0 1.347-.476 2.493-1.425 3.442s-2.096 1.424-3.44 1.424c-1.345 0-2.49-.475-3.44-1.424s-1.424-2.096-1.424-3.44c0-1.345.476-2.492 1.425-3.44s2.096-1.425 3.44-1.425c1.345 0 2.49.475 3.44 1.424s1.424 2.097 1.424 3.44zM343.188 61.6c1.186 0 2.168.39 2.945 1.167.777.78 1.168 1.762 1.168 2.947 0 1.16-.395 2.148-1.187 2.967-4.086 3.587-8.912 5.38-14.475 5.38-6.117 0-11.338-2.162-15.662-6.486s-6.486-9.545-6.486-15.662 2.162-11.338 6.486-15.663 9.545-6.487 15.662-6.487c6.064 0 11.285 2.162 15.662 6.486 2.162 2.135 3.783 4.515 4.865 7.138 1.08 2.623 1.62 5.465 1.62 8.523 0 1.187-.4 2.17-1.206 2.946-.806.78-1.788 1.168-2.946 1.168H318.31c.447 1.45 1.107 2.775 1.977 3.975.87 1.198 1.893 2.228 3.064 3.083 1.175.857 2.468 1.523 3.878 1.998s2.88.714 4.41.714c1.74 0 3.334-.264 4.785-.79 1.45-.528 2.795-1.32 4.035-2.374.792-.66 1.7-1.002 2.73-1.03zm1.78-13.802c-.45-1.45-1.114-2.775-2-3.975-.882-1.2-1.91-2.23-3.083-3.086-1.174-.856-2.467-1.522-3.877-1.997s-2.867-.713-4.37-.713c-1.503 0-2.966.238-4.39.713s-2.73 1.14-3.916 1.997c-1.186.857-2.215 1.885-3.084 3.086-.87 1.2-1.518 2.523-1.938 3.975h26.657z"/>
                        </g>
                        </svg>
                    </a>
                </h1>
                <nav className="main-menu">
                    <a href={issueHref}>{ t('services') }</a>
                    <a href="/#cijene">{ t('prices') }</a>
                    <a href="/#kakoradi">{ t('howWork') }</a>
                    <a href="/#kosmomi">{ t('whoAreWe')}</a>
                    <a href="/blogovi">{ t('blog') }</a>
                </nav>
                <div id="topNav" className="navigation">
                    <span id="closebtn" onClick={this.navToggle}>
                        <span className="line1" />
                        <span className="line2" />
                        <span className="line3" />
                        <span className="menu-text">{ t('menu') }</span>
                    </span>
                    <ul className="menulist">
                        <li><a onClick={this.closeMobileMenu} className="menuitems" href={issueHref}>{ t('services') }</a></li>
                        <li><a onClick={this.closeMobileMenu} className="menuitems" href="/#cijene">{ t('prices') }</a></li>
                        <li><a onClick={this.closeMobileMenu} className="menuitems" href="/#kakoradi">{ t('howWork') }</a></li>
                        <li><a onClick={this.closeMobileMenu} className="menuitems" href="/#kosmomi">{ t('whoAreWe')}</a></li>
                        <li><a className="menuitems" href="/blogovi">{ t('blog') }</a></li>
                    </ul>
                </div>
                <div className="language">
                    <ul onClick={this.openLanguage} className="languagepicker roundborders large">
                        {this.renderFlags()}
                    </ul>
                </div>
            </header>
        )
    }
}

Header.propTypes = { dispatch: PropTypes.func };

const mapStateToProps = (state) => ({
    credentials: state.auth.credentials,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(translate('headerView')(Header))

