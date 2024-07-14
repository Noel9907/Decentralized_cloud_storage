// ipfs.js

import axios from "axios";
import fs from "fs";

const apiKey = "df53cbc3551b303897a8"; // Replace with your Pinata API key
const apiSecret =
  "d9dbd23485bba638f86b0773d44c76466f7aee8e658acebccd05cd97ba078ede"; // Replace with your Pinata API secret

// Function to upload file to Pinata
export async function uploadFileToPinata(filePath) {
  try {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    // Read file into buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Make POST request to Pinata API
    const response = await axios.post(url, fileBuffer, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
      },
    });

    console.log("File uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    throw error;
  }
}

// Function to retrieve file from Pinata by CID
export async function retrieveFileFromPinata(cid) {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;

    // Make GET request to retrieve file
    const response = await axios.get(url);

    console.log("File retrieved successfully from Pinata:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving file from Pinata:", error);
    throw error;
  }
}
