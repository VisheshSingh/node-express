const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect("mongodb://localhost/nodekb", { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
    console.log('MongoDB Connected...');
})

db.on('error', (err) => {
    console.log(err);
})

let Articles = require('./models/article');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get("/", (req, res) => {
    Articles.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {

            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    })
})

app.get("/articles/add", (req, res) => {
    res.render('add', {
        title: 'Add Articles'
    });
})

app.get("/article/:id", (req, res) => {
    Articles.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            res.render('article', {
                article: article
            })
        }
    })
})

app.post('/articles/add', (req, res) => {
    let article = new Articles();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})
app.listen(5000, () => console.log('serving on port 5000...'))