const User= require('../Models/user')
const Site_helper = require('../helpers/site_helper')

module.exports ={
    chechAuth : async function (req , resp , next){
        var token = req.headers['x-access-token'];
        if (!token) return resp.status(401).send({ status: 'error', message: 'No token provided.' });
        const decodedData = await Site_helper.decryptToken(token);
        // console.log(decodedData)
        if (decodedData.status == 'false') return resp.status(401).send({ status: 'error', message: 'Failed to authenticate token.' });
        req.authData=decodedData;
        req.authId=decodedData.id;
        // console.log(req.authData);
        next();
    }
}