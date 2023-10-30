const express = require("express");
const cors= require("cors");
require('dotenv').config()
const { connection } = require("./db");
const { axisRouter } = require("./routes/axisRouter");
const { userRouter } = require("./routes/user.routes");
const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/nykaa",axisRouter)
app.use("/user",userRouter)


app.listen(process.env.port, async() => {
  try{
    await connection
      console.log("server listening on port "+process.env.port);
  }
  catch{
console.log('Unable to connect to db');
  }
});
