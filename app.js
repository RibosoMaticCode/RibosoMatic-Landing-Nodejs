const express = require('express'); // crear un servidor web
const morgan = require('morgan'); // registro de peticiones al servidor por consola
const exphbs = require('express-handlebars'); // manejador de plantilla
const path = require('path'); // maneja rutas de archivos/directorio

// init
const app = express();

// settings
app.set('views', path.join(__dirname, 'src/views'));
app.engine( '.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join( app.get('views'), 'layouts'),
    partialsDir: path.join( app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(require('./src/routes'));

/// public
app.use(express.static(path.join(__dirname, 'public')));

const host = '127.0.0.1'; //opcional

// start server
app.listen('4000', host, () =>{
    console.log('servidor funcionando');
})