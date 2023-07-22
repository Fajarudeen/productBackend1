//mongoose installing
const mongoose=require('mongoose')

//mongoDB connection
const CONNECTDB=async()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/product-backend",{
            useNewUrlParser:true
        }).then((res)=>console.log("mongodb connected successfully"))
        
    }catch(err){
        console.log(err);
    }
}

module.exports=CONNECTDB