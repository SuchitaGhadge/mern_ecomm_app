import React from 'react'
import Navbar from './Navbar'
export default function Base({
    title = "My title",
    description = "My description",
    className = "bg-inherit text-white p-4",
    children
}) {
  return (
    <section>
        <Navbar />
        <section className='container'>
            <div className="jumbotron bg-inherit text-white text-center">
                <h2 className='text-5xl py-3'>{title}</h2>
                <p className='lead'>{description}</p>
            </div>
            <main className={className}>{children}</main>
        </section>
        <footer className='footer bg-inherit mt-auto py-3'>
            <div className="container bg-green-700 text-white text-center">
                <h4>If you got any questions, feel free to reach out!</h4>
                <button className='py-1.5 px-2 mt-1 text-black border border-transparent bg-yellow-500'>Contact Us</button>
            </div>
            <div className="container mx-auto">
                <span className='text-slate-500'>An amazing <span className='text-white'>MERN</span> bootcamp</span>
            </div>
        </footer>
    </section>
  )
}
