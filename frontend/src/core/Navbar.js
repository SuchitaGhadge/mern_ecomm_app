import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
        <header className='bg-dark'>
            <nav className='flex justify-center items-center w-[92%]'>
                <ul className='flex items-center gap-[4vw]'>
                    <li className='hover:text-gray-500'>
                        <NavLink  style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }} to='/'>Home</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/cart'>Cart</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/user/dashboard'>Dashboard</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/admin/dashboard'>Admin Dashboard</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/signup'>Sign Up</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/signin'>Sign In</NavLink>
                    </li>
                    <li className='hover:text-gray-500'>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }} to='/signout'>Sign Out</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
  )
}
