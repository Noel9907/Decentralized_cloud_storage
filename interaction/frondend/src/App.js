import React, { useState } from "react";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";
import "./styles.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [transactionXDR, setTransactionXDR] = useState("");
  const [retrievedFile, setRetrievedFile] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicators

  const connectMetaMask = async () => {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        setPublicKey(accounts[0]);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
    }
  };

  const uploadFile = async () => {
    try {
      setLoading(true); // Set loading state while processing
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileBuffer = reader.result.split(",")[1];
        const uploadResponse = await axios.post(
          "http://localhost:5000/upload",
          {
            file: fileBuffer,
          }
        );
        const { ipfsPath } = uploadResponse.data;
        const transactionResponse = await axios.post(
          "http://localhost:5000/create-asset",
          { publicKey, ipfsPath }
        );
        setTransactionXDR(transactionResponse.data.transactionXDR);
        setLoading(false); // Clear loading state
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading file:", error);
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
        <button className="btn" onClick={connectMetaMask}>
          Connect MetaMask
        </button>
        {publicKey && <p>Connected MetaMask Account: {publicKey}</p>}
      </header>

      <section>
        <div className="file-upload">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            className="btn"
            onClick={uploadFile}
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
