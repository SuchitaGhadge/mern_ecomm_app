import React, {Fragment} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper';

export default function Navbar() {
  const navigate = useNavigate()
  return (
        <header className='bg-dark mt-2'>
            <nav className='flex justify-center items-center w-[92%]'>
                <ul className='flex items-center gap-[4vw]'>
                    <li>
                        <NavLink  style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }} to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/cart'>Cart</NavLink>
                    </li>
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                      <li>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/user/dashboard'>Dashboard</NavLink>
                    </li>
                    )}
                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                      <li>
                        <NavLink style={({ isActive }) => {
                            return {
                              color: isActive ? "green" : "white"
                            };
                          }}  to='/admin/dashboard'>Admin Dashboard</NavLink>
                    </li>
                    )}
                    {!isAuthenticated() && (
                      <Fragment>
                      <li>
                          <NavLink style={({ isActive }) => {
                              return {
                                color: isActive ? "green" : "white"
                              };
                            }}  to='/signup'>Sign Up</NavLink>
                      </li>
                      <li>
                          <NavLink style={({ isActive }) => {
                              return {
                                color: isActive ? "green" : "white"
                              };
                            }}  to='/signin'>Sign In</NavLink>
                      </li>
                      </Fragment>
                    )}
                    {isAuthenticated() && (
                      <li>
                      <span className='text-yellow-500 hover:text-yellow-400 hover:font-semibold'
                      onClick={() => {
                        signout(() => {
                          navigate('/')
                        })
                      }}
                      >
                          Signout
                        </span>
                    </li>
                    )}
                </ul>
            </nav>
        </header>
  )
}
