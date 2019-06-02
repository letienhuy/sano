import _ from 'lodash';
import Home from "./components/Home";
import Login from "./components/auth/Login";

export function route(name) {
    const route = _.find(routes, (obj) => {
        return obj.name === name;
    });
    return route.path;
}

const routes = [
    {
        name: "login",
        path: "/login",
        exact: true,
        component: Login,
        private: false,
        authorise: false
    },
    {
        name: "bot",
        path: "/bot",
        exact: true,
        component: Home,
        private: true,
        authorise: false
    },
    {
        name: "home",
        path: "/",
        exact: true,
        component: Home,
        private: true,
        authorise: false
    }
];

export default routes;