import StellarSdk from "@stellar/stellar-sdk";
import dotenv from "dotenv";
dotenv.config();

const secretKey = "GBX6LCNMD4K2AEA5U326EMVT7CYUWZQUWBBBJEL7XSBTDY3JLP5QPCGM";
const server = new StellarSdk.SorobanRpc.Server(
  "https://soroban-testnet.stellar.org"
);

export const createAsset = async (publicKey, assetUrl) => {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
    const account = await server.loadAccount(publicKey);
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.manageData({
          name: "Asset",
          value: assetUrl,
        })
      )
      .setTimeout(30)
      .sign(sourceKeys)
      .build();

    // Submit the transaction to the network
    const transactionResult = await server.submitTransaction(transaction);
    console.log("Transaction successful with result:", transactionResult);
    return transactionResult;
  } catch (error) {
    console.error(
      "Error creating asset:",
      error.response.data.extras.result_codes
    );
    throw error;
  }
};

export const fetchAsset = async (publicKey) => {
  try {
    const account = await server.loadAccount(publicKey);
    const assetData = account.data_attr.Asset;
    return assetData;
  } catch (error) {
    console.error("Error fetching asset:", error);
    throw error;
  }
};
