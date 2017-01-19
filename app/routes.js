//Developed By: Matthew Schwarze
//Purpose: filters JSON packet
//Date: 19/01/2017
// =======================
// routes ================
// =======================
// basic route
var router = express.Router();
var decode = require('./routes/decode');

	router.route('/decode').post(decode.decode); 
	
	router.use(function(req, res, next) {
		console.log("bad");
		return res.status(400).json({error: "Incorrect request, should be a post"});
	});
module.exports = router;