import { MongoClient, ServerApiVersion } from "mongodb";

import dotenv from 'dotenv';
dotenv.config();

let instance = null;

export default class Database {
    constructor() {
        if (!instance) {
            instance = this;
            this.client = new MongoClient(process.env.MONGO_URI, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            this.client.connect();
        }
        return instance;
    }

    async disconnect() {
        try {
            await this.client.close();
        } catch (err) {
            console.error(err);
        }
    }

    get db() {
        return this.client.db(process.env.DBNAME);
    }
}