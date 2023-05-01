import React from "react";
import {Route, Navigate } from 'react-router-dom';
import {isAuthenticated} from './index'

const PrivateRoute = ({ component: Component, ...rest}) => {
    <Route
    {...rest}
    render = {props => isAuthenticated()? (
        <Component {...props} />
    ) : (
        <Navigate to='/signin' replace state={props.location}></Navigate>
    )}
    ></Route>
}

export default PrivateRoute;
