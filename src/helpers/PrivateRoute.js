import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({
    path,
    component: Component,
    authorise,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) => (
            localStorage.getItem('accessToken') && localStorage.getItem('user')
                ? <Component {...props}/>
                : <Redirect to="/login"/>
        )}/>
);

export default PrivateRoute;