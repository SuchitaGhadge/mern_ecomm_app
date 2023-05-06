import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const {
  user: { name, email, role },
} = isAuthenticated();

const adminLeftSide = () => {
  return (
    <div className="md:w-1/5 w-full rounded bg-white overflow-hidden shadow-lg">
      <div>
        <h4 className="font-bold text-center bg-gray-700 text-white text-xl py-4">
          Admin Navigation
        </h4>
        <div className="text-left">
          <ul className="bg-white">
            <li className="pl-6 py-3 border border-gray-300">
              <Link
                to="/admin/create/category"
                className="text-green-600 hover:text-green-700 "
              >
                Create Category
              </Link>
            </li>
            <li className="pl-6 py-3 border border-gray-300">
              <Link
                to="/admin/categories"
                className="text-green-600 hover:text-green-700 "
              >
                Manage Category
              </Link>
            </li>
            <li className="pl-6 py-3 border border-gray-300">
              <Link
                to="/admin/create/product"
                className=" text-green-600 hover:text-green-700"
              >
                Create products
              </Link>
            </li>
            <li className="pl-6 py-3 border border-gray-300">
              <Link
                to="/admin/products"
                className=" text-green-600 hover:text-green-700"
              >
                Manage products
              </Link>
            </li>
            <li className="pl-6 py-3 border border-gray-300">
              <Link
                to="/admin/orders"
                className=" text-green-600 hover:text-green-700"
              >
                Manage Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const adminRightSide = () => {
  return (
    <div className="md:w-4/5 w-full rounded overflow-hidden shadow-lg bg-white">
      <div>
        <h4 className="font-bold px-6 py-4 text-xl  bg-gray-200">Admin Information</h4>
        <ul className="bg-white">
          <li className="pl-6 py-3 border border-gray-300">
            <p className="text-gray-700 text-base">
              <span className="inline-block bg-green-700 rounded-lg px-4 text-sm leading-6 font-semibold text-white mr-2 mb-2">
                Name :
              </span>
              <span className="text-lg capitalize">{name}</span>
            </p>
          </li>
          <li className="pl-6 py-3 border border-gray-300">
            <p className="text-gray-700 text-base">
              <span className="inline-block bg-green-700 rounded-lg px-4 text-sm leading-6 font-semibold text-white mr-2 mb-2">
                Email :
              </span>
              <span className="text-lg">{email}</span>
            </p>
          </li>
          <li className="pl-6 py-3 border border-gray-300">
          <p className="text-gray-700 text-base">
            <span className="inline-block bg-red-700 rounded-lg px-4 text-sm leading-6 font-semibold text-white mr-2 mb-2">
                Admin Area
            </span>
          </p>
        </li>
        </ul>
      </div>
    </div>
  );
};

const AdminDashBoard = () => {
  return (
    <Base
      title="Admin DashBoard page"
      description="Manage all your products here"
      className="w-8/12 mx-auto px-4 flex gap-4 bg-green-700 p-8"
    >
      {adminLeftSide()}
      {adminRightSide()}
    </Base>
  );
};

export default AdminDashBoard;
