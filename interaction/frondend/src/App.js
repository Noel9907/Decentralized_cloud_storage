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
  const [loading, setLoading] = useState(false); // State for loading indicators

  const connectFreighter = async () => {
    try {
      const publicKey = await requestAccess();
      console.log(publicKey);
      if (await isAllowed()) {
        console.log("Reached here");
        const connected = await isConnected();
        if (connected) {
          const key = await getPublicKey();
          setPublicKey(key);
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
      setLoading(true); // Set loading state while processing
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileBuffer = reader.result.split(",")[1];
        const uploadResponse = await axios.post(
          "http://localhost:5000/upload-and-create-asset",
          {
            file: fileBuffer,
          }
        );
        const { transactionXDR } = uploadResponse.data;
        setTransactionXDR(transactionXDR);
        setLoading(false); // Clear loading state
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file and creating asset:", error);
      setLoading(false); // Clear loading state in case of error
    }
  };

  const retrieveFile = async () => {
    try {
      setLoading(true); // Set loading state while fetching
      const response = await axios.get(
        "http://localhost:5000/fetch-asset/" + publicKey
      );
      setRetrievedFile(response.data.assetData);
      setLoading(false); // Clear loading state
    } catch (error) {
      console.error("Error retrieving file:", error);
      setLoading(false); // Clear loading state in case of error
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
        {console.log("The public key is", publicKey)}
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
            {/* Display other details of the retrieved file if needed */}
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
