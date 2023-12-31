const express = require('express'); // "require" the Express module

const app = express(); // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // assign a port

const path = require("path");
const blogService = require("./blog-service.js");

app.get('/', (req, res) => {
    res.redirect('/about');
  });

  app.get("/about", (req, res) =>{
    res.sendFile(__dirname + "/views/about.html");
});

app.use(express.static("public"));

app.get("/blog", (req, res) => {
  blogService
    .getPublishedPosts()
    .then((data) => {
      res.json(data);
    })
    .catch(function (err) {
      console.log("Unable to open the file: " + err);
    });
});

app.get("/posts", (req, res) => {
  blogService
    .getAllPosts()
    .then((data) => {
      res.json(data);
    })
    .catch(function (err) {
      console.log("Unable to open the file: " + err);
    });
});

app.get("/categories", (req, res) => {
  blogService
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch(function (err) {
      console.log("Unable to open the file: " + err);
    });
});

app.get("*", (req, res) => {
  res.status(404).sendFile(__dirname + "/views/404/error.html");
});

blogService
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch(function (err) {
    console.log("Unable to open the file: " + err);
  });

app.listen(HTTP_PORT, () => console.log(`Express http server listening on: ${HTTP_PORT}`));

