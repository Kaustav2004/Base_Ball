"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const admin = __importStar(require("firebase-admin"));
const User_1 = require("../Models/User");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const db = admin.firestore();
        // Check if user already exists
        const snapshot = yield db.collection('users').where('email', '==', email).get();
        if (!snapshot.empty) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        // Create new user
        const user = new User_1.User(name, email, password);
        const docRef = yield db.collection('users').add(Object.assign({}, user));
        user.id = docRef.id;
        return res.status(201).json({
            success: true,
            message: 'User created successfully', user
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error', error: error.message
        });
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const db = admin.firestore();
        // Check for user with the provided email and password
        const snapshot = yield db
            .collection('users')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();
        if (snapshot.empty) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Retrieve user data
        const user = snapshot.docs[0].data();
        user.id = snapshot.docs[0].id;
        user.password = '********';
        return res.status(200).json({
            success: true,
            token: user,
            message: 'Login successful'
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal server error', error: error.message
        });
    }
});
exports.logIn = logIn;
