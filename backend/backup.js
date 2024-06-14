import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import fs from "fs"

import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect().then(async () => {
    let db = client.db(process.env.DBNAME);

    let recipesCollection = db.collection("recipes");

    let recipes = await recipesCollection.find().toArray();

    // Back up all recipes to a JSON file and save it by date
    let date = new Date();
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let backupPath = `backups/recipes-${dateString}.json`;

    fs.writeFileSync(backupPath, JSON.stringify(recipes, null, 2));

    await client.close();
    process.exit();
}).catch(err => {
    console.error(err)
});
