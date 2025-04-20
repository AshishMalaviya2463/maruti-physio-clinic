import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/maruti-physio-clinic";

export async function connectToDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}
