const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadedFile = async (dataBuffer, fileName) => {
    const uploadResult = await s3.upload({
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${format(new Date(), 'yyyyMMddHHmmss')}-${fileName}`,
        ACL: 'public-read',
    }).promise();

    return uploadResult;
}

module.exports = { uploadedFile };