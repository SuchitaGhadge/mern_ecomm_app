import React from "react";
import ImageHelper from "../helper/ImageHelper";

export default function Card({product,
addToCart = true, removeFromCart = false,
}) {

  const cardTitle = product? product.name : "A random tshirt photo"
  const cardDescription = product? product.description : "A random tshirt photo from internet"
  const cardPrice = product? product.price : "10"
  console.log("product in card", product)
  const showAddToCart = (addToCart) => {
    return (
      addToCart && (<button className="block text-base w-full border border-green-500 text-green-500 my-3 hover:bg-green-500 hover:text-white transition ease-out duration-500">Add to Cart</button>)
    )
  }

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (<button className="block text-base w-full border border-red-400 text-red-400 my-3 hover:bg-red-500 hover:text-white transition ease-out duration-500">Remove from Cart</button>)
    )
  }  

  return (
    <div className="card">
      <ImageHelper product={product} />
      <div className="m-4">
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
