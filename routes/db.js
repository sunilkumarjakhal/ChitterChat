

module.exports = function(obj,next) {

    var url = "mongodb://localhost:27017";
    var MongoClient = require('mongodb').MongoClient;
    var connection = MongoClient.connect(url);

    connection
        .then(function (client) {
            console.log('connected');
           
            obj.db =  client.db('chitterChat');
            next();
        })
        .catch(function (err) {
            connection = undefined;
            next(err);
        });


};