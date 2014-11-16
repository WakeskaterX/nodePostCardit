
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    submitImage = require('./routes/submitImage');


var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('view engine','ejs');
  app.set('view options',{layout:false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

app.post('/submit', submitImage.submitImage);

app.get('/submit', submitImage.submitImage);

app.listen(3030, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
