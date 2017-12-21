import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import store from './store';
import i18n from './config/i18n';
import { requireAuth } from './routes';
import App from './components/App';
import Admin from './components/Private/Encounter';
import Checkout from './components/Public/Checkout';
import Login from './components/Private/Login';
import Blog from './components/Public/Blog';
import CustomerCare from './components/Public/CustomerCare';
import PrivacyPolicy from './components/Public/PrivacyPolicy';
import Faq from './components/Public/Faq';
import Tac from './components/Public/Tac';
import Cookies from './components/Public/Cookies';
import Emergency from './components/Public/Emergency';
import { hashLinkScroll } from '../helpers/hashLinkScroll';
import styles from './styles.css';

render((
  <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory} onUpdate={() => { window.scrollTo(0, 0); hashLinkScroll()} }>
          <Route path="/anka" component={App}>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/admin' onEnter={requireAuth} component={Admin}/>
              <Route path="/login" component={Login} />
              <Route path="/blogovi" component={Blog} />
              <Route path="/kontakt" component={CustomerCare} />
              <Route path="/politika-privatnosti" component={PrivacyPolicy} />
              <Route path="/faq" component={Faq} />
              <Route path="/tac" component={Tac} />
              <Route path="/cookies" component={Cookies} />
              <Route path="/hitna-pomoc" component={Emergency} />
          </Route>
        </Router>
      </I18nextProvider>
  </Provider>
), document.getElementById('root'));
