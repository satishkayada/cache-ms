var Redis = require('ioredis')
function createdata() {
    console.log("enter in constructor function Cash MS dbUtility");
}
createdata.prototype.getkey = function (key, callback) {
    try {
        let RedisClient = new Redis({
            port: 6379,
            host: "127.0.0.1",
            db: 0
        })
        RedisClient.get(key, function (err, responce) {
            if (err) {
                callback(err);
            } else {
                callback(null, responce)
            }
        })
    } catch (error) {
        callback(error)
    }
}

createdata.prototype.getSession = function (token, callback) {
    try {
        let RedisClient = new Redis({
            port: 6379,
            host: "127.0.0.1",
            db: 0
        })
        RedisClient.get(token, function (err, responce) {
            if (err) {
                callback(err);
            } else {
                callback(null, responce)
            }
        })
    } catch (error) {
        callback(error)
    }
}
createdata.prototype.saveSession = function (token, sessionData, callback) {
    try {
        let RedisClient = new Redis({
            port: 6379,
            host: "127.0.0.1",
            db: 0
        })
        RedisClient.setex(token, 60, sessionData);
        callback(null, 'Session Data Saved')
    } catch (error) {
        callback(error)
    }
}
module.exports.createdata = createdata