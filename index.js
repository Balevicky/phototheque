const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const app = express();
const path = require("path");
const albumRoutes = require("./routes/album.routes");

const port = 3000;

// ========= connexion à la base de données Mongodb
mongoose.connect("mongodb://localhost:27017/phototheque");

// =========== pour recuperer les données de Body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ========= pour le televersement des fichiers
app.use(fileUpload());

// ========= config ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ========= fichier static
app.use(express.static("public"));

//=============== config se Session
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },// NE PAS UTILISER EN DEVEPPEMENT
  })
);

// ============ Flash
app.use(flash());

//=============== METHODE GET
app.get("/", (req, res) => {
  res.redirect("/albums");
});
app.use("/", albumRoutes);

// ============== page non trouvée
app.use((req, res) => {
  res.status(404);
  res.send("Page non trouvée");
});

app.listen(port, () => {
  console.log(`Serveur lancé au port ${port}`);
});
