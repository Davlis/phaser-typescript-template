var express = require('express');
var path = require('path');
var app = express();
var exec = require('child_process').exec;

var tsc = exec('tsc', (err, stdout, stderr) => {

  if (err) {
    console.log(err);
    return;
  }
});

tsc.stdout.on('data', function(data) {
  console.log(data);
});

tsc.stderr.on('data', function(data) {
  console.log(data);
});

app.use('/public', express.static(path.join(__dirname + '/bin')));
app.use('/lib', express.static(path.join(__dirname + '/lib')));
app.use('/assets', express.static(path.join(__dirname + '/assets')));

app.get('/', function(req, res, next) {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(4200, function() {
    console.log('Server started on port 4200!');
});
