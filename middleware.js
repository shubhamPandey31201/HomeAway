const Review=require("./models/review.js");
const Listing=require("./models/listing.js");
const { listingSchema , reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const flash=require("connect-flash");  




module.exports.isLoggedIn=(req,res,next)=>{ 
    if(!req.isAuthenticated()){
        const {id}=req.params;
        console.log(id);
        console.log("shubham");
        
        
        
        req.session.redirectUrl=req.originalUrl;
        req.session.baseId=id;
        
        
        req.flash("error","You must login to proceed further");
        return res.redirect("/login");
    }
    next();  

}
module.exports.savedRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
        res.locals.baseId=req.session.baseId;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    console.log(res.locals.currUser);
    
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the ownwer of this listing ");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMsg = error.details
        .map((el) => {
          el.message;
        })
        .join(",");
      next(new ExpressError(400, error));
    } else {
      next();
    }
  }


  module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMsg = error.details
        .map((el) => {
          el.message;
        })
        .join(",");
      next(new ExpressError(400, error));
    } else {
      next();
    }
  }

  module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    console.log(res.locals.currUser);
    
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review ");
        return res.redirect(`/listings/${id}`);
    }
    next();
}