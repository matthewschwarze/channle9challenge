//Developed By: Matthew Schwarze
//Purpose: filters JSON packet
//Date: 19/01/2017
// =======================
// routes ================
// =======================
// basic route

var router = express.Router();
var decode = require('./routes/decode');   	 
	router.route('').post(decode.decode); 
	
	router.use(function(req, res, next) {
		return res.status(400).json({error: "Invalid Request"});
	});
module.exports = router;

