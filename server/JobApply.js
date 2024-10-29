const {Storage} = require('@google-cloud/storage');
const multiparty = require('multiparty')

const GOOGLE_CLOUD_PROJECT_ID = 'jobs-dot'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = 'jobs-dot-387292102d44.json'; // Replace with the path to the downloaded private key


const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,
});


exports.sendUploadToGCS = (req, res, next) => {

    //console.log("sendUploadToGCS ", req);

    //console.log("req.file ", req.file);

    if (!req.file) {
        return res.json({
            code: 500
        });
    }

    const bucketName = "botson-cv-submit";
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        }
    });

    stream.on('error', (err) => {
        console.trace("sendUploadToGCS error", err);
        res.json({
            code: 500
        });
    });

    stream.on('finish', () => {
        res.json({
            code: 200
        });
    });

    stream.end(req.file.buffer);


};