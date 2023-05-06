import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { CreateCategory } from "./helper/adminapicall";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [Success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const changeHandler = (event) => {
    setError(false)
    setName(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setError(false)
    setSuccess(false)

    // backend request
    CreateCategory(user._id, token, {name})
    .then(data => {
      console.log("category data ", data)
      if(data.error){
        setError(true)
      }else{
        setError(false)
        setSuccess(true)
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
          className="block w-full rounded border border-solid border-cyan-600  bg-clip-padding px-3 py-[0.25rem] ext-base font-normal leading-[1.6] text-neutral-700 outline-none focus:border-none focus:text-neutral-700  focus:outline-none focus:ring dark:border-cyan-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
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
    <div className="p-2">
        <Link to='/admin/dashboard' className="mt-2 text-sm p-2 text-cyan-600 outline-none border-none hover:text-cyan-500">
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
      {myCategoryForm()}
      </div>
    </Base>
  );
}
