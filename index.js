require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const morgan = require("morgan");

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./routes/user.routes'))
app.use(require('./routes/file.routes'))


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGOSER);
    console.log("Подключение к базе данных успешно");
  } catch (error) {
    console.log(error);
  }
};

app.listen(process.env.PORT, () => {
  console.log("Подключение к серверу успешно");
});

start();
