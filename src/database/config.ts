import mongoose, { connection } from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connection successfull");
    });

    connection.on("error", (error) => {
      console.log("Mongo connection error", error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
