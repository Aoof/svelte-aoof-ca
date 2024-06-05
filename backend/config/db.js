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

    module.exports = client.db(process.env.DBNAME);
    const app = require("../server");

    if (process.env.NODE_ENV === "production") {
        const options = {
            key: fs.readFileSync(process
                .env.KEY_PATH || "key.pem"),
            cert: fs.readFileSync(process
                .env.CERT_PATH || "cert.pem"),
        };

        app.use((req, res, next) => {
            if (req.headers.host === 'www.aoof.ca') {
                res.redirect(301, 'https://aoof.ca' + req.originalUrl);
            } else {
                next();
            }
        });

        // Create an HTTPS server
        https.createServer(options, app).listen(443, () => {
            console.log(`Server listening on port 443`);
        });

        const httpApp = require("express")();

        httpApp.use((req, res) => {
            res.redirect('https://' + req.headers.host + req.url);
        });

        httpApp.listen(80, () => {
            console.log(`Redirecting HTTP to HTTPS on port 80`);
        });

    } else {
        // For non-production environments, start an HTTP server
        app.listen(process.env.PORT || 80, () => {
            console.log(`Server listening on port ${process.env.PORT || 80}`);
        });
    }
}).catch(err => {
    console.error(err)
});
