const axios = require('axios');

const reverseProxyMiddleware = async (req, res, next) => {

    const bucketUrl = 'https://storage.googleapis.com/jobs-bear_sitemap';

    try {

        if (req.url.includes('jobs-bear_sitemap')) {

            // Get the requested object path from the URL
            const objectPath = req.path;

            // Construct the URL for the object in the Google Cloud Storage bucket
            const objectUrl = `${bucketUrl}${objectPath}`;

            // Make a request to the object URL to fetch the object
            const {data} = await axios.get(objectUrl, {responseType: 'stream'});

            // Set the appropriate content type for the response based on the object's file extension
            const contentType = data.headers['content-type'];
            res.setHeader('Content-Type', contentType);

            // Pipe the object data from the Google Cloud Storage response to the Express response
            data.pipe(res);
        } else {
            next();
        }
    } catch (error) {
        next();
    }

}

module.exports = reverseProxyMiddleware;

