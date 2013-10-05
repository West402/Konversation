var express = require("express");
var escape = require('escape-html');
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
app.engine('.html', require('ejs').renderFile);
var swig = require('swig');

app.use('/', express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
app.set('view_engine', 'ejs');


var FACEBOOK_APP_ID = "728970310453334";
var FACEBOOK_SECRET = "c83880e3888f67f60ca1369df27d688e";


var graph = require('fbgraph');

var conf = {
	client_id: FACEBOOK_APP_ID,
	client_secret: FACEBOOK_SECRET,
	scope: 'read_mailbox',
	redirect_uri: 'http://localhost:5000/auth/facebook'
};
app.use(app.router);
/*
var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({appId: FACEBOOK_APP_ID, secret: FACEBOOK_SECRET});
facebook.api('/TylerLubeck', function(err, data){
	console.log(err);
	console.log(data);
})
*/
/*
app.use(express.cookieParser());
app.use(express.session({secret: FACEBOOK_SECRET}));
app.use(express.session({appId: FACEBOOK_APP_ID}));
app.use(Facebook.middleware({appId: FACEBOOK_APP_ID, secret: FACEBOOK_SECRET, scope: 'read_mailbox'}));
*/


var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URI ||
	'mongodb://localhost/HACKMit_db';

var db = mongo.Db.connect(mongoUri, function(err, dbConnection) {
	db = dbConnection;
//	db.collection('squares').drop();
});

app.get('/auth/facebook', function(req, res) {
	if(!req.query.code) {
		var authUrl = graph.getOauthUrl({
			"client_id": conf.client_id,
			"redirect_uri": conf.redirect_uri,
			"scope": conf.scope
		});

		if (!req.query.error) {
			res.redirect(authUrl);
		} else {
			res.send('access denied');
		}
		return;
	}

	graph.authorize({
		"client_id":      conf.client_id,
        "redirect_uri":   conf.redirect_uri,
      	"client_secret":  conf.client_secret,
      	"code":           req.query.code
	}, function(err, facebookRes){
		//graph.setAccessToken(req.query.code);
		res.redirect('/');
	});
});


app.get('/', function(req, response){

	var query = "SELECT name FROM user WHERE uid = me()"

	graph.fql(query, function(err, res){
		console.log(res);
		console.log(err);
		//resStr = ejs.render("index.html", {name: "butt"});
		//res.end(resStr);
		if(res.data.length > 0) {
			resStr = swig.renderFile('views/index.html', {name: res.data[0].name});
		} else {
			resStr = swig.renderFile('views/index.html', {name: null});
		}
		response.send(resStr);
	});
	//res.render("index.html");
});

/*
var INSERT_PASSWORD = 'SETUP';

app.get('/', Facebook.loginRequired({scope: 'read_mailbox'}), function(req, res){
	req.facebook.api('/me/inbox', function(err, user) {
		console.log(user);

		//console.log(user);
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello, ' + user + '!');
	});
});


app.get('/convo', function(req, res) {

});
*/



var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
