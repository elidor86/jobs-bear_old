const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient(process.env.REDIS_URL);
const {dev, redisUrl} = require("./server/config");

// get the redis instance from config file
module.exports = () => {
    redisClient.on("error", err => {
        console.log("Redis error: ", err);
    });

    if (dev) {
    } else {
    }
};
