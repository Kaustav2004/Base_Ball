import * as admin from 'firebase-admin';
import { User } from '../Models/User';
import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const db = admin.firestore();

        // Check if user already exists
        const snapshot = await db.collection('users').where('email', '==', email).get();
        if (!snapshot.empty) {
            return res.status(400).json({ 
                success:false,
                message: 'User already exists'
             });
        }

        // Create new user
        const user = new User(name, email, password);
        const docRef = await db.collection('users').add({ ...user });
        user.id = docRef.id;

        return res.status(201).json({
            success:true,
            message: 'User created successfully', user 
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ 
            success:false,
            message: 'Internal server error', error: error.message
        });
    }
};

export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const db = admin.firestore();

        // Check for user with the provided email and password
        const snapshot = await db
            .collection('users')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ 
                success:false,
                message: 'Invalid email or password' 
            });
        }

        // Retrieve user data
        const user = snapshot.docs[0].data() as User;
        user.id = snapshot.docs[0].id;
        user.password = '********';

        return res.status(200).json({ 
            success:true,
            token:user,
            message: 'Login successful' 
        });
    } catch (error: any) {
        console.error(error.message);
        return res.status(500).json({ 
            success:false,
            message: 'Internal server error', error: error.message 
        });
    }
};
