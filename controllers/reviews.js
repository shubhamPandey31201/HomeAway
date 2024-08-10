const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async (req, res) => {
    let id = req.params.id;
    let newReview = new Review(req.body.review);
    newReview.author=req.user._id;

    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New review created!!");

    res.redirect(`/listings/${id}`);
  }

  module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success","Review deleted successfully!!");

    res.redirect(`/listings/${id}`);
  }