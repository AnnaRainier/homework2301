var Event = require('events').EventEmitter;
var fetch = require('node-fetch');
var EventEmitter = require('events').EventEmitter;
var emt = new Event ();
var http = require('http');
var result = fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3')
.then(function(res) {
  return res.json();
}).then(function(json) {
  result = json;
  emt.emit('success');
  return result;
});

emt.on('success', function () {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write('<table border="1px">');
    for (var i = 0; i < result.length; i++) {
      res.write('<tr>');
      res.write('<br>');
      for (key in result[i]) {
        res.write('<th>');
        res.write(key);
        res.write('</th>');
        res.write('<th>');
        res.write(result[i][key]);
        res.write('</th>');
      };
      res.write('<br>');
      res.write('</tr>');
  };
  res.write('</table>')
  res.end();
}).listen(3000);
});
