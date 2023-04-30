import { API } from '../../backend'


export const signup = user => {
    console.log("user in signup", user)
    return fetch(`${API}signup`, {
        method: "POST",
        headers: {
            ACCEPT: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => console.error("signup err", err))
}

export const signin = user => {
    return fetch(`${API}signin`, {
        method: "POST",
        headers: {
            ACCEPT: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => console.error("signup err", err))
}

export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}signout`, {
            method: "GET"
        })
        .then(response => console.log("Signout success"))
        .catch(err => console.error("signout error", err))
    }
}

export const isAuthenticated = () => {
    if(typeof window == 'undefined') false;

    if(localStorage.getItem("jwt")) JSON.parse(localStorage.getItem("jwt"))
    else false
} 