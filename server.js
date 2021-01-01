'use strict'

require('dotenv').config()
//import packages

var MongoClient = require('mongodb').MongoClient;
const atlas_connection_uri = process.env.MONGO_URI;

const express = require('express');

const app = express();
//const bodyParser = require('body-parser');
process.env.NODE_ENV = 'development'

app.use(express.static(__dirname + "/public"))
app.set('view engine', 'pug')
app.set('views', './views')
// app.use(bodyParser.urlencoded(false))

function getData(db_name,collection_name,callback) {
    let dbConnection;
    try {
        MongoClient.connect(atlas_connection_uri,{ useUnifiedTopology: true }, function (err, client) {
            dbConnection = client.db(db_name);
            if(err) {
                console.log(err)
                callback(null,"Could not connect to database.")
            }
            else {
                listDocs(dbConnection,collection_name, function(err,result) {
                    callback(null, result)
                })
            }
        });
    }
    catch (err) {
        console.log(err);
        callback(null,err)
    }
}

function listDocs(db,name,callback) {
    db.collection(name).find().toArray() 
    .then(data => {
        console.log("Retrieved collections");
        console.log("Results: ")
        console.log(data)
        callback(null,data);
    })
    .catch(err => {
        console.log("an error occurred in findDoc: "+ err);
        callback(null,"Error retrieving documents.");
    })
}

app.get('/data', function(req,res) {
    getData(process.env.DB_NAME,process.env.COLLECTION_NAME, function(err,result) {
        res.json({statusCode: 200, body: result})
    })
})


app.get('/', function (req, res) {
    //make request
    res.render('index', { title: 'VDC.cloud Testing PubSub'});
})

app.listen(3000 || process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${3000 || process.env.PORT}`);
})