const Album = require("../models/Album");

const createAlbums = async (req, res) => {
  const albums = await Album.find({});
  console.log(albums);

  res.render("albums", {
    title: "Mes albums",
    albums,
  });
};

const album = async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    console.log(album);
    res.render("album", {
      title: "album",
      album,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/404");
  }
};

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
    res.redirect("/albums");
  } catch (err) {
    // console.log(err);
    req.flash("error", "Erreur lors de la creation de l'album");
    res.redirect("/albums/create");
  }
};

module.exports = { createAlbums, album, createAlbumForm, createAlbumPost };
