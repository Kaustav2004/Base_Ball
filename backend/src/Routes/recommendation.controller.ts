// // recommendation.controller.ts
// import express from "express"
// import axios from "axios"

// const router = express.Router()

// // Proxy endpoint for recommendations
// router.post("/api/recommendations", async (req, res) => {
//   try {
//     const { favTeams } = req.body
//     if (!favTeams || favTeams.length === 0) {
//       return res.status(400).json({ error: "No favorite teams provided" })
//     }

//     // Forward request to Flask
//     const flaskResponse = await axios.post(
//       "http://localhost:5000/recommendations",
//       {
//         favTeams,
//       }
//     )

//     // Forward the recommendations received from Flask to the client.
//     res.json(flaskResponse.data)
//   } catch (error) {
//     console.error("Error fetching recommendations:", (error as Error).message)
//     res.status(500).json({ error: "Failed to fetch recommendations" })
//   }
// })

// export default router

import express from "express"
import axios from "axios"

const router = express.Router()

// Proxy endpoint for recommendations
router.post("/api/recommendations", async (req, res) => {
  try {
    // Temporarily hardcoded favTeams value
    const favTeams = [201, 202]

    if (!favTeams || favTeams.length === 0) {
      return res.status(400).json({ error: "No favorite teams provided" })
    }

    // Forward request to Flask
    const flaskResponse = await axios.post(
      "http://localhost:5000/recommendations",
      {
        favTeams,
      }
    )

    // Forward the recommendations received from Flask to the client.
    res.json(flaskResponse.data)
  } catch (error) {
    console.error("Error fetching recommendations:", (error as Error).message)
    res.status(500).json({ error: "Failed to fetch recommendations" })
  }
})

export default router
