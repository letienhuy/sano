import React from 'react';
import _ from 'lodash';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import NotFound from './components/errors/NotFound';
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Bot from './components/bots/Bot';

const routes = {
    public: [
        {
            name: "login",
            path: "/login",
            component: Login,
            authorise: false
        },
    ],
    private: [
        {
            name: "bot",
            path: "/bots",
            component: Bot,
            authorise: false
        },
        {
            name: "analytic",
            path: "/analytics",
            component: Home,
            authorise: false
        },
        {
            name: "home",
            path: "/",
            component: Home,
            authorise: false
        }
    ]
}
export function MapRoutes(){
    return (
        <Switch>
            {
                routes.private.map((route, key) => {
                    return <PrivateRoute
                        key={route.path}
                        exact
                        path={route.path}
                        component={route.component}/>;
                })
            }
            {
                routes.public.map((route, key) => {
                    return <Route
                        key={key}
                        exact
                        path={route.path}
                        component={route.component}/>;
                })
            }
            <Route component={NotFound}/>
        </Switch>
    )
}

export function route(name, params = null) {
    const route = _.find(routes.public.concat(routes.private), (obj) => {
        return obj.name === name;
    });
    let path = '';
    if(route){
        path = route.path;
    }else{
        throw ('Not route found with name: ', name);
    }
    if(params && typeof params === "object"){
        Object.keys(params).filter((key) => {
            path = path.replace(`:${key}`, params[key]);
        });
    }
    return path;
}

export function setActive(routeName, routeParams){
    let url = window.location.pathname;
    let routePath = route(routeName, routeParams);
    if(routePath === url){
        return 'active';
    }else{
        routePath = routePath.replace('/', '');
        url = url.replace('/', '').split('/');
        if(url.includes(routePath))
            return 'active';
    }

}


export default routes;