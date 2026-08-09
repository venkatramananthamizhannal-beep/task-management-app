const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[Database] Could not connect to primary MongoDB at ${mongoUri}. Attempting memory database fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB Server at ${memoryUri}`);
      return conn;
    } catch (memError) {
      console.error(`[Database] In-Memory MongoDB launch failed: ${memError.message}`);
      console.error(`[Database] Primary error: ${error.message}`);
      console.error(`[Database] Please ensure MongoDB is running locally or specify a valid MONGO_URI in .env`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
