var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  var stat = fs.statSync('demo.txt');
  var fileSize = stat.size;
  if (req.url === '/stream' || fileSize > 1e+6) {
      var stream = fs.createReadStream('demo.txt');
      stream.pipe(res);
      console.log('file is streaming');
    } else if (req.url === '/file') {//для моего файла никогда не сработает
      fs.readFile('demo.txt', function (err, data) {
      if(err) throw err;
      res.write(data);
      console.log('stream is not used, file was loaded');
      res.end();
  });
  }
}).listen(3000, function () {
  console.log('server is up');
});
