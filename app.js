const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { MONGOURI } = require("./config/keys");
const cors = require("cors")
const corsOptions ={
  origin:'*', 
  credentials:true, //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("ERROR IN CONNECTING \n", err);
});

app.use(express.json());
app.use(require("./routes/books"));
app.use(require("./routes/user"));
app.use(require("./routes/seller"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
