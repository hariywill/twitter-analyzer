const config = require('../config');
var AWS = require("aws-sdk");

module.exports = {
    storeS3: (accountname, user, tweets) => {
        const body = JSON.stringify({ accountname, user, tweets });
        const objectParams = { Bucket: config.bucketName, Key: accountname, Body: body };
        const uploads3 = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
        uploads3.catch((e) => {
            console.log(e);
        })
    }
}