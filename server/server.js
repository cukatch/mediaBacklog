const express = require("express");
const connectDB = require('./db/conn');
const routes = require("./routes/manga");

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const app = express();
app.use("/manga", routes);
connectDB();


const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.listen(port, () => console.log(`Server running on port ${port}`));