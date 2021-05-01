require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Set EJS as templating engine
app.set("view engine", "ejs");


let userId = [];


const mongoUrl = process.env.MONGOURL;

mongoose.connect(mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });
    mongoose.set('useCreateIndex', true);

    const movieCss = "/app/scss/movie.css";
    const categoriesCss = "app/scss/home.css";


    const movieSchema = new mongoose.Schema({
        name: String,
        category: String,
        type: String,
        rating: String,
        snvl: String,
        trailer: String,
        download: String,
        description: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    });

    
   const movie = new mongoose.model('Movie', movieSchema);

   const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String
});

const user = new mongoose.model('User', userSchema);


const multer = require('multer');
const { forEach } = require('lodash');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({ storage: storage });

app.get("/", function(req,res){
    userId.length = 0;
    res.sendFile(__dirname + "/landing.html");
});

app.get('/t&c', function(req, res){
    res.render('terms');
});

app.route("/register")
.get(function(req, res){
    userId.length = 0;
    res.render('signup', {message: "Create Account"});
})
.post(upload.single('image'), (req, res, next) => {

    const Firstname = _.upperFirst(req.body.firstname);
    const Lastname = _.upperFirst(req.body.lastname);
    const name = Firstname + " " + Lastname;
    const email = _.lowerFirst(req.body.email);
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
 
        bcrypt.hash(password, saltRounds, function(err, hash){
            const person = new user ({
                name: name,
                username: Firstname,
                email: email,
                password: hash
            });
                    if(password === passwordConfirmation){
                        person.save();
                        res.redirect('/login');
                    } else {
                        res.render('signup', {message: "An error Occured. Please try again"});
                    }
        });

});

app.route('/login')
.get(function(req, res){
    userId.length = 0;
    res.render('signin', {message: "Login"});
})
.post(function(req, res){
    const email = _.lowerFirst(req.body.email);
    const password = req.body.password;

    user.findOne({ email: email }, (err, items) => {
        if (!items) {
            res.render('signin', {message: "Your record does not exist. please signup or put in the email you used while registering"});
        }
        else {
                bcrypt.compare(password, items.password, function(err, response){
                        if(response === true){
                            userId.push(email);
                            res.redirect('/home');
                        } else {
                            res.render('signin', {message: "Incorrect password. Please try again"});
                        }
                });
        }
    });
});

app.get('/home', function(req, res){
    if(userId.length === 0){
        res.redirect('/login');
    } else {

        if(req.query.search){
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');

            movie.find({name: regex}, (err, items) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred', err);
                }
                else {
                    res.render('home', { items: items, title: 'All', css: categoriesCss});
                }
            });
        } else {
            movie.find({}, (err, items) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('An error occurred', err);
                }
                else {
                    res.render('home', { items: items, title: 'All', userId: userId, css: categoriesCss});
                }
            });
        }
    }
});

app.get('/home/:category', function(req, res){
    const category = req.params.category;
    const upperCase = _.upperFirst(req.params.category);

    if(userId.length === 0){
        res.redirect('/login');
    } else {
        movie.find({category: category}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('categories', { items: items, title: upperCase, css: "/app/scss/home.css"});
            }
        });
    }
});

app.get('/:category/movie/:moviename', function(req, res){
    const movieName = req.params.moviename;
    if(userId.length === 0){
        res.redirect('/login');
    } else {
        movie.findOne({name: movieName}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('movies', { items: items, css: movieCss});
            }
        });
    }
});


app.get('/about', function(req, res){
    if(userId.length === 0){
        res.redirect('/login');
    } else {
        res.sendFile(__dirname + '/about.html');
    }
});

app.get('/contacts', function(req, res){
    if(userId.length === 0){
        res.redirect('/login')
    } else {
        res.sendFile(__dirname + '/contact.html');
    }
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

let port = process.env.PORT;

app.listen(port || 3000, err => {
    if (err)
        throw err
    console.log('Server listening on port ' + port)
});
