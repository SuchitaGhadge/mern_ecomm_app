import React from 'react'
import Base from '../core/Base'


export default function Signup() {
    const signUpForm = () => {
        return (
            <div className='flex items-center justify-center'>
                <div className='grid grid-rows-3 grid-col-6 gap-0'>
                    <form >
                        <div className='col-span-6 p-3'>
                            <label >Name</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label >Email</label>
                            <input type="email" />
                        </div>
                        <div>
                            <label >Password</label>
                            <input type="password" />
                        </div>
                        <button className="w-[100%] bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
  return (
    <Base title='Sign up page' description='A page for User to sign up!'>
        <h1 className='text-3xl'>Sign up works</h1>
        {signUpForm()}
    </Base>
  )
}
