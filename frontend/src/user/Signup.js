import React, { useState } from 'react'
import Base from '../core/Base'
import { signup } from '../auth/helper';


export default function Signup() {

    const { name, email, password, error, success } = values
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    // field will set name, email and password in Values Object
    const handleChange = field => event => {
        setValues({...values, error: false, [field]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else{
                setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true
                })
            }
        })
        .catch(
            console.error("error in signup")
        )
    }

    const signUpForm = () => {
        return (
            <div className='flex items-center justify-center w-full'>
                <div className='w-1/2 p-6 rounded-md'>
                    <form >
                        <div className='w-full mt-3'>
                            <label className='block text-base mb-2'>Name</label>
                            <input type="text" id='name' className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter name'
                            onChange={handleChange("name")}
                            />
                        </div>
                        <div className='mt-3'>
                            <label className='block text-base mb-2'>Email</label>
                            <input type="email" id='email' className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter email'
                            onChange={handleChange("email")}
                            />
                        </div>
                        <div>
                            <label className='block text-base mb-2'>Password</label>
                            <input type="password" className='border rounded-sm w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter password'
                            onChange={handleChange("password")}
                            />
                        </div>
                        <button className="mt-3 w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
  return (
    <Base title='Sign up page' description='A page for User to sign up!'>
        {signUpForm()}
    </Base>
  )
}
