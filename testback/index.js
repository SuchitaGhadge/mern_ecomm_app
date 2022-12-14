const express = require('express');
const app = express();

const port = 8000;
app.get("/", (req, res) => res.send("Home page"));

app.get("/login", (req, res) => res.send("you are visiting login route"));

app.get('/logout', (req, res) => res.send("You are visiting logout route"));

app.get("/signup", (req, res) => res.send('you are visiting signup route'));

app.listen(port, () => console.log(`Server is up and running at port ${port}`));