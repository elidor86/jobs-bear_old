const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL

let uri = "mongodb://botson:botson8686@botson-shard-00-00-oo6rx.gcp.mongodb.net:27017,botson-shard-00-01-oo6rx.gcp.mongodb.net:27017,botson-shard-00-02-oo6rx.gcp.mongodb.net:27017/botson?ssl=true&replicaSet=botson-shard-0&authSource=admin&retryWrites=true";

// Database Name
const dbName = 'botson';
let Client = null;
let collections = {};

// Use connect method to connect to the server
MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {

    assert.equal(null, err);

    if (err) {
        console.trace("MongoClient.connect err", err);
        return;
    }

    console.log("Connected successfully to server");

    Client = client;
    const db = client.db(dbName);

    collections.webPushUsers = db.collection('webPushUsers');
    collections.phones = db.collection('phones');
    collections.emails = db.collection('emails');


    //console.log("isConnected", client.isConnected())


});

let isConnected = function () {

    if (!Client) {
        return false;
    }

    if (Client && Client.isConnected()) {
        return true;
    }

    return false;

};

let getCollection = function (name) {


    let isConnected = Client.isConnected();

    if (isConnected != true) {
        return null;
    }

    if (name in collections) {
        return collections[name];
    }

    return null;

};

let getDocument = function (params) {


    let isConnected = Client.isConnected();

    return new Promise(function (resolve, reject) {

        if (isConnected != true) {
            return reject();
        }

        var collectionName = params.collectionName;

        if (!collectionName || collectionName.length <= 2) {
            return reject();
        }

        if (!(collectionName in collections)) {
            return reject();
        }

        collections[collectionName].findOne(params.query, function (err, res) {

            //console.log("r ", r);
            //console.log("err ", err);

            if (err) {
                return reject(err);
            }

            return resolve(res);

        });

    });

};

let insertDocument = function (params) {


    return new Promise(function (resolve, reject) {

        let isConnected = Client.isConnected();

        if (isConnected != true) {
            return reject();
        }

        var collectionName = params.collectionName;

        if (!collectionName || collectionName.length <= 2) {
            return reject();
        }

        if (!(collectionName in collections)) {
            return reject();
        }

        collections[collectionName].insertOne(params.data, function (err, res) {

            //console.log("r ", r);
            //console.log("err ", err);

            if (err) {
                return reject(err);
            }

            return resolve(res);

        });

    });

};

let updateDocument = function (params) {

    //console.log("updateDocument params", JSON.stringify(params));

    let isConnected = Client.isConnected();

    return new Promise(function (resolve, reject) {

        if (isConnected != true) {
            return reject();
        }

        var collectionName = params.collectionName;

        if (!collectionName || collectionName.length <= 2) {
            return reject();
        }

        if (!(collectionName in collections)) {
            return reject();
        }


        var query = params.query;
        var updateObj = params.updateObj;

        if (!query || !updateObj) {
            return reject();
        }

        collections[collectionName].updateOne(query, updateObj).then(function (res) {

            //console.log("res", res);
            return resolve();
        }, function (err) {
            console.trace("updateDocument err", err);
            return reject();
        });

    });

};

let waitUntilConnect = function () {


    return new Promise(function (resolve, reject) {

        var intervalId = null;

        intervalId = setInterval(function () {

            if (isConnected() == true) {
                clearInterval(intervalId);
                return resolve(true);
            }

        }, 500);


    });

};

module.exports = {
    waitUntilConnect: waitUntilConnect,
    getDocument: getDocument,
    updateDocument: updateDocument,
    insertDocument: insertDocument,
    getCollection: getCollection,
    collections: collections
};