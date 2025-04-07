const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 3000;

// ========= connexion à la base de données Mongodb
mongoose.connect("mongodb://localhost:27017/phototheque");
// ========= config ejs
app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));
// ========= fichier static
app.use(express.static("public"));
//=============== METHODE GET
app.get("/", (req, res) => {
  res.send("Hello world !!!");
});

// ============== page non trouvée
app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvée");
});

app.listen(port, () => {
  console.log(`Serveur lancé au port ${port}`);
});
