const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/", require("./router/start"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Exemple app listening on port ${port}`);
  });
};

initializeApp();
