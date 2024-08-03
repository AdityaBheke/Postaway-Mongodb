import mongoose from "mongoose";

const baseUrl = 'localhost:27017';

export const connectUsingMongoose = async ()=>{
    try {
        await mongoose.connect(`mongodb://${baseUrl}/postaway`);
        console.log('Connected to mongodb using mongoose');
    } catch (error) {
        console.log('Error while connecting to database');
        
    }
}