import React from "react";

import {isAuthenticated} from './index'
import {Outlet, Navigate } from 'react-router-dom';

    // React Router v5 way
// import {Route, Navigate } from 'react-router-dom';
// const PrivateRoute = ({ component: Component, ...rest}) => {
//     <Route
//     {...rest}
//     render = {props => isAuthenticated()? (
//         <Component {...props} />
//     ) : (
//         <Navigate to='/signin' replace state={props.location}></Navigate>
//     )}
//     ></Route>
// }

    // React Router v6 way
const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to='/signin' ></Navigate>
}

export default PrivateRoute;
