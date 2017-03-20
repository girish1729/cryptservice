
var express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs');
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text, res) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');

    return res.status(200).json({output: crypted});
}

function decrypt(text, res) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return res.status(200).json({output: dec});
}

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

app.all('/*', function(req, res, next){
  console.log("URL:: " + req.path);
  console.log("Method:: " + req.method);
    next();
});

app.post('/api/encrypt', function (req, res, next) {
    var plaintxt = req.body.plaintxt;
    console.log(plaintxt);
    encrypt(plaintxt, res);
    next();
});

app.post('/api/decrypt', function (req, res, next) {
    var ciphertxt = req.body.ciphertxt;
    console.log(ciphertxt);
    decrypt(ciphertxt, res);
    next();
});


app.get('/*', function(req, res, next){
  res.sendFile(__dirname + '/public/index.html');
});

var port = 2010;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});


