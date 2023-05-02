import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        
        { /* React Router v5 way */}
       {/* <PrivateRoute path='/user/dashboard' element={<UserDashBoard />}></PrivateRoute>
  <AdminRoute path='/admin/dashboard' element={<AdminDashBoard />}></AdminRoute> */}

  { /* React Router v6 way */}
        <Route path='/user/dashboard' element={<PrivateRoute />}>
          <Route path='/user/dashboard' element={<UserDashBoard />} />
        </Route>
        <Route path='/admin/dashboard' element={<AdminRoute />} >
        <Route path='/admin/dashboard' element={<AdminDashBoard />} /></Route>
      </Routes>
    </BrowserRouter>
  )
}
