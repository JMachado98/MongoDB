const { MongoClient} = require('mongodb');


async function main() {
    const URL = "mongodb+srv://root:root@cluster0.yawxvrq.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(URL);

    try {
        await client.connect();

        await findListingByName(client, "Hotel");

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findListingByName(client, nameOfListing) {
    const resultadoPorNome = await client.db("sample_airbnb").collection("listingsAndReviews")
    .findOne({
        name: nameOfListing
    });

    if (resultadoPorNome) {
        console.log(`\n Encontramos uma listagem com o nome: '${nameOfListing}'`);
        console.log(resultadoPorNome);
    } else {
        console.log(`\n Não foram encontradas listagens com o nome: '${nameOfListing}'`);
    }
}