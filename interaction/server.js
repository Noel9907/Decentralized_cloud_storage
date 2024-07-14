import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { uploadFile } from "./ipfs.js";
import { createAsset, fetchAsset } from "./stellar.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/upload", async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.body.file, "base64");
    const ipfsPath = await uploadFile(fileBuffer);
    res.json({ ipfsPath });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send(error.toString());
  }
});

app.post("/create-asset", async (req, res) => {
  try {
    const { publicKey, ipfsPath } = req.body;
    const transactionXDR = await createAsset(publicKey, ipfsPath);
    res.json({ transactionXDR });
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).send(error.toString());
  }
});

app.get("/fetch-asset/:publicKey", async (req, res) => {
  try {
    const { publicKey } = req.params;
    const assetData = await fetchAsset(publicKey);
    res.json({ assetData });
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
