const Album = require("../models/Album");

const createAlbumForm = (req, res) => {
  // console.log(req.flash("error"));

  res.render("new-album", {
    title: "Nouvel album",
    errors: req.flash("error"),
  });
};

const createAlbumPost = async (req, res) => {
  try {
    if (!req.body.albumTitle) {
      req.flash("error", "Veuillez saisir le titre de l'album");
      res.redirect("/albums/create");
      return;
    }

    const album = await Album.create({
      title: req.body.albumTitle,
    });
    res.redirect("/");
  } catch (err) {
    // console.log(err);
    req.flash("error", "Erreur lors de la creation de l'album");
    res.redirect("/albums/create");
  }
};

module.exports = { createAlbumForm, createAlbumPost };
