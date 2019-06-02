import React, {Component} from 'react';
import {Switch, BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import PrivateRoute from './helpers/PrivateRoute';
import routes from './routes';
import NotFound from './components/errors/NotFound';

class App extends Component {

    mapRoutes = () => {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    {
                        routes.map((route, key) => {
                            if (route.private) 
                                return <PrivateRoute
                                    key={route.path}
                                    exact={route.exact}
                                    path={route.path}
                                    component={route.component}
                                    authorise={route.authorise}/>
                            return <Route
                                key={key}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}/>;
                        })
                    }
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
    render() {
        return (<this.mapRoutes/>)
    }
}

export default App;
