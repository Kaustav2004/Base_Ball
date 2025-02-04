"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../Controllers/Auth");
const UserInfo_1 = require("../Controllers/UserInfo");
const router = express_1.default.Router();
// Define API Routes
router.post("/signUp", Auth_1.signUp);
router.post("/logIn", Auth_1.logIn);
router.post("/favTeams", UserInfo_1.teamsAdd);
router.post("/favPlayers", UserInfo_1.playersAdd);
// Use `export default` for consistency with ES modules
exports.default = router;
