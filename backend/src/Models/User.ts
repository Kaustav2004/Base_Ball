import * as admin from 'firebase-admin';

export class User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: FirebaseFirestore.Timestamp;
    favTeams?:Array<number>;
    favPlayers?:Array<number>;

    constructor(name: string, email: string, password: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.createdAt = admin.firestore.Timestamp.now();
    }
  }
  