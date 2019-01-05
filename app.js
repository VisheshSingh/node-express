const express = require('express');
const path = require('path');

const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get("/", (req, res) => {
    let articles = [
        {
            id: 1,
            title: 'Article one',
            author: 'Mr X',
            body: 'This is body one'
        },
        {
            id: 2,
            title: 'Article two',
            author: 'Mr Y',
            body: 'This is body two'
        },
        {
            id: 3,
            title: 'Article three',
            author: 'Mr Z',
            body: 'This is body three'
        }
    ]
    res.render('index', {
        title: 'Articles',
        articles: articles
    });
})

app.get("/articles/add", (req, res) => {
    res.render('add', {
        title: 'Add Articles'
    });
})

app.listen(5000, () => console.log('serving on port 5000...'))