const { format } = require('date-fns');
const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadImageToS3 = async (dataBuffer, fileName) => {
    const uploadResult = await s3.upload({
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${format(new Date(), 'yyyyMMddHHmmss')}-${fileName}`,
        ACL: 'public-read',
    });

    return uploadResult.Location;
};

const getProductById = async (productId) => {
    const key = `product${productId}.jpg`;
    const imageUrl = await getSignedUrl(key);

    const productInfo = {
        id: productId,
        name: 'Product Name',
        description: 'Product Description',
        imageUrl,
    };

    return productInfo;
};

const getProductsByCategory = async (category) => {
    const categoryKey = `${category.toLowerCase()}/`;
    const products = await listObjects(categoryKey);

    const productsInfo = products.map((product) => ({
        id: product.Key.replace(/\D/g, ''),
        name: `Product ${product.Key.replace(/\D/g, '')}`,
        description: `Product Description ${product.Key.replace(/\D/g, '')}`,
        imageUrl: product.Location,
    }));

    return productsInfo;
};

const getAllProducts = async () => {
    const allProducts = await listObjects();

    const allProductsInfo = allProducts.map((product) => ({
        id: product.Key.replace(/\D/g, ''),
        name: `Product ${product.Key.replace(/\D/g, '')}`,
        description: `Product Description ${product.Key.replace(/\D/g, '')}`,
        imageUrl: product.Location,
    }));

    return allProductsInfo;
};

const listObjects = async (prefix = '') => {
    const params = {
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Prefix: prefix,
    };

    const objects = await s3.listObjectsV2(params);
    return objects.Contents;
};

const getSignedUrl = async (key) => {
    const signedUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
        Key: key,
        Expires: 3600,
    });

    return signedUrl;
};

module.exports = {
    uploadImageToS3,
    getProductById,
    getProductsByCategory,
    getAllProducts,
};
