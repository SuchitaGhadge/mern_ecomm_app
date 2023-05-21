import React, { useState } from "react";
import ImageHelper from "../helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "../helper/cartHelper";
import { Navigate } from "react-router-dom";

// function(f){return f} === f => fs
export default function Card({product,
addToCart = true, removeFromCart = false, setReload = f => f, reload = undefined
}) {

  const cardTitle = product? product.name : "A random tshirt photo"
  const cardDescription = product? product.description : "A random tshirt photo from internet"
  const cardPrice = product? product.price : "10"

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)
  const addToCartFunction = () => {
    addItemToCart(product, () => {
      setRedirect(true)})
      // getRedirect(redirect)
  }

  const getRedirect = redirect => {
    console.log("check run...")
    if(redirect){
      console.log("check run redirect...")
      return <Navigate to='/cart' />
    }
  }

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (<button className="block text-base w-full border border-green-500 text-green-500 my-3 hover:bg-green-500 hover:text-white transition ease-out duration-500" onClick={addToCartFunction}>Add to Cart</button>)
    )
  }

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (<button className="block text-base w-full border border-red-400 text-red-400 my-3 hover:bg-red-500 hover:text-white transition ease-out duration-500" 
      onClick={() => {
        removeItemFromCart(product._id)
        setReload(!reload)
      }
      } >Remove from Cart</button>)
    )
  }  

  return (
    <div className="card">
      <ImageHelper product={product} />
      <div className="m-4">
      {getRedirect(redirect)}
        <span className="block font-bold text-lg py-1 capitalize">{cardTitle}</span> 
        <span className="block text-base py-1 mb-3">{cardDescription}</span> 
        <span className="px-6 py-1 rounded bg-green-500 text-sm">$ {cardPrice}</span>
      </div>
      <div className="m-4">
        {showAddToCart(addToCart)}
        {showRemoveFromCart(removeFromCart)}
        
      </div>
    </div>
  );
}
