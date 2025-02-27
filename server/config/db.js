import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      tls: true, // Force secure connection
      tlsAllowInvalidCertificates: false, // Ensure proper SSL verification
      serverSelectionTimeoutMS: 5000, // Avoid long waits if MongoDB is unreachable
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
