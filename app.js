const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const port = 3000;
app.use(cookieparser());

app.get("/", (req, res) => {
    res.send("root dir");
});

app.get("/setCookie", (req, res) => {
    res.cookie("name", "onkar");
    res.cookie("age", 18);
    res.send("cookie sent");
});

app.get("/getCookie", (req, res) => {
    var value = req.cookies;
    console.log(value);
    res.send("hello");
});

app.listen(port, () => {
    console.log("Listening on port:" + port);
});