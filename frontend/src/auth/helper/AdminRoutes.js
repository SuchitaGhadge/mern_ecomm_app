import React from "react";
import {Route, Navigate } from 'react-router-dom';
import {isAuthenticated} from './index'

const AdminRoute = ({ component: Component, ...rest}) => {
    <Route
    {...rest}
    render = {props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
        <Component {...props} />
    ) : (
        <Navigate to='/signin' replace state={props.location}></Navigate>
    )}
    ></Route>
}

export default AdminRoute;
