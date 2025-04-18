const Album = require("../models/Album");
const catchAsync = require("../helpers/catchAsync");
const path = require("path");
const fs = require("fs");
const { rimraf, rimrafSync } = require("rimraf");
// const { error } = require("console");

const createAlbums = catchAsync(async (req, res) => {
  const albums = await Album.find({});
  res.render("albums", {
    title: "Mes albums",
    albums,
  });
});
// ============
const album = catchAsync(async (req, res) => {
  try {
    const idAlbum = req.params.id;
    const album = await Album.findById(idAlbum);
    // console.log(album);
    res.render("album", {
      title: `Mon album ${album.title}`,
      album,
      errors: req.flash("error"),
    });
  } catch (err) {
    // console.log(err);
    res.redirect("/404");
  }
});
// ============
const addImage = catchAsync(async (req, res) => {
  // ==============
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);
  // console.log(req.files);
  // ------------ gestion des erreurs
  if (!req?.files?.image) {
    req.flash("error", "Veuillez sélectionner une image");
    res.redirect(`/albums/${idAlbum}`);
    return;
  }
  const image = req.files.image;
  if (image.mimetype != "image/png" && image.mimetype != "image/jpeg") {
    req.flash("error", "fichiers JPG et PNG acceptés uniquement");
    res.redirect(`/albums/${idAlbum}`);
    return;
  }

  const folderPath = path.join(__dirname, `../public/upload`, idAlbum);
  // ------------- créer un repertoire
  fs.mkdirSync(folderPath, { recursive: true });
  // ------------- FIN créer un repertoire

  const nameImage = image.name;
  const localPath = path.join(folderPath, nameImage);

  await image.mv(localPath);
  //  --------ajouter images
  album.images.push(nameImage);
  await album.save();
  //  --------FIN ajouter images
  res.redirect(`/albums/${idAlbum}`);
});

// ============
const createAlbumForm = catchAsync((req, res) => {
  // console.log(req.flash("error"));
  res.render("new-album", {
    title: "Nouvel album",
    errors: req.flash("error"),
  });
});
// ============
const createAlbumPost = catchAsync(async (req, res) => {
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
});
// ============
const deleteImage = catchAsync(async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findById(idAlbum);
  const imageIndex = req.params.imageIndex;
  const image = album.images[imageIndex];
  console.log(image);

  if (!image) {
    res.redirect(`/albums/${idAlbum}`);

    return;
  }

  album.images.splice(imageIndex, 1);
  await album.save();
  //  supprimer l'image dans le repertoire
  const imagePath = path.join(__dirname, "../public/upload", idAlbum, image);
  fs.unlinkSync(imagePath);
  res.redirect(`/albums/${idAlbum}`);
});
// ==============
const deleteAlbum = catchAsync(async (req, res) => {
  const idAlbum = req.params.id;
  const album = await Album.findByIdAndDelete(idAlbum);
  const albumPath = path.join(__dirname, "../public/upload", idAlbum);
  // ------ suppresion du dossier physique dans un repertoire
  const preserveRoot = false;
  rimraf(albumPath, [preserveRoot]);

  res.redirect("/albums");
});

module.exports = {
  createAlbums,
  album,
  addImage,
  createAlbumForm,
  createAlbumPost,
  deleteImage,
  deleteAlbum,
};
