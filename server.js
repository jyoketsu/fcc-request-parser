var express = require('express');
var app = express();

app.get("/api/whoami/",function(req,res){
    //var ip = req.headers.host;
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var lang = req.headers["accept-language"];
    var soft = req.headers["user-agent"];
    res.json({
        "ipaddress":ip,
        "language":lang.slice(0, lang.indexOf(",")),
        "software":soft.slice(soft.indexOf("(") + 1, soft.indexOf(")"))
    });
});
app.get("/",function(req,res){
    //设置response编码为utf-8
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.end("请输入api名：");
});

var server = app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});