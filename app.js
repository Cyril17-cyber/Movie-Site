const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.get("/", function(req,res){
    res.sendFile(__dirname + "/landing.html");
});

app.get("/register", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.get("/login", function(req,res){
    res.sendFile(__dirname + "/signin.html")
});

app.get("/home", function(req,res){
    res.sendFile(__dirname + "/home.html")
});

app.get("/action", function(req,res){
    res.sendFile(__dirname + "/action.html")
});

app.get("/animation", function(req,res){
    res.sendFile(__dirname + "/animations.html")
});

app.get("/horror", function(req,res){
    res.sendFile(__dirname + "/horror.html")
});

app.get("/drama", function(req,res){
    res.sendFile(__dirname + "/drama.html")
});

app.get("/annabelle", function(req,res){
    res.sendFile(__dirname + "/anna.html")
});

app.get("/beats", function(req,res){
    res.sendFile(__dirname + "/beats.html")
});

app.get("/code8", function(req,res){
    res.sendFile(__dirname + "/code.html")
});

app.get("/hobbs&shaw", function(req,res){
    res.sendFile(__dirname + "/hobbs.html")
});

app.get("/projectpower", function(req,res){
    res.sendFile(__dirname + "/power.html")
});

app.get("/tenets", function(req,res){
    res.sendFile(__dirname + "/tenets.html")
});

app.get("/glass", function(req,res){
    res.sendFile(__dirname + "/glass.html");
});
app.use(express.static("publlic"));

app.listen(3000, function(){
    console.log("started");
});