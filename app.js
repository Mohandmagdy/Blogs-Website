const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://honda:baba@cluster0.ggicybj.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
        console.log('connected');
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.render('home');
})
app.use('/blogs', blogRoutes);




