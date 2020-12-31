'use strict'

require('dotenv')
//import packages

var MongoClient = require('mongodb').MongoClient;
const atlas_connection_uri = process.env.MONGO_URI;

const express = require('express');

const app = express();
//const bodyParser = require('body-parser');
process.env.NODE_ENV = 'development'

app.use(express.static(__dirname + "public"))
app.set('view engine', 'pug')
app.set('views', './views')
// app.use(bodyParser.urlencoded(false))

function getData(db_name,collection_name,callback) {
    try {
        MongoClient.connect(atlas_connection_uri,{ useUnifiedTopology: true }, function (err, client) {
            dbConnection = client.db(db_name);
            if(err) {
                callback(null, "Could not connect to database")
            }
            else {
                listDocs(dbConnection,collection_name, callback);
            }
        });
    }
    catch (err) {
        console.log(err);
        callback(null,"Error connection to database")
    }
}

function listDocs(db,name, callback) {
    db.collection(name).find(json, function(err, result) {
        if(err!=null) {
            console.log("an error occurred in findDoc: "+ err);
            callback(null, "Error retrieving documents.");
        }
        else {
            console.log("Retrieved collections");
            callback(null, result);
        }
    })
}

app.get('/', function (req, res) {
    //make request
    const result = getData(process.env.DB_NAME,process.env.COLLECTION_NAME);
    res.render('index', { title: 'VDC.cloud Testing PubSub', market_data: result});
})

app.listen(3000 || process.env.PORT, 'localhost');