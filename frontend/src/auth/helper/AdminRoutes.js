import React from "react";
import {Outlet, Navigate } from 'react-router-dom';
import {isAuthenticated} from './index'

    // React Router v5 way
// import {Route, Navigate } from 'react-router-dom';
// const AdminRoute = ({ component: Component, ...rest}) => {
//     <Route
//     {...rest}
//     render = {props => isAuthenticated() && isAuthenticated().user.role === 1 ? (
//         <Component {...props} />
//     ) : (
//         <Navigate to='/signin' replace state={props.location}></Navigate>
//     )}
//     ></Route>
// }

    // React Router v6 way
const AdminRoute = () => {
    return isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet /> : <Navigate to='/signin' ></Navigate>
}

export default AdminRoute;
