import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const changeHandler = (event) => {
    setError(false)
    setName(event.target.value)
  }

  const onClose = () => {
    setError(false);
    setSuccess(false)
  }

  const errorMessage = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-1/2 px-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"
            style={{display: error ? "" : "none"}}
    >
        <span className="font-bold">Failed to create category</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
    </div></div>
        </div>
    )
  }

  const successMessage = () => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="w-1/2 px-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"
        style={{display: success ? "" : "none"}}
    >
        <span className="font-bold">Category created successsfully</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
            onClick={onClose}
            /></svg>
        </span>
    </div></div>
        </div>
    )
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false)
    setSuccess(false)

    // backend request
    createCategory(user._id, token, {name})
    .then(data => {
      // console.log("category data ", data)
      if(data.error){
        setError(true)
      }else{
        setError(false)
        setSuccess(true)
        setName("")
      }
    })
    .catch()
  }
  
  const myCategoryForm = () => (
    <form className="mx-auto">
      <div className="w-9/12 mx-auto px-12 py-4" >
        <p className="pb-2 text-base text-semibold">Enter the Category</p>
        <input
          type="text"
          className="block w-full rounded border border-solid border-cyan-600  bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-cyan-600 dark:text-neutral-200"
          autoFocus
          required
          placeholder="For Ex. Summer"
          onChange={changeHandler}
          value={name}
        />
        <button className="my-2 px-4 py-2 border border-cyan-600 focus:outline-none focus:ring focus:border-none  text-cyan-600 rounded" onClick={onSubmit}>Create Category</button>
      </div>
    </form>
  );

  const goToDashboard = () => (
    <div className="px-2 pt-5">
        <Link to='/admin/dashboard' className="bg-gray-600 text-sm px-4 py-2 text-white border border-transparent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-700 duration-300">
        Admin Home
      </Link>
       
    </div>
  )

  return (
    <Base
      title="Create Category here"
      description="Add a new category for products"
      className="w-8/12 mx-auto px-4 bg-cyan-600 p-8"
    >
      <div className="bg-white">
      {goToDashboard()}
      {successMessage()}
      {errorMessage()}
      {myCategoryForm()}
      </div>
    </Base>
  );
}
