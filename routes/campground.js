const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const Campground = require("../models/campground");
const { isLoggedIn, isAdmin, validateCampground } = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

// Router Route
router
  .route("/")
  .get(wrapAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("campground[images]"),
    validateCampground,
    wrapAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAdmin,
    upload.array("campground[images]"),
    validateCampground,
    wrapAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAdmin, wrapAsync(campgrounds.deleteCampground));

// EDIT PAGE
router.get(
  "/:id/edit",
  isLoggedIn,
  isAdmin,
  wrapAsync(campgrounds.renderEditForm)
);

module.exports = router;
