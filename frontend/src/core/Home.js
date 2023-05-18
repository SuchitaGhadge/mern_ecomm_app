import React from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './reusableComponents/Card'

export default function Home() {
  return (
    <Base title='Home page' description='Welcome to the Tshirt store' className='text-white font-bold'>
      <div className='grid lg:grid-cols-3 gap-10'>
        <Card />
        <Card />
      </div>
    </Base>

  )
}
