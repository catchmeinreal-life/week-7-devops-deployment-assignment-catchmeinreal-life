import mongoose from "mongoose";

// 
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Connected to the database"));
        await mongoose.connect(`${process.env.MONGO_URI}/mern-auth`);

        console.log(mongoose.connection.name);
        
    } catch (error) {
        console.log("database connection error");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;