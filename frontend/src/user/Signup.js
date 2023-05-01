import React, { useState } from 'react'
import Base from '../core/Base'
import  { signup }  from '../auth/helper';
import { Link } from 'react-router-dom';


export default function Signup() {


    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const { name, lastname, email, password, error, success } = values
    
    // field will set name, email and password in Values Object
    const handleChange = field => event => {
        setValues({...values, error: false, [field]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        signup({name, lastname, email, password})
        .then(data => {
            return data.json()
        })
        .then(res => {
            console.log("response", res)
            if(res.errors){
                const {msg} = res.errors[0]
                console.log("error msg", msg)
                setValues({...values, error: msg, success: false})
            }else{
                setValues({
                ...values,
                name: "",
                lastname: "",
                email: "",
                password: "",
                error: "",
                success: true
                })
            }
        })
        .catch(err => console.error("error in signup", err))
    }

    const signUpForm = () => {
        return (
            <div className='flex items-center justify-center w-full'>
                <div className='w-1/2 p-6 rounded-md'>
                    <form >
                        <div className='w-full mt-3'>
                            <label className='block text-base mb-2'>Name</label>
                            <input type="text" id='name' className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Enter name'
                            value={name}
                            onChange={handleChange("name")}
                            />
                        </div>
                        <div className='w-full mt-3'>
                        <label className='block text-base mb-2'>Last Name</label>
                        <input type="text" id='lastname' className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Enter lastname'
                        value={lastname}
                        onChange={handleChange("lastname")}
                        />
                    </div>
                        <div className='mt-3'>
                            <label className='block text-base mb-2'>Email</label>
                            <input type="email" id='email' className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Enter email'
                            value={email}
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div>
                            <label className='block text-base mb-2'>Password</label>
                            <input type="password" className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Enter password'
                            value={password}
                            onChange={handleChange("password")}
                            />
                        </div>
                        <button className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={onSubmit}
                        >Submit</button>
                        <h4 className="text-center">{JSON.stringify(values)}</h4>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return (
            <div className="flex items-center justify-center w-full">
                <div className="w-1/2 px-6">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"
                style={{display: success? "" : "none"}}
                >
                    <span className="px-1">New account was created successfully.</span>
                    <span className="block sm:inline">Please <Link className='font-bold' to="/signin">Login here</Link></span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
                </div>
            </div>
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

  return (
    <Base title='Sign up page' description='A page for User to sign up!'>
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
    </Base>
  )
}
