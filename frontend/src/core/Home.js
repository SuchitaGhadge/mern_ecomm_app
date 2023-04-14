import React from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'

export default function Home() {
  console.log("API is...", API)
  return (
    <Base title='Home page' className='text-white underline font-bold' >Hello frontend</Base>
  )
}
