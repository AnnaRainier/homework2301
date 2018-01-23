var http = require('http');
var Event = require('events').EventEmitter;
var emt = new Event ();
var fs = require('fs');
var log = require('simple-node-logger').createSimpleLogger('mylogs.log');
log.setLevel('info');

emt.on('pageOpen', function () {
  log.info('user Guest visited main page on ' + new Date());
});
emt.on('purchase', function () {
  log.info('user Guest made a purchase on ' + new Date());
});
emt.on('readFile', function () {
  log.info('user Guest requested file "demo.txt" on ' + new Date());
});
emt.on('fileFinishedLoading', function () {
  log.info('file requested by user finished loading on ' + new Date());
});


http.createServer(function(req, res) {
  if (req.url === '/') {
  res.write('hello');
  emt.emit('pageOpen');
  res.end();
} else if (req.url === '/purchase') {
  res.write('thank you');
  emt.emit('purchase');
  res.end();
} else if (req.url === '/file') {
  fs.readFile('demo.txt', function (err, data) {
    if (err) throw err;
    emt.emit('readFile');
    res.write(data);
    res.end();
    emt.emit('fileFinishedLoading');
  });
};
}).listen(3000);
