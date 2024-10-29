/* eslint-disable no-process-env */
const dotenv = require("dotenv");


dotenv.config();

module.exports = {
    port: parseInt(process.env.PORT, 10) || 3000,
    dev: process.env.NODE_ENV == "production" ? false : true,
    debugMode: process.env.DEBUG_MODE,
    redisHost: process.env.REDIS_HOST_DOT,
    redisPort: process.env.REDIS_PORT_DOT,
    redisPwd: process.env.REDIS_PWD_DOT,
    amplitudeApiKey: process.env.AMPLITUDE_API_KEY,
    tunnelUrl:
        process.env.NODE_ENV !== "production"
            ? `localhost:3002/`
            : `https://jobs-bear.com/`
};
