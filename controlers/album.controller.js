const Album = require("../models/Album");

const createAlbumForm = (req, res) => {
  res.render("new-album", { title: "Nouvel album" });
};

const createAlbumPost = async (req, res) => {
  try {
    const album = await Album.create({
      title: req.body.albumTitle,
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);

    res.redirect("/albums/create");
  }
};

module.exports = { createAlbumForm, createAlbumPost };
