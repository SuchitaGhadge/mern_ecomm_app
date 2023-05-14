import {API} from '../../backend'

// Category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "Applcation/json",
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }
    )
    .then(res => {
        return res.json()
    })
    .catch(err => console.error("err in post category", err))
}

// get all categories
export const getCategories = () => {
    return fetch(`${API}categories`, {
        method:"GET"
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("Error in get all categories"))
}

// product calls
export const createProduct = (userId, token, product) => {
    return fetch(`${API}product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "Application/josn",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("Error in create product", err))
}

// get all products
export const getProducts = () => {
    return fetch(`${API}products`, {
        method:"GET"
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("error in get all products", err))
}

// delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "Application/josn",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("Error in delete product", err))
}


// get a product
export const getProduct = (productId) => {
    return fetch(`${API}product/${productId}`,{
        method: "GET"
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("error in get product", err))
}

// update a product
export const UpdateAProduct = (productId, userId, token, product) => {
    return fetch(`${API}product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "Application/josn",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res => {        
        return  res.json()
    })
    .catch(err => console.error("Error in update product", err))
}
