import React, { useState } from "react";
import Base from "../core/Base";

import {signin, authenticate, isAuthenticated} from "../auth/helper"
import {  Navigate  } from "react-router-dom";
// Navigate replaces Redirect in React-Router-6
export default function Signin() {

    const [values, setValues] = useState({
        email:"",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    });

  const {email, password, error, loading, didRedirect} = values;
  const {user} = isAuthenticated();

     // field will set name, email and password in Values Object
  const handleChange = field => event => {
    setValues({...values, error: false, [field]: event.target.value });
  }

  const loadingMessage = () => {
    return (
        loading && (
          <div className="flex items-center justify-center w-full">
            <div className="w-1/2 px-6">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert"
            >
            <span className="px-1">Loading...</span>
            </div>
            </div>
        </div>
        )
    )
}

const errorMessage = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-1/2 px-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
    style={{display: error ? "" : "none"}}
    >
        <span className="font-bold">{error}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
    </div></div>
        </div>
    )
}

const onSubmit = event => {
  event.preventDefault();
  setValues({
    ...values,
    error: false,
    loading: true
  })
  signin({email, password})
  .then(data => {
    console.log("data", data)
    if(data.errors){
      const {msg} = data.errors[0]
      console.log("err msg", msg)
      setValues({...values, error: msg, loading: false})
      return
    }

    if(data.error){
      console.log("error", data.error)
      setValues({
        ...values, error: data.error, loading: false
      })
    }else{
      console.log("in success", data)
      authenticate(data, () => {
        setValues({
          ...values,
          didRedirect: true
        })
      })
      console.log("values", values)
    }
  })
  .catch(console.error("Signin request failed"))
}

const performRedirect = () => {
  console.log("inside redirect", didRedirect)
  if(didRedirect){
    if(user && user.role === 1){
      return <Navigate to='/admin/dashboard' />
    }else{
      return <Navigate to='/user/dashboard' />
    }
  }
  if(isAuthenticated()){
    return <Navigate to="/"></Navigate>
  }
}

  const signInForm = () => {
    return (
        <div className='flex items-center justify-center w-full'>
            <div className='w-1/2 p-6 rounded-md'>
                <form >
                    <div className='mt-3'>
                        <label className='block text-base mb-2'>Email</label>
                        <input type="email" id='email' className='text-slate-700 border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter email'
                        value={email}
                        onChange={handleChange("email")}
                        required
                        />
                    </div>
                    <div>
                        <label className='block text-base mb-2'>Password</label>
                        <input type="password" className='text-slate-700 border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter password'
                        value={password}
                        onChange={handleChange("password")}
                        required
                        />
                    </div>
                    <button className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" onClick={onSubmit} >Submit</button>
                </form>
            </div>
        </div>
    )
}

  return (
    <Base title="Sign in page" description="A page for User to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
}
