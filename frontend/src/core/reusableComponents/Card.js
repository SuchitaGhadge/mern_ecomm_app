import React from "react";

export default function Card() {
  return (
    <div className="card">
      <img
        class="w-full object-cover"
        src="https://tse1.mm.bing.net/th?id=OIP.fBe1gguUHhEyZuradl-J6QHaEX&pid=Api&P=0&h=180"
        alt="Kebabs"
      />
      <div className="m-4">
        <span className="block font-bold text-base py-1 mb-3">The Coldest Sunset</span>
        <span className="px-6 py-1 rounded bg-green-500">$ 5</span>
      </div>
      <div className="m-4">
        <button className="block text-base w-full border border-green-500 text-green-500 my-3">Add to Cart</button>
        <button className="block text-base w-full border border-red-400 text-red-400 my-3">Remove from Cart</button>
      </div>
    </div>
  );
}
