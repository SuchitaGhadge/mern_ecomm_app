import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
export default function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}
