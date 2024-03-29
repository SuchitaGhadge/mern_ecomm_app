import { API } from '../../backend'


export const signup = user => {
    console.log("user in signup", user)
    return fetch(`${API}signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    // .then(response => response.json())
    // .catch(err => console.error("signup err", err))
}

export const signin = user => {
    return fetch(`${API}signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
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
    if(typeof window == 'undefined'){
        return false;
    };

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    } 
} 