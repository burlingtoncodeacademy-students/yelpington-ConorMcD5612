//Importing express
const express = require("express");
const app = express();
//defining default port
const port = process.env.PORT || 5000;

//making the server static
app.use(express.static("public"));

//Serving index.html to every url
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html");
});

//Storing directory.json using this as a lookup table in react API endpoint
app.get("/api/restaurant", (req, res) => {
  //sending json file
  res.sendFile(__dirname + "/api/directory.json");
});

//End point for array of objects restaurants
app.get("/api/restaurants", (req, res) => {
  //sending json file
  res.sendFile(__dirname + "/api/restaurants.json");
});

//setting up port
app.listen(port, () => console.log("Listening at port 5000"));
