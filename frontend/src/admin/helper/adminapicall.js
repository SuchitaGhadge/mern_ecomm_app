import {API} from '../../backend'

export const CreateCategory = (userId, token, category) => {
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