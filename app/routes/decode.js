//Developed By: Matthew Schwarze
//Purpose: filters JSON packet
//Date: 19/01/2017

module.exports = {

	decode: function (req, res, next){
		var data = req.body.payload; //store the data, relies on the fact that payload will be in the request at root
		if(data == "" || data == null){ 
			return res.status(400).json({error: "Could not decode request: JSON parsing failed"}); //empty
		}
		else{
			var filteredResult = module.exports.filterJSONData(data); //filter json data
			return res.status(200).json({response: filteredResult});
		}	
	},
	filterJSONData: function(data){
		var filteredJSONData = [];
		for (var entry in data){ //for each show
			var drm = "";
			var episodeCount = "";
			drm = data[entry].drm;
			episodeCount = data[entry].episodeCount;
			if (drm && episodeCount > 0){ //is drm and episode count > 0
				var tmp;
				tmp = ({ //build json structure
							image: data[entry].image.showImage, 
							slug: data[entry].slug,
							title: data[entry].title
							});
		 		filteredJSONData.push(tmp);
		 	}
		}	
		return filteredJSONData; //return filtered json
	}
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}