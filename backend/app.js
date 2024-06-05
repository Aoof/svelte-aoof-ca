const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require("fs");
const https = require("https");

require("dotenv").config();


const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

client.connect().then(() => {
    console.log("Connected to MongoDB")

    let db = client.db(process.env.DBNAME);
    let collection = db.collection("recipes");

    let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));

    collection.insertMany(recipes).then(() => {
        console.log("Recipes added to database")
        client.close();
    }).catch(err => {
        console.error(err)
    });

}).catch(err => {
    console.error(err)
});
