import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import admin from 'firebase-admin';
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
if (!process.env.FIREBASE_CONFIG) {
  throw new Error("FIREBASE_CONFIG environment variable is not defined");
}

const firebaseConfig = JSON.parse(
  Buffer.from(process.env.FIREBASE_CONFIG, 'base64').toString('utf-8')
);

// import serviceAccount from './firebase-adminsdk.json';
import allRoutes from './Routes/allRoutes';

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   databaseURL: 'https://baseball-2d081.firebaseio.com'
// });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1",allRoutes);

app.use("/",(req, res) => {
  res.status(404).json({
    success: true,
    message: 'Home Page'
  });
});
// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
