//Post Cardit Model
//Functionality:  Takes an image, adds another image to the top-right corner and returns that image in the result

var gm = require('gm').subClass({imageMagick:true});

exports.cardit = function(callback,imageName){
	var imagePath = 'public/imageData/'+imageName;
	var stampPath = 'public/imageData/postalStamp.jpg';
	var stampPath2 = 'public/imageData/ref_postalStamp.jpg';
	
	gm(stampPath).resize(60).write('public/imageData/ref_postalStamp.jpg', function(err){
		if (err) console.dir(err);
	});

	gm(imagePath).resize(400).write('public/imageData/ref_'+imageName, function(err){
		if (err) console.dir(err);
	});

	gm().in('-page','+0+0')
		.in('public/imageData/ref_'+imageName)
		.in('-page','+340+0')
		.in(stampPath2)
		.fontSize(24)
		.fill('#000')
		.drawText(20,120,'Hello From My Vacation Spot!')
		.mosaic()
		.write('public/imageData/'+'stampified_'+imageName, function(err){
			if (!err){
				callback(null,'stampified_'+imageName);
			} else {
				callback(err,null);
			}
	});

	
};