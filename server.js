var express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');
var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;

   fs.appendFile('server.log', log +'\n');
   console.log(log);
   next();
});

app.use((req, res, next) => {
    res.render('maint.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcome: 'Welcome on my page! Good day!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcome: 'Welcome on my page! Good day!',
    });
});


app.get('/bad', (req, res) =>{
   res.send({
       errorMessege: 'Some error been heppen'
   })
});

app.listen(port, ()=>{
    console.log('Server running on port ', port);
});











































