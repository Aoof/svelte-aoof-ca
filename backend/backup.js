import { MongoClient, ServerApiVersion } from "mongodb";

import { readdir, stat, unlink, writeFileSync } from "fs";
import { join } from "path";

const logsDir = "./logs";

function cleanOldLogs() {
    readdir(logsDir, (err, files) => {
        if (err) {
            console.error('Error reading logs directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = join(logsDir, file);
            stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting file stats:', err);
                    return;
                }

                const now = new Date().getTime();
                const fileAge = now - stats.mtime.getTime();
                const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

                if (fileAge > weekInMilliseconds) {
                    unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error removing old log file:', err);
                        } else {
                            console.log(`Removed old log file: ${file}`);
                        }
                    });
                }
            });
        });
    });
}

cleanOldLogs();
console.log('Backup started');

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
    let backupPath = `./backups/recipes-${dateString}.json`;

    writeFileSync(backupPath, JSON.stringify(recipes, null, 2));

    await client.close();
    process.exit(0);
}).catch(err => {
    console.error(err)
});
