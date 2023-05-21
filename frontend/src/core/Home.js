import React, { useState, useEffect } from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './reusableComponents/Card'
import { getProducts } from './helper/coreapicalls'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    getProducts().then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProducts(data)
      }
    })
  }

  return (
    <Base title='Home page' description='Welcome to the Tshirt store' className='text-white'>
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 '>
            {products.map((product, index) => {
              return (
                <Card key={index} product={product} />
              )
            })}
          </div>
    </Base>

  )
}
