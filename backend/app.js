const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const fs = require("fs");

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

    // collection.find({}).toArray().then(recipes => {
    //     console.log(recipes);
    // });

    let recipes = JSON.parse(fs.readFileSync("./data/recipes.json"));

    recipes.forEach(recipe => {
        recipe._id = new ObjectId(recipe._id);
        recipe.createdDate = new Date(recipe.createdDate);

        collection.insertOne(recipe).then(() => {
            console.log("Recipe added to database")
        })
    });
}).catch(err => {
    console.error(err)
});
