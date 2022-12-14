const express = require("express");
const competitionRoutes = require("./competition/routes");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.use("/competition", competitionRoutes); //

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
