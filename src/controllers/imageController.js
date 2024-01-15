const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const getSignedUrl = async (req, res) => {
    const { categoria, imagem } = req.params;
    const key = `${categoria}/${imagem}`;

    const signedUrl = await s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Key: key,
        Expires: 60,
    });

    res.json({ url: signedUrl });
};

module.exports = {
    getSignedUrl,
};
