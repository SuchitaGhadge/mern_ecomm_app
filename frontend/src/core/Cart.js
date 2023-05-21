import React, { useState, useEffect } from 'react'
import { API } from '../backend'
import "../styles.css"
import Base from './Base'
import Card from './reusableComponents/Card'
import { loadCart } from './helper/cartHelper'

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
      setProducts(loadCart())
    }, [reload])
    
    
    const loadAllProducts = () => {
        return(
            <section>
                <h2>This section is to load products </h2>
                {products.map((product, index) => (
                    <Card key={index} 
                    product={product}
                    addToCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                     />
                ))}
            </section>
        )
    }

    const loadCheckout = () => {
        return(
            <section>
                <h2>This section is for checkout</h2>
            </section>
        )
    }

  return (
    <Base title='Cart page' description='Ready to checkout' className='text-white'>
          <div className='grid grid-cols-2 gap-10 '>
            {loadAllProducts()}
            {loadCheckout()}
          </div>
    </Base>

  )
}
