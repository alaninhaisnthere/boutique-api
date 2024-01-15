const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require('@aws-sdk/credential-provider-ini');

const s3 = new S3Client({
    credentials: fromIni(),
});

const getAllCategories = async (req, res) => {
  //testar rota (depois implementar lógica do aws)
  try {
    const categories = ["feminina", "masculina", "calcados", "acessorios"];
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

const getSignedUrl = async (req, res) => {
  try {
    const { categoria, imagem } = req.params;
    const key = `${categoria.toLowerCase()}/${imagem}`;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_EXPIRATION_BUCKET_NAME,
      Key: key,
    });

    const signedUrl = await s3.getSignedUrl(command);
    res.json({ url: signedUrl });
  } catch (error) {
    console.error("Error in getSignedUrl:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
  getAllImages,
  getSignedUrl,
};