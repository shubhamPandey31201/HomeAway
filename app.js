if(process.env.NODE_ENV!="production"){
  require("dotenv").config();  
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userRouter=require("./routes/users.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




const sessionOptions={
  secret:"thisisasecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*68*1000,
    httpOnly:true,
  },
}


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/arbnb";
main()
  .then((result) => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// const validateSchema=(req,res,next)=>{
//   let result=listingSchema.validate(req.body);
//   if(result.error){
//     next(new ExpressError(400,result.error));
//   }
//   else{
//     next();
//   }

// }

app.get("/", (req, res) => {
  res.send("this is root page");
});

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  
  next();

});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/",userRouter);




app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "SOMETHING WENT WRONG" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log("server is running at port no ", PORT);
});
