import React from 'react';
import _ from 'lodash';
import {Switch, Route} from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';
import NotFound from './components/error/NotFound';
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Bot from './components/bot/Bot';
import Intent from './components/bot/intent/Intent';

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
            path: "/bot",
            component: Bot,
            authorise: false
        },
        {
            name: "bot.intent",
            path: "/bot/intent",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.intent.sample",
            path: "/bot/intent/sample",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.entity",
            path: "/bot/entity",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.inbox",
            path: "/bot/inbox",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.knowledge",
            path: "/bot/knowledge",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.integration",
            path: "/bot/integration",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.training",
            path: "/bot/training",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.rating",
            path: "/bot/rating",
            component: Intent,
            authorise: false
        },
        {
            name: "bot.customer",
            path: "/bot/customer",
            component: Intent,
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
        Object.keys(params).filter((key) => path = path.replace(`:${key}`, params[key]));
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