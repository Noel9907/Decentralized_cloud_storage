// // stellar.js

import StellarSdk from "@stellar/stellar-sdk";

const secretKey = "GBX6LCNMD4K2AEA5U326EMVT7CYUWZQUWBBBJEL7XSBTDY3JLP5QPCGM"; // Replace with your actual Stellar secret key
const server = new StellarSdk.SorobanRpc.Server(
  "https://soroban-testnet.stellar.org"
);

// Your existing functions for creating asset and fetching asset should remain unchanged
// Assuming no changes needed here based on your previous implementation
