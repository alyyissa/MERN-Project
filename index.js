require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

const Article = require("./models/Article");

mongoose.connect(process.env.DB_URL1)
.then( () => {
    console.log("Connected to database successfully");
}).catch( (err) => {
    console.error("Error connecting to Database",err);
});

app.get("/hello", (req, res) => {
    res.send("hello welcome user 1");
});

app.get("/", (req, res) => {
    res.send("Welcome to the nodejs project");
});

app.get("/home",(req, res) => {
    res.send("Welcome to the home page");
})

app.post("/addComment", (req,res) => {
    res.send("Comment added succesfully");
});

app.get("/numbers", (req,res) => {
    let numbers = 0;
    for (let i=0; i<100; i++){
        numbers += i + " - ";
    }
    res.send(` the numbers are: ${numbers} `);
});

app.delete("/deleteComment", (req,res) => {
    res.send("Delete Comment");
});

app.get("/findSum/:num1/:num2", (req, res)=> {
    let sum = Number(req.params.num1) + Number(req.params.num2);
    res.send(`${sum}`);
});

app.get("/sayHello", (req, res)=> {
    console.log(req.body);
    console.log(req.query)
    res.send("Hello " + `${req.body.name}` + " age: " + `${req.body.age}`);
})

app.listen(3000,() => {
    console.log("I am listening in port 3000");
});