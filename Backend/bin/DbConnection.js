const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.Mongo_Url;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log("Following Error Occured While Connecting:", err);
  });
