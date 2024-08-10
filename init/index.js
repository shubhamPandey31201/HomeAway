const initData=require("./data.js");
const mongoose=require("mongoose");
const Listing=require("../models/listing");



const MONGO_URL="mongodb://127.0.0.1:27017/arbnb";
main()
.then((result)=>{
    console.log("connected to db");

})
.catch((error)=>{
    console.log(err);

});


async function main(){
   await mongoose.connect(MONGO_URL);
}


async function saveData(){
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'66b3ba8696f86da9e0e0bad9'}));
    await Listing.insertMany(initData.data);


}

saveData()
.then((result)=>{
    console.log("data saved");
})
.catch((err)=>{
    console.log(err);
});