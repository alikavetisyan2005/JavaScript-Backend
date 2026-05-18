// // var express = require("express");
// // var http = require("http");
// // var app = express();
// // app.use(function(request, response, next) {
// // console.log("In comes a " + request.method + " to " + request.url);
// // next();
// // });
// // app.use(function(request, response, next) {
// // var minute = (new Date()).getMinutes();
// // if ((minute % 2) === 0) {
// // next();
// // } else {
// // response.statusCode = 403;
// // response.end("Not authorized.");
// // }
// // });
// // app.use(function(request, response) {
// // response.end('Secret info: the password is "swordfish"!');
// // });
// // http.createServer(app).listen(3000);



// // var express = require("express");
// // var logger = require("morgan");
// // var http = require("http");
// // var app = express();
// // app.use(logger("short"));
// // app.use(function(request, response) {
// // response.writeHead(200, { "Content-Type": "text/plain" });
// // response.end("Hello, world!");
// // });
// // http.createServer(app).listen(3000);


// var express = require("express");
// var path = require("path");
// var http = require("http");
// var app = express();
// var publicPath = path.resolve(__dirname, "public");
// app.use(express.static(publicPath));
// app.get("/", function(request, response) {
// response.end("Welcome to my homepage!");
// });
// app.get("/about", function(request, response) {
// response.end("Welcome to the about page!");
// });
// app.get("/weather", function(request, response) {
// response.end("The current weather is NICE.");
// });
// app.get("/hello/:who", function(request, response) {
// response.end("Hello, " + request.params.who + ".");
// // Fun fact: this has some security issues, which we’ll get to!
// });
// app.use(function(request, response) {
// response.statusCode = 404;
// response.end("404!");
// });
// http.createServer(app).listen(3000);



var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
var entries = [];
app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
response.render("index");
});
app.get("/new-entry", function(request, response) {
response.render("new-entry");
});
app.post("/new-entry", function(request, response) {
if (!request.body.title || !request.body.body) {
response.status(400).send("Entries must have a title and a body.");
return;
}
entries.push({
title: request.body.title,
content: request.body.body,
published: new Date()
});
response.redirect("/");
});
app.use(function(request, response) {
response.status(404).render("404");
});
http.createServer(app).listen(3000, function() {
console.log("Guestbook app started on port 3000.");
});