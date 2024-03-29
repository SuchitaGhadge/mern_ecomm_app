
// to generate secret key
// console.log(require('crypto').randomBytes(256).toString('base64'))

const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
// console.log("process",process.env)

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
}).catch((err) => {
    console.log(`DB CONNECTION FAILED WITH ${err}`)
});

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)

// PORT
const port = process.env.PORT || 8000;


// Starting a server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

