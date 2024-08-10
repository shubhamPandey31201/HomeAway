const User=require("../models/user");



module.exports.signup=async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to WanderLust!!");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("signup");
    }
  }

  module.exports.signin=async (req, res) => {
    req.flash("success", "You are successfully logged in to WanderLust!!");

    

    let redirectUrl=res.locals.redirectUrl || "/listings";
    let baseId=res.locals.baseId;
    
    if(baseId){
        res.redirect(`listings/${baseId}`);
    }
    res.redirect(redirectUrl);
  }


  module.exports.signout= (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are successfully logged out!");
      res.redirect("/listings");
    });
  }