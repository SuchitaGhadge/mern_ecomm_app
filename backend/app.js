
// to generate secret key
// console.log(require('crypto').randomBytes(256).toString('base64'))

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect("mongodb://localhost:27017/ecomm", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED")
}).catch((err) => {
    console.log(`DB CONNECTION FAILED WITH ${err}`)
});

const port = 8000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});