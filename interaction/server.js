// server.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { uploadFileToPinata, retrieveFileFromPinata } from "./ipfs.js"; // Import uploadFileToPinata and retrieveFileFromPinata functions
import { uploadAndCreateAsset, fetchAsset } from "./stellar.js"; // Import updated functions

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/upload", async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.body.file, "base64");
    const ipfsResponse = await uploadFileToPinata(fileBuffer); // Pass file buffer directly to Pinata upload function
    res.json(ipfsResponse);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send(error.toString());
  }
});

app.post("/upload-and-create-asset", async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.body.file, "base64");
    const transactionXDR = await uploadAndCreateAsset(fileBuffer); // Assuming this function is correctly implemented in stellar.js
    res.json({ transactionXDR });
  } catch (error) {
    console.error("Error uploading and creating asset:", error);
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

app.post("/retrieve-file", async (req, res) => {
  try {
    const { cid } = req.body;
    const fileContents = await retrieveFileFromPinata(cid);
    res.json({ fileContents });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send(error.toString());
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
