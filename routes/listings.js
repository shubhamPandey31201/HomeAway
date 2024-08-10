const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");

const flash = require("connect-flash");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");

const upload = multer({ storage})

router.route("/").get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  
  upload.single('listing[image]'),
  validateListing,

  wrapAsync(listingController.newListing)
);

//validateListing,


// new route
router.route("/new").get(
  isLoggedIn,

  wrapAsync((req, res) => {
    res.render("listings/new.ejs");
  })
);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.editListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEdit));

module.exports = router;
