const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromIni(),
});

const getAllCategories = async (req, res) => {
  try {
    const params = {
      Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
      Delimiter: '/'
    };

    const response = await s3.send(new ListObjectsV2Command(params));
    const categories = response.CommonPrefixes.map(prefix => prefix.Prefix.replace('/', ''));
    
    res.json({ categories });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllImages = async (req, res) => {
  try {
    const allImages = await listAllImages();
    res.json({ images: allImages });
  } catch (error) {
    console.error("Error in getAllImages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const listAllImages = async () => {
  const params = {
    Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
  };

  const objects = await s3.send(new ListObjectsV2Command(params));
  return objects.Contents.map((object) => object.Key);
};

const getSignedUrlHandler = async (req, res) => {
  try {
    const { categoria, imagem } = req.params;
    const key = `${categoria.toLowerCase()}/${imagem}`;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Error in getSignedUrl:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryItems = async (req, res) => {
  try {
    const { categoria } = req.params;
    const prefix = `${categoria.toLowerCase()}/`;

    const params = {
      Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.send(new ListObjectsV2Command(params));
    const items = response.Contents.map(object => object.Key.replace(prefix, ''));

    res.json({ categoria, items });
  } catch (error) {
    console.error("Error in getCategoryItems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
  getAllImages,
  getSignedUrlHandler,
  getCategoryItems,
};