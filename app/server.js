

// =======================
//Developed By: Matthew Schwarze
//Purpose: filters JSON packet
//Date: 19/01/2017

// get the packages we need ============
// =======================
express     = require('express');
app         = express();
bodyParser  = require('body-parser');
morgan      = require('morgan');
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

var routes = require('./routes');
app.use('/api/v1', routes);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Hello i am running on: ' + port);
