const AWS = require('../config/awsConfig');
const fs = require('fs');

async function uploadImage(localImagePath, fileName) {
    const fileContent = fs.readFileSync(localImagePath);

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: fileContent,
        ContentType: 'image/jpeg'
    };

    try {
        const data = await AWS.S3.upload(params).promise();
        console.log('Imagem enviada com sucesso. URL:', data.Location);
        return data.Location;
    } catch (err) {
        console.error('Erro ao enviar imagem:', err);
        throw err;
    }
}

module.exports = uploadImage;
