import React from 'react'
import { API } from '../../backend'

export default function ImageHelper({product}) {
  console.log("from img", product)
    const imageURL = product? `${API}product/photo/${product._id}` : 'https://wallpapercave.com/wp/wp1884055.jpg'

    console.log("image url", imageURL)
  return (
    <img
    className="w-full object-cover"
    src={imageURL}
    alt="photo"
  />
  )
}
