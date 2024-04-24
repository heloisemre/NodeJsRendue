const express = require("express");
const app = express();
const ip = require("ip");
const port = 3000;
const cors = require("cors");

let maison = "Gryffindor";
app.use(express.json());
app.use(cors());

app.get("/dataled/", (req, res) => {
  return res.json({ house: maison });
});

app.post("/dataled/", (req, res) => {
  maison = req.body.lastVisited;
  console.log("post maison " + maison);
  return res.json({ message: "ok" });
});

app.use("/", require("./router/start"));

app.listen(port, () => {
  console.log("http://" + ip.address() + ":" + port);
  console.log(
    "http://" + ip.address() + ":" + port + "/dataled/  if you want house"
  );
});
