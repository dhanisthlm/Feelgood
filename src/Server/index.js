import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n';
import { createStore } from 'redux'
import ReactDOMServer from 'react-dom/server';
import templateFn from './template';
import App from '../components/App';
import reducers from '../reducers';

const store = createStore(reducers);
const url = require('url');

export default (request, reply) => {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App location={request.url} />
          </I18nextProvider>
      </Provider>
    );
    const template = templateFn(html);
    return template;
};