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
exports.playersAdd = exports.teamsAdd = void 0;
const admin = __importStar(require("firebase-admin"));
const teamsAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, teams } = req.body;
    try {
        const db = admin.firestore();
        // Check if user already exists
        const snapshot = yield db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({
                success: false,
                message: 'User not exist'
            });
        }
        // Create new user
        const userDoc = snapshot.docs[0].ref;
        yield userDoc.update({ favTeams: teams });
        return res.status(201).json({
            success: true,
            message: 'Teams added successfully'
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
exports.teamsAdd = teamsAdd;
const playersAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, players } = req.body;
    try {
        const db = admin.firestore();
        // Check if user already exists
        const snapshot = yield db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({
                success: false,
                message: 'User not exist'
            });
        }
        // Create new user
        const userDoc = snapshot.docs[0].ref;
        yield userDoc.update({ favPlayers: players });
        return res.status(201).json({
            success: true,
            message: 'Players added successfully'
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
exports.playersAdd = playersAdd;
// export const userInfo = async (req:Request, res:Response) => {
//     const {email} = req.body;
//     try {
//         const db = admin.firestore();
//         // Check if user already exists
//         const snapshot = await db.collection('users').where('email', '==', email).get();
//         if (snapshot.empty) {
//             return res.status(400).json({ 
//                 success:false,
//                 message: 'User not exist'
//              });
//         }
//         return res.status(201).json({
//             success:true,
//             user: snapshot 
//         });
//     } catch (error:any) {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
