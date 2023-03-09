const express = require('express');
const app = express();

const port = 8000;

const admin = (req, res) => res.send("this is Admin Dashboard")

// middleware
const isAdmin = (req, res, next) => {
    console.log("is admin is running");
    next();
}

const isLoggedIn = (req, res, next) => {
    console.log("is loggedIn is running");
    next();
}

// end
app.get("/", (req, res) => res.send("Home page"));

app.get("/login", (req, res) => res.send("you are visiting login route"));

app.get('/logout', (req, res) => res.send("You are visiting logout route"));

app.get("/signup", (req, res) => res.send('you are visiting signup route'));

app.get("/admin", isLoggedIn, isAdmin, admin);

app.listen(port, () => console.log(`Server is up and running at port ${port}`));