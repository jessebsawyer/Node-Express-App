// Require Variables
const express = require('express');
const dotenv = require('dotenv');
const data = require('./data.json').data;

// Load env Variable
dotenv.config({path: './config/config.env'});

// Load express
const app = express();

// Load JSON File
const projects = data.projects;

// Load Static CSS & JS Files
app.use('/static', express.static('public'));

// Set View Engine to Pug
app.set('view engine', 'pug');

// Set Routes
app.get('/', (req, res) => {
    res.render('index', {images: projects});
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/project/:id', (req, res) => {
    res.render('project', {project: projects[req.params.id], tech: projects[req.params.id].technologies});
})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    console.log(`This page does not exist: ${err.status} ${err.message}`);
    res.render('error');
})

// Listen in Port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 