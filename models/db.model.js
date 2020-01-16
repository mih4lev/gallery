const MongoClient = require(`mongodb`).MongoClient;

const url = 'mongodb+srv://mikhalev:i8nvl551s@mern-nsish.mongodb.net/test?retryWrites=true&w=majority';
const dbName = `gallery`;
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// const collection = `collection`;

// const searchQuery = {  };
// const searchData = await findOne(searchQuery, collection);
// console.log(searchData);

const findOne = async (searchData, collection) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        return await remoteDB.findOne(searchData);
    } finally {
        await client.close();
    }
};

// const searchQuery = {  };
// const sortQuery = { age: 1 };
// const searchData = await findMany(searchQuery, collection, sortQuery);
// console.log(searchData);

const findMany = async (searchQuery, collection, sortQuery = false) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        return (sortQuery) ?
            await remoteDB.find(searchQuery).sort(sortQuery).toArray() :
            await remoteDB.find(searchQuery).toArray();
    } finally {
        await client.close();
    }
};

// const updateQuery = { "name": "Mark" };
// const updateData = { $set: { "age": "10" }};
// const updatedStatus = await updateOne(updateQuery, updateData, collection);
// console.log(updatedStatus);

const updateOne = async (updateQuery, updateData, collection) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        const response = await remoteDB.updateOne(updateQuery, updateData);
        return !!response.modifiedCount;
    } finally {
        await client.close();
    }
};

// const insertQuery = { "name": "Catty", "age": 10 };
// const insertedID = await insertOne(insertQuery, collection);
// console.log(insertedID);

const insertOne = async (insertData, collection) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        const response = await remoteDB.insertOne(insertData);
        return response.insertedId;
    } finally {
        await client.close();
    }
};

// const deleteQuery = { name: `Julia` };
// const deletedStatus = await deleteOne(deleteQuery, collection);
// console.log(deletedStatus);

const deleteOne = async (deleteQuery, collection) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        const response = await remoteDB.deleteOne(deleteQuery);
        return !!response.deletedCount;
    } finally {
        await client.close();
    }
};

// const deleteQuery = { name: `Catty` };
// const deletedStatus = await deleteMany(deleteQuery, collection);
// console.log(deletedStatus);

const deleteMany = async (deleteQuery, collection) => {
    const client = await MongoClient.connect(url, connectOptions);
    try {
        if (!client) return false;
        const remoteDB = client.db(dbName).collection(collection);
        const response = await remoteDB.deleteMany(deleteQuery);
        return !!response.deletedCount;
    } finally {
        await client.close();
    }
};

module.exports = { findOne, findMany, updateOne, insertOne, deleteOne, deleteMany };