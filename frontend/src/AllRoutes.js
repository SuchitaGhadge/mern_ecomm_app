import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import Cart from './core/Cart'

export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/cart' element={<Cart />} />
        
        { /* React Router v5 way */}
       {/* <PrivateRoute path='/user/dashboard' element={<UserDashBoard />}></PrivateRoute>
  <AdminRoute path='/admin/dashboard' element={<AdminDashBoard />}></AdminRoute> */}

  { /* React Router v6 way */}
        <Route path='/user' element={<PrivateRoute />}>
          <Route path='dashboard' element={<UserDashBoard />} />
        </Route>
        <Route path='/admin' element={<AdminRoute />} >
        <Route path='dashboard' element={<AdminDashBoard />} />
        <Route path='create/category' exact element={<AddCategory />} />
        <Route path='categories' exact element={<ManageCategories />} />
        <Route path='create/product' exact element={<AddProduct />} />
        <Route path='products' exact element={<ManageProducts />} />
        <Route path='product/update/:productId' exact element={<UpdateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
