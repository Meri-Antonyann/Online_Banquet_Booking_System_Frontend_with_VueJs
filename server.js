
var history = require('connect-history-api-fallback');
const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(history());
const port = process.env.PORT || 5000;
app.listen(port);
app.get('/page',function(req,res){
  res.send("page");
});

