// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // serves frontend files

// MongoDB Connection (secured via .env)
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
  process.exit(1);
}

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

// Employee routes placeholder (real logic hidden for public safety)
app.use('/api/employees', (req, res) => {
  res.status(200).json({ message: "Employee API is active (code hidden for security)" });
});

// Default route to serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
(async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () =>
    console.log(`🚀 Server running securely on port ${PORT}`)
  );
})();
