var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/**
 * simple example data
 */
var data = [
    {"_id": 1, "email": "gaby@email.com", "age": 22, "gender": "female"},
    {"_id": 2, "email": "peter@email.com", "age": 24, "gender": "male"},
    {"_id": 3, "email": "caroline@email.com", "age": 23, "gender": "female"}
];
/**
 * helper functions
 */
function getDataEntry(data, id, type, update) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id.toString() === id) {
            if (type === 'get') {
                return data[i];
            } else if (type === 'put') {
                data[i] = update;
            } else if (type === 'delete') {
                data.splice(i, 1);
            }
        }
    }
}
function getHighest(array) {
    var max = {};
    for (var i = 0; i < array.length; i++) {
        if (array[i]._id > (max._id || 0)) {
            max = array[i];
        }
    }
    return max;
}
function setDataEntry(data, update) {
    var curId = getHighest(data)._id;
    var entry = {
        _id: curId+1, 
        email: update.email, 
        age: update.age, 
        gender: update.gender
    };
    data.push(entry);
}

app.use(bodyParser());
app.use(express.static(__dirname));

app.set('views', 'views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/users', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
});

app.post('/users', function(req, res) {
    setDataEntry(data, req.body);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
});

app.get('/users/:_id', function(req, res) {
    var entry = getDataEntry(data, req.params._id, 'get');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entry));
});

app.put('/users/:_id', function(req, res) {
    var entry = getDataEntry(data, req.params._id, 'put', req.body);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entry));
});

app.delete('/users/:_id', function(req, res) {  
    getDataEntry(data, req.params._id, 'delete');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({}));
});

app.listen(3000);
console.log('Server listen on port 3000 browse http://127.0.0.1:3000');