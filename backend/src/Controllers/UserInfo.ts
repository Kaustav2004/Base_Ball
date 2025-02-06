import * as admin from 'firebase-admin';
import { Request, Response } from 'express';

export const teamsAdd = async (req: Request, res: Response) => {
    const { email, teams } = req.body;

    try {
        const db = admin.firestore();

        // Check if user already exists
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({ 
                success:false,
                message: 'User not exist'
             });
        }

        // Create new user
        const userDoc = snapshot.docs[0].ref;
        await userDoc.update({ favTeams: teams });

        return res.status(201).json({
            success:true,
            message: 'Teams added successfully' 
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ 
            success:false,
            message: 'Internal server error', error: error.message
        });
    }
};

export const playersAdd = async (req: Request, res: Response) => {
    const { email, players } = req.body;
    try {
        const db = admin.firestore();

        // Check if user already exists
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (snapshot.empty) {
            return res.status(400).json({ 
                success:false,
                message: 'User not exist'
             });
        }

        // Create new user
        const userDoc = snapshot.docs[0].ref;
        await userDoc.update({ favPlayers: players });

        return res.status(201).json({
            success:true,
            message: 'Players added successfully' 
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ 
            success:false,
            message: 'Internal server error', error: error.message
        });
    }
};

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