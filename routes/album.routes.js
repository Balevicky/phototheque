const express = require("express");
const router = express.Router();
const albumController = require("../controlers/album.controller");

router.get("/albums", albumController.createAlbums);
router.get("/albums/:id", albumController.album);
router.post("/albums/:id", albumController.addImage);

router.get("/albums/create", albumController.createAlbumForm);

router.post("/albums/create", albumController.createAlbumPost);

router.get("/albums/:id/delete/:imageIndex", albumController.deleteImage);

module.exports = router;
