
// to generate secret key
// console.log(require('crypto').randomBytes(256).toString('base64'))

const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// console.log("process",process.env)


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
}).catch((err) => {
    console.log(`DB CONNECTION FAILED WITH ${err}`)
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());