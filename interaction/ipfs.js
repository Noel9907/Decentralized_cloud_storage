import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const uploadFile = async (fileBuffer) => {
  try {
    const { path } = await ipfs.add(fileBuffer);
    return path;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
};

export const retrieveFile = async (cid) => {
  try {
    const fileStream = await ipfs.get(cid);
    return fileStream;
  } catch (error) {
    console.error("Error retrieving file from IPFS:", error);
    throw error;
  }
};
