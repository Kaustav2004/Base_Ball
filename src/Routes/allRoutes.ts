import express from "express";
import { signUp, logIn } from "../Controllers/Auth";
import { teamsAdd,playersAdd } from "../Controllers/UserInfo";

const router = express.Router();

// Define API Routes
router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/favTeams",teamsAdd);
router.post("/favPlayers",playersAdd);

// Use `export default` for consistency with ES modules
export default router;
