// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  var tables = [];
  var waitlist = [];

  // API Routes

  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

  app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

  // Page routing

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
  });

  // take in customer from reserve form
  app.post("/api/tables", function(req, res) {
      var newCustomer = req.body;

      if (tables.length < 5) {
          res.send(true);
          tables.push(newCustomer);
      } else {
          res.send(false);
          waitlist.push(newCustomer);
      }
  })