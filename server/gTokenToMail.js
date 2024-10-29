const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = "74517768383-p5pkdqhs981d77er93tl5idqnrqouesa.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);


const getMailFromToken = async function (req, res) {

    const params = req.body;

    if (!params || !params.credential) {
        return res.json({error: true});
    }

    let ticket = null;

    try {

        ticket = await client.verifyIdToken({
            idToken: params.credential,
            audience: CLIENT_ID
        });

    } catch (e) {
        console.trace("client.verifyIdToken", e);
        return res.json({error: true});
    }

    if (!ticket) {
        return res.json({error: true});
    }

    const payload = ticket.getPayload();

    //console.log("payload ", payload);

    if (payload && payload.email_verified == true && payload.email) {
        return res.json(payload);
    }

    return res.json({error: true});

};

exports.getMailFromToken = getMailFromToken;