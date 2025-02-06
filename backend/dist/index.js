"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Firebase Admin SDK
if (!process.env.FIREBASE_CONFIG) {
    throw new Error("FIREBASE_CONFIG environment variable is not defined");
}
const firebaseConfig = JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG, 'base64').toString('utf-8'));
// import serviceAccount from './firebase-adminsdk.json';
const allRoutes_1 = __importDefault(require("./Routes/allRoutes"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(firebaseConfig),
});
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   databaseURL: 'https://baseball-2d081.firebaseio.com'
// });
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use("/api/v1", allRoutes_1.default);
app.use("/", (req, res) => {
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
