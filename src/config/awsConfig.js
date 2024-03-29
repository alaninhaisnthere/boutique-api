const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadedFile = async (dataBuffer, fileName) => {
    const uploadResult = await s3.upload({
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${format(new Date(), 'yyyyMMddHHmmss')}-${fileName}`,
        ACL: 'public-read',
    });

    return uploadResult;
};

module.exports = { uploadedFile };
