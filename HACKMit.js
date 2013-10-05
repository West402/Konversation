var express = require("express");
var escape = require('escape-html');
var app = express();
app.use(express.static(__dirname + '/static'));
app.use(express.logger());
app.use(express.bodyParser());
app.engine('html', require('ejs').renderFile)

app.use('/', express.static(__dirname + '/static'));
app.set('views', __dirname + '/static');


var FACEBOOK_APP_ID = "728970310453334";
var FACEBOOK_SECRET = "c83880e3888f67f60ca1369df27d688e";
var Facebook = require('facebook-node-sdk');
/*
var facebook = new Facebook({appId: FACEBOOK_APP_ID, secret: FACEBOOK_SECRET});
facebook.api('/TylerLubeck', function(err, data){
	console.log(err);
	console.log(data);
})
*/

app.use(express.cookieParser());
app.use(express.session({secret: FACEBOOK_SECRET}));
app.use(express.session({appId: FACEBOOK_APP_ID}));
app.use(Facebook.middleware({appId: FACEBOOK_APP_ID, secret: FACEBOOK_SECRET, scope: 'read_mailbox'}));



var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URI ||
	'mongodb://localhost/HACKMit_db';

var db = mongo.Db.connect(mongoUri, function(err, dbConnection) {
	db = dbConnection;
//	db.collection('squares').drop();
});


var INSERT_PASSWORD = 'SETUP';

app.get('/', Facebook.loginRequired({scope: 'read_mailbox'}), function(req, res){
	req.facebook.api('/me/inbox', {limit: 50}, function(err, user) {
		/*
		user.data.forEach(function(message){
			console.log(message.comments);
		});
		*/

		console.log(user.data[0].comments);

		//console.log(user);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello, ' + user + '!');
	});
});


app.get('/convo', function(req, res) {

});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
