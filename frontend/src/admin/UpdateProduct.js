import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getProduct, UpdateAProduct, getCategories } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'
import { useParams } from "react-router-dom";

export default function UpdateProduct() {
    const { productId } = useParams()
    const {user, token} = isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        price:"",
        stock: "" ,
        photo: "",
        categories: [],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect:false,
        formData:"",
    })

    const {name, description, price, stock, categories, category, loading, error, createdProduct, getRedirect, formData} = values

    const preload = (productId) => {
        getProduct(productId).then(data => {
            if(data.error){
                setValues({
                    ...values,
                    error: data.error
                })
            }else{
                preloadCategories()
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData()
                })
    
            }

        })
    }

    const preloadCategories =  () => {
        console.log("calling preload categories")
        getCategories().then(data => {
            console.log("categories", data);
            if(data.error){
                setValues({
                    ...values,
                    error: data.error
                })
            }else{
                setValues({
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
        preload(productId)
    }, [])


    const handleChange = name => event => {
      console.log("event.target.file[0]", event.target.files)
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({
            ...values,
            [name]:value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setValues({
          ...values,
          error:"",
          loading:true
        })

        UpdateAProduct(productId, user._id, token, formData)
        .then(data => {
          if(data.error){
            setValues({...values, error:data.error})
          }else{
            setValues({
              ...values,
              name:"",
              description:"",
              price:"",
              stock:"",
              photo:"",
              loading:false,
              createdProduct:data.name,
              category:""
            })
          }
        })
        .catch(err => console.error("error"))
    } 

    const successMessage = () => {
      return (
        <div className="flex items-center justify-center w-full">
          <div className="w-1/2 px-6">
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
              style={{ display: createdProduct ? "block" : "none" }}
            >
              <span className="font-bold">{createdProduct} updated successsfully</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      );
    };

    const updateProductForm = () => (
        <form className='mx-auto'>
            <div className="w-9/12 mx-auto px-12 py-4">
            <span className='text-white text-base'>Post photo</span>
            <div className="w-full text-center bg-green-600 p-2 rounded-sm text-white">
              <label>
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  name="photo"
                  accept="image"
                  placeholder="choose a file"
                />
              </label>
            </div>
            <div className="my-2">
              <input
                onChange={handleChange("name")}
                name="photo"
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-white-600"
                placeholder="Name"
                value={name}
              />
            </div>
            <div className="my-2">
              <textarea
                onChange={handleChange("description")}
                name="photo"
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-white-600"
                placeholder="Description"
                value={description}
              />
            </div>
            <div className="my-2">
              <input
                onChange={handleChange("price")}
                type="number"
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-white-600"
                placeholder="Price"
                value={price}
              />
            </div>
            <div className="my-2">
              <select
                onChange={handleChange("category")}
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-white-600"
                placeholder="Category"
              >
                <option>Select</option>
                {categories && categories.map(cate => (<option key={cate._id} value={cate._id}>{cate.name}</option>))}
              </select>
            </div>
            <div className="my-2">
              <input
                onChange={handleChange("stock")}
                type="number"
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700 focus:outline-none focus:ring dark:border-white-600"
                placeholder="stock"
                value={stock}
              />
            </div>
      
            <button
              type="submit"
              onClick={onSubmit}
              className="my-2 px-4 py-2 border border-green-600 focus:outline-none focus:ring focus:border-none  text-green-600 rounded mb-3"
            >
              Update Product
            </button>
            </div>
          
        </form>
      );
    
      const errorMessage = () => {
        return (
          <div className="flex items-center justify-center w-full">
            <div className="w-1/2 px-6">
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
                style={{ display: error ? "" : "none" }}
              >
                <span className="font-bold">Failed to update {createdProduct}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        );
      };

  return (
    <Base title='Update a Product here!' description='Welcome to product  supdationection' className='w-8/12 mx-auto rounded bg-cyan-600 p-4'>
    {successMessage()}
    {errorMessage()}
    <div className='pt-3'>
        <Link to='/admin/dashboard' className="mt-2 bg-gray-600 text-sm px-4 py-2 text-white border border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
        Admin Home
        </Link>
    </div>
    <div className='bg-gray-700 p-4 rounded mt-5 mb-1'>
        {updateProductForm()}
    </div>
    </Base>

  )
}
