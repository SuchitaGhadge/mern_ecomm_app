import React, { useState } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getProducts } from './helper/adminapicall';
import { useEffect } from 'react';

export default function ManageProducts() {

  const {user, token} = isAuthenticated()
  const [products, setProducts] = useState([])

  const preload = () => {
    getProducts().then(data => {
      if(data.error){
        console.error("error in preload product", data.error)
      }else{
        setProducts(data)
      }
    })
  }

  const deleteMyProduct = (productId) => {
    deleteProduct(productId, user._id, token).then(data => {
      if(data.error){
        console.error('error in delete produt', data.error)
      }else{
        preload()
      }
    })
  }

  useEffect(() => {
    preload()
    // return () => {
    //   cleanup code
    // }
  }, [])

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
      <div className="col-12">
        <h2 className="text-center text-white my-3">Total {products.length} products</h2>

      </div>
      </div>
      {products.map((product, index) => {
        return (

              <div key={index}  className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="p-2 m-2 bg-green-600 text-white rounded">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => deleteMyProduct(product._id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
              </div>

        )
      })}
    </Base>
  )
}
