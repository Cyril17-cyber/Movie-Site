require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

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
    password: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
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
    userId = [];
    res.sendFile(__dirname + "/landing.html");
});

app.get('/t&c', function(req, res){
    res.render('terms');
});

app.route("/register")
.get(function(req, res){
    userId = [];
    res.render('signup', {message: "Create Account"});
})
.post(upload.single('image'), (req, res, next) => {

    const name = _.upperFirst(req.body.name);
    const username = _.upperFirst(req.body.userName);
    const email = _.lowerFirst(req.body.email);
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
 
        var obj = {
            name: name,
            username: username,
            email: email,
            password: password,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        user.create(obj, (err, item) => {
            if (err) {
                res.render('signup', {message: "Try again!"});
            }
            else {
                if(password === passwordConfirmation){
                    item.save();
                    res.redirect('/login');
                } else {
                    res.send('There was an error creating your account. Please try again');
                }
            }
        }); 


});

app.route('/login')
.get(function(req, res){
    userId = [];
    res.render('signin', {message: "Login"});
})
.post(function(req, res){
    const email = _.lowerFirst(req.body.email);
    const password = req.body.password;

    user.findOne({ email: email }, (err, items) => {
        if (!items) {
            res.render('signin', {message: "Try again!"});
        }
        else {
                if(items.password === password){
                    userId.push(items);
                    res.redirect('/home');
                } else {
                    res.render('signin', {message: "Try again!"});
                }
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
                    res.render('home', { items: items, title: 'All', userId: userId, css: categoriesCss});
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
                res.render('categories', { items: items, title: upperCase, userId: userId, css: "/app/scss/home.css"});
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
                res.render('movies', { items: items, userId: userId, css: movieCss});
            }
        });
    }
});

app.get('/settings', function(req, res){
    if(userId.length === 0){
        res.redirect('/login');
    } else {
        res.render('settings', { title: 'Settings', userId: userId, css: categoriesCss});
    }
});

app.route('/update/email')
.get(function(req, res){
    if(userId.length === 0){
        res.redirect('/login');
    } else {
        res.render('update', {title: 'email', message: 'Update Email'});
    }
})
.post(function(req, res){
    const email = _.lowerFirst(req.body.email);
    const password = req.body.password;
    userId.forEach(element => {
        const name = element.name
        user.findOne({ name: name }, function(err, items){
        console.log(items);
        bcrypt.compare(password, items.password, function(error, result){
            if(result === true){
                userId = [];
                const oldEmail = items.email;
                user.updateOne({ email: oldEmail}, {email: email}, function(failed){
                    if(!failed){
                        user.findOne({ email: email }, function(none, foundItems){
                            userId.push(foundItems);
                            res.redirect('/settings');
                        });
                    }
                });
            } else {
                res.render('update', {message: "Try again!", title: 'email'});
            };
        });
    });
    }); 
});


app.route('/update/username')
.get(function(req, res){
    if(userId.length === 0){
        res.redirect('/login');
    } else {
        res.render('update', {title: 'username', message: 'Update Username!'});
    }
})
.post(function(req, res){
    const username = _.upperFirst(req.body.username);
    const password = req.body.password;

    userId.forEach(element => {
        const name = element.name;
        user.findOne({ name: name }, function(err, items){
            bcrypt.compare(password, items.password, function(error, result){
                if(result === true){
                    userId = [];
                    const oldusername = items.username;
                    user.updateOne({ username: oldusername}, {username: username}, function(failed){
                        if(!failed){
                            user.findOne({ username: username }, function(none, foundItems){
                                userId.push(foundItems);
                                res.redirect('/settings');
                            });
                        }
                    });
                } else {
                    res.render('update', {message: "Try again!", title: 'username',});
                };
            });
        });
    });
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
