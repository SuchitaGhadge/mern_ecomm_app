import { API } from '../../backend'


export const signup = user => {
    return fetch(`${API}signup`, {
        method: "POST",
        headers: {
            "ACCEPT": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => console.error("signup err", err))
}