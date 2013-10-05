var express = require("express");
var escape = require('escape-html');
var app = express();
app.use(express.logger());
app.use(express.bodyParser());
//app.engine('.html', require('ejs').renderFile);
var swig = require('swig');

app.use('/', express.static(__dirname + '/'));
app.set('views', __dirname + '/views');
//app.set('view_engine', 'ejs');


var FACEBOOK_APP_ID = "728970310453334";
var FACEBOOK_SECRET = "c83880e3888f67f60ca1369df27d688e";
var graph = require('fbgraph');


/*Auth Stuff Begin */
var authBase = '/auth/facebook'
var authRedirect = process.env.REDIRECT_URI || 'http://localhost:5000';
authRedirect += authBase;
/*Auth Stuff End */

var conf = {
	client_id: FACEBOOK_APP_ID,
	client_secret: FACEBOOK_SECRET,
	scope: 'read_mailbox',
	redirect_uri: authRedirect
};

/* Session Storage Begin */
var mongoUri = process.env.MONGOLAB_URI || 
	process.env.MONGOHQ_URI ||
	'mongodb://localhost/HACKMit_db';

var MongoStore = require('connect-mongo')(express);


app.use(express.cookieParser());
app.use(express.session({
	store: new MongoStore({
		url: mongoUri
	}),
	secret: "avbpiubargu9badvar498vpbarv",
	}));
app.use(app.router);
/*Session Storage End */

var mongo = require('mongodb');


var db = mongo.Db.connect(mongoUri, function(err, dbConnection) {
	db = dbConnection;
});


app.get(authBase, function(req, res) {
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
		req.session.code = graph.getAccessToken();
		res.redirect('/');
	});
});

app.get('/logout', function(req, response){
	req.session.destroy();
	response.redirect('/');
})




app.get('/', function(req, response){

	if(req.session.code){
		var query = "SELECT name FROM user WHERE uid = me()"
		graph.setAccessToken(req.session.code);

		graph.fql(query, function(err, res){
			if(res.data.length > 0) {
				resStr = swig.renderFile('views/index.html', {name: res.data[0].name});
			} else {
				resStr = swig.renderFile('views/index.html', {name: null});
			}
			response.send(resStr);
		});
	} else {
		resStr = swig.renderFile('views/index.html', {name: null});
		response.send(resStr);
	} 
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
