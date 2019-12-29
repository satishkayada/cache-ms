const express = require('express')
const app = express()
const port = 6200
var bodyParser = require('body-parser')
var insertdata = require('./dbUtility').createdata
var dbop = new insertdata();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
app.get('/', (req, res) => res.send('Hello World!')

)
app.get('/cash-ms/getkey/:key/V1', (req, res) => {
    var key = req.params.key;
    dbop.getkey(key, function (err, responce) {
        if (err) {
            res.send(err)
        } else {
            var keyResponce = JSON.parse(responce)
            if (isEmptyObject(keyResponce)) {
                var errorResponce = {
                    "isError": true,
                    "message": "Key not found " + key
                }
                res.send(errorResponce);
            } else {
                res.send(keyResponce);
            }
        }
    });
})
app.get('/cash-ms/getSession/:token/V1', (req, res) => {
    var token = req.params.token;
    dbop.getSession(token, function (err, responce) {
        if (err) {
            res.send(err)
        } else {
            var sessionObject = JSON.parse(responce)
            if (isEmptyObject(sessionObject)) {
                var errorResponce = {
                    "isError": true,
                    "message": "Token not found"
                }
                res.send(errorResponce);
            } else {
                res.send(sessionObject);
            }
        }
    });
}
)
app.post('/cash-ms/saveSession/:token/V1', (req, res) => {
    var token = req.params.token;
    var sessionData = JSON.stringify(req.body);
    dbop.saveSession(token, sessionData, function (err, responce) {
        if (err) {
            res.send(err)
        } else {
            res.send(responce);
        }
    });
}
)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
