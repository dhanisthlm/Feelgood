import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import { syncHistory } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Admin from './components/Admin';
import Checkout from './components/Public/Checkout';
import { hashLinkScroll } from '../helpers/hashLinkScroll';
import { StripeProvider } from 'react-stripe-elements';

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
import styles from './styles.css';

render((
  <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory} onUpdate={hashLinkScroll}>
          <Route path="/anka" component={App}>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/admin' component={Admin}/>
          </Route>
        </Router>
      </I18nextProvider>
  </Provider>
), document.getElementById('root'));
