import React, { useState } from "react";
import axios from "axios";
import {
  requestAccess,
  isConnected,
  isAllowed,
  getPublicKey,
} from "@stellar/freighter-api";
import "./styles.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [transactionXDR, setTransactionXDR] = useState("");
  const [retrievedFile, setRetrievedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectFreighter = async () => {
    try {
      const key = await requestAccess();
      if (await isAllowed()) {
        if (await isConnected()) {
          const publicKey = await getPublicKey();
          setPublicKey(publicKey);
        } else {
          alert("Please connect with your wallet");
        }
      }
    } catch (error) {
      console.error("Error connecting Freighter:", error);
    }
  };

  const uploadFileAndCreateAsset = async () => {
    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileBuffer = reader.result.split(",")[1];
        const response = await axios.post(
          "http://localhost:5000/upload-and-create-asset",
          { file: fileBuffer }
        );
        const { transactionXDR } = response.data;
        setTransactionXDR(transactionXDR);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file and creating asset:", error);
      setLoading(false);
    }
  };

  const retrieveFile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/fetch-asset/${publicKey}`
      );
      setRetrievedFile(response.data.assetData);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving file:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Decentralized File Management</h1>
        <button className="btn" onClick={connectFreighter}>
          Connect Freighter
        </button>
        {publicKey && <p>Connected Freighter Account: {publicKey}</p>}
      </header>

      <section>
        <div className="file-upload">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            className="btn"
            onClick={uploadFileAndCreateAsset}
            disabled={!publicKey || !file || loading}
          >
            {loading ? "Uploading..." : "Upload and Create Asset"}
          </button>
        </div>

        {transactionXDR && (
          <div className="transaction-info">
            <h3>Transaction Details</h3>
            <p>Transaction XDR: {transactionXDR}</p>
          </div>
        )}

        <button
          className="btn"
          onClick={retrieveFile}
          disabled={!publicKey || loading}
        >
          {loading ? "Retrieving..." : "Retrieve File"}
        </button>

        {retrievedFile && (
          <div className="file-retrieve">
            <h3>Retrieved File</h3>
            <p>{retrievedFile}</p>
          </div>
        )}
      </section>

      <footer>
        <p>&copy; 2024 Pixelcloud</p>
      </footer>
    </div>
  );
};

export default App;
