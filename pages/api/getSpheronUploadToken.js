const { SpheronClient, ProtocolEnum } = require("@spheron/storage");

export default async function handler(req, res) {
  try {
    const bucketName = req.query.bucket; // use your preferred name
    const protocol = ProtocolEnum.IPFS; // use your preferred protocol
    const token = process.env.NEXT_PUBLIC_SPHERON_TOKEN; // add your access token in .env or paste it here

    const client = new SpheronClient({ token });

    const { uploadToken } = await client.createSingleUploadToken({
      name: bucketName,
      protocol,
    });

    res.status(200).json({
      uploadToken,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
