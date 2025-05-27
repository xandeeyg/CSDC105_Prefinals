const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const app = express(); // express app

// connect to mongodb
const dbURI = 'mongodb+srv://prefinals:1234@cluster0.nkia0ce.mongodb.net/prefinals?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000)) // listen for requests
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public')); // to look in public folder
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

////////////
// routes //
////////////

// index page
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});

// middleware - getting request and sending response