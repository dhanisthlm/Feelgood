import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import Main from './components/Main';

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);
import styles from './styles.css';

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
          <Route path='/main' component={Main}/>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
