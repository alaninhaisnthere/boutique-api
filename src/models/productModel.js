const { format } = require('date-fns');
const aws = require('aws-sdk');

const AwsS3Client = new aws.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadImageToS3 = async (dataBuffer, fileName) => {
    const uploadResult = await AwsS3Client.upload({
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${format(new Date(), 'yyyyMMddHHmmss')}-${fileName}`,
        ACL: 'public-read',
    }).promise();

    return uploadResult;
};

module.exports = {
    uploadImageToS3,
};
