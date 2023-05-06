import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getCategories } from './helper/adminapicall'

export default function AddProduct() {

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
        formData:""
    })

    const {name, description, price, stock, categories, category, loading, error, createdProduct, getRedirect, formData} = values

    const preload = () => {
        getCategories().then(data => {
            console.log("preload data", data)
            if(data.error){
                setValues({
                    ...values,
                    error: data.error
                })
            }else{
                setValues({
                    ...values,
                    categories: [...data],
                    formData: new FormData()
                })
                // marked as bug
                console.log("categories...", categories)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const handleChange = name => event => {
        // 
    }

    const onSubmit = (event) => {
        event.preventDefault();
    } 

    const createProductForm = () => (
        <form className='mx-auto'>
            <div className="w-9/12 mx-auto px-12 py-4">
            <span className='text-white text-base'>Post photo</span>
            <div className="w-full text-center bg-green-600 p-2 rounded rounded-sm text-white">
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
                <option value="a">a</option>
                <option value="b">b</option>
              </select>
            </div>
            <div className="my-2">
              <input
                onChange={handleChange("quantity")}
                type="number"
                className="block w-full rounded border border-solid border-white-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700 focus:outline-none focus:ring dark:border-white-600"
                placeholder="Quantity"
                value={stock}
              />
            </div>
      
            <button
              type="submit"
              onClick={onSubmit}
              className="my-2 px-4 py-2 border border-green-600 focus:outline-none focus:ring focus:border-none  text-green-600 rounded mb-3"
            >
              Create Product
            </button>
            </div>
          
        </form>
      );
    

  return (
    <Base title='Add a Product here!' description='Welcome to product creation section' className='w-8/12 mx-auto rounded bg-cyan-600 p-4'>
    <div className='pt-3'>
        <Link to='/admin/dashboard' className="mt-2 bg-gray-600 text-sm px-4 py-2 text-white border border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
        Admin Home
        </Link>
    </div>
    <div className='bg-gray-700 p-4 rounded mt-5 mb-1'>
        {createProductForm()}
    </div>
    </Base>

  )
}
