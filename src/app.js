const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middelware morgan
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); // entender datos que recibe el servidor desde el formulario

app.use('/', indexRoutes);


mongoose.connect('mongodb://localhost/db-crud')
    .then(db => console.log('Base conectada'))
    .catch(err=> console.log(err));

app.listen(3000, function(){
    console.log("Servidor cargado en el puerto 3000");
});