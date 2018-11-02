const express = require('express');
const app = express();

const data = require('./data.json');

app.use('/static', express.static('public'));
app.use('/img', express.static('img'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { data });
});
// sets About route
app.get('/about', (req, res) => {
    res.render('about', { data });
});
// sets a dynamic projects route
app.get('/projects:id', (req, res) => {
    res.render('project', {
        data : data, // passes data into the 'project' ... locals
        id : req.params.id // passes id into the dynamic 'project' page ...locals 
    });
});

// Error Handling
app.use((req, res, next) => {
    const err = new Error('Oh no!  You hit a snag in the Matrix!');
    console.log(err)
    err.status = 400;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Server listener
app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});