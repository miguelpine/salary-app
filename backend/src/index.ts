import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import salaryRoutes from './routes/salary'; // Adjust the path as needed

dotenv.config();

const app = express();

// Use CORS middleware
const allowedOrigins = process.env.NODE_ENV === 'development' 
  ? ['http://localhost:3000', 'https://miguelpine.github.io'] 
  : ['https://miguelpine.github.io'];

app.use(cors({
  origin: allowedOrigins, // Allow requests from these origins
  methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', salaryRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Make the file a module
export {};
