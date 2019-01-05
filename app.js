const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost/nodekb");
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

app.listen(5000, () => console.log('serving on port 5000...'))