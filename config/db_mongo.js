const {MongoClient} = require('mongodb');

const DEFAULT_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function connectAndList(uri = DEFAULT_URI, dbName = 'test') {
    const fullUri = uri.includes(dbName) ? uri : `${uri}/${dbName}?retryWrites=true&w=majority`;
    const client = new MongoClient(fullUri);
    try {
        await client.connect();
        await listDatabases(client);
    } finally {
        await client.close();
    }
}

module.exports = { connectAndList, listDatabases };

// If run directly, perform a quick list (but don't do this on require()).
if (require.main === module) {
    connectAndList().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
 