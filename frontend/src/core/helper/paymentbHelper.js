import { API } from "../../backend";

export const getMeToken = (userId, token) => {
return fetch(`${API}/payment/gettoken/${userId}`, {
    method:"GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}).then(response => {
    return response.json()
}).catch(err =>  console.error("error in getMEToken", err))
}

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}payment/braintree/${userId}`, {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentInfo)

    }).then(response => {
        return response.json()
    }).catch(err => console.error("Error in process Payment FE", err))
}