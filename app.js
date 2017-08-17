var express = require('express');
var path = require('path');
var api = require('./routers/api.js');
var index = require('./routers/index.js');
var DIST_DIR = path.join(__dirname,'dist/');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(DIST_DIR));
app.use('/api',api);

app.post('/api',api);

app.use('/',index);


app.listen(1234,function(){
	console.log('server is up! ');
})