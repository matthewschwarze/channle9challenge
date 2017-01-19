//Developed By: Matthew Schwarze
//Purpose: filters JSON packet
//Date: 19/01/2017

module.exports = {
	decode: function (req, res, next){
		var data = req.body.payload; //store the data in
		if(data == "" || data == null){ 
			return res.status(400).json({error: "Could not decode request: JSON parsing failed"}); //empty
		}
		else{
			var extractedResult = extractJSONData(data); //extract json data
			var filteredResult = filterJSONData(extractedResult); //filter json data
			return res.status(200).json({response: filteredResult});
		}
		
	}
}

function extractJSONData(data){
	var arrayOfExtractedData = [];
	for (var entry in data){ //for each element 
		arrayOfExtractedData.push(data[entry]); //add show
	}
	return arrayOfExtractedData; // each element should be a show, unless json format changes
}

function filterJSONData(data){
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