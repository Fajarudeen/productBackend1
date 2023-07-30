//express install
const express = require("express");

//import db file
const CONNECTDB = require("./config/db");

//cors install
const cors = require('cors');

//creating app using express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

//defining port
const port = process.env.PORT || 5000;

//common path setting
app.use("/api/product", require("./routes/productAuth"));

//mongoDB connection calling
CONNECTDB();

//port listening
app.listen(port, () => {
  console.log(`server listning to port  ${port}`);
});
