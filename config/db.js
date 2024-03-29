import mongoose from "mongoose"
import  colors  from "colors";

const connectDB= async ()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongo DB ${connect.connection.host}`.bgBlue.white);
    }catch(e){
        console.log(`Error in mongoDB ${e}`.bgRed.white);
    }
}

export default connectDB;