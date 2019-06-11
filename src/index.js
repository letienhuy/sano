import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './assets/font.css';
import 'simplebar/dist/simplebar.css';
import './assets/fontawesome.min.css';
import './assets/app.scss';
import './helpers/helper';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
