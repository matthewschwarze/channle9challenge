

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

app.use(function (error, req, res, next) { //check for bad json
  if (error instanceof SyntaxError) {
     return res.status(400).json({error: "Could not decode request: JSON parsing failed"}); //bad json
  } else {
    next();
  }
});
// use morgan to log requests to the console
app.use(morgan('dev'));

var routes = require('./routes');
app.use('/', routes);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Hello i am running on: ' + port);


    