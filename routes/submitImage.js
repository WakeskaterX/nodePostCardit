
/*
	GET/POST take image and return a postcard image
*/

var fs = require('fs');
var pci = require('../models/postCardit');

exports.submitImage = function(req, res){
	//First get image from request, then modify image and return the new image
	var imageData = req.body.data;
	var imageName = req.body.name;
	var imageType = req.body.mimetype;
	//console.log(imageType);

	//write our binary image data to the server and save the file
	fs.writeFile('public/imageData/' + imageName,imageData,"binary", function(err){
		if (err) {
			res.status(500).send('Error with Server!');
		} else {
			pci.cardit(finish,imageName);
		}
		
	});

	//return the path to the new public image as a stringified JSON object
	var finish = function(err, imageName){
		if (err) {
			console.dir(err);
			res.status(500).send('Error with Server!' + err.toString());
		} else {
			res.status(200).send('{\"path\":\"imageData/'+imageName+'\"}');
		}
	};
};