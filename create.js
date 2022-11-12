const { MongoClient} = require('mongodb');


async function main() {
    const URL = "mongodb+srv://root:root@cluster0.yawxvrq.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(URL);

    try {
        await client.connect();

        await createMultipleListing(client, [
            {
                name: "Cabana",
                summary: "Cabana confortavel nas montanhas",
                bedrooms: 1,
                bathrooms: 1 
            },
            {
                name: "Hotel",
                summary: "Hotel na beira da praia",
                bedrooms: 2,
                bathrooms: 1 
            }
        ]);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// CREATE

// CREATE UNICO

async function createListing(client, newListing) {
    const resultado = await client.db("sample_airbnb").collection("listingsAndReviews")
    .insertOne(newListing);

    console.log(`\n Nova listagem criada com o id: ${resultado.insertedId}`);
}

// CREATE MULTIPLO

async function createMultipleListing(client, newListings) {
    const multiplosResultados = await client.db("sample_airbnb").collection("listingsAndReviews")
    .insertMany(newListings);

    console.log(`\n ${multiplosResultados.insertedCount} Novas listas criadas com o(s) id(s):`);
    console.log(multiplosResultados.insertedIds);
}

// Testando conexao
/* async function listDatabases(client) {
    const dbList = await client.db().admin().listDatabases();

    console.log("Banco de dados");
    dbList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
} */