var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());

app.use('/data', function(req, res, next) {
  res.send([
    {key0: 10, key1: 22, key2: 32, key3: 12, key4: 12},
    {key0: 4, key1: 2, key2: 2, key3: 55, key4: 12},
    {key0: 2, key1: 1, key2: 55, key3: 'val23', key4: 12},
    {key0: 1, key1: 1, key2: 22, key3: 1, key4: 12},
    {key0: 5, key1: 5, key2: 11, key3: '1', key4: 12}
  ]);
});

app.listen(3000);