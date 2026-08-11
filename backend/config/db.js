const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database] Could not connect to MongoDB at ${mongoUri}. Error: ${error.message}`);
    
    // Only attempt memory server fallback if NOT in production or if module is available
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log(`[Database] Attempting memory database fallback...`);
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB Server at ${memoryUri}`);
      return conn;
    } catch (memError) {
      console.error(`[Database] Connection failed completely. Please verify your MONGO_URI environment variable on Render.`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
