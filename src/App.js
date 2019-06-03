import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { MapRoutes } from './routes';

class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <MapRoutes/>
            </Router>
        )
    }
}

export default App;
