import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

@Injectable()
export class FirebaseService {
    private firebaseAdmin: admin.app.App;
    constructor() {
        this.firebaseAdmin = admin.initializeApp({
            credential: admin.credential.cert({
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                projectId: process.env.FIREBASE_PROJECT_ID,
            } as Partial<admin.ServiceAccount>),
        });
    }

    async sendMessaging(message: Message) {
        const result = await this.firebaseAdmin.messaging().send(message);
        console.log(result);
    }
}
