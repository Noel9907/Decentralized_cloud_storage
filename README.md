# Decentralized File Management System

## Description
This project implements a decentralized file management system using blockchain technology.

## Features

- **File Upload:** Allows users to upload files securely.
- **Asset Creation:** Generates assets on the blockchain for each uploaded file.
- **File Retrieval:** Retrieves files based on blockchain records.

## Installation
To install and run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
Navigate to the project directory:

bash
Copy code
cd your-repo
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Usage
Connect your MetaMask wallet.
Upload a file using the interface.
Check transaction details and retrieve uploaded files.
Technologies Used
React
Express
Ethereum blockchain
MetaMask
Contributing
We welcome contributions! Please fork this repository and submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Additional Documentation
API Documentation
Blockchain Integration Guide
Contact
For questions or support, contact us at team@example.com.

Asset Management Smart Contract
This smart contract manages assets stored on the blockchain using the Soroban SDK. It allows creation and retrieval of assets associated with IPFS addresses.

Contract Overview
The AssetContract is designed to facilitate the creation and retrieval of assets stored on the blockchain. It utilizes the Soroban SDK for blockchain interaction and storage.

Contract Types
Asset Struct
rust
Copy code
#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, Symbol, String};

#[contracttype]
#[derive(Clone)]
pub struct Asset {
    pub ipfs_address: String,
}

#[contracttype]
pub enum AssetBook {
    Asset(u64),
}

const COUNT_ASSET: Symbol = symbol_short!("C_ASSET");

#[contract]
pub struct AssetContract;

#[contractimpl]
impl AssetContract {
    pub fn create_asset(env: Env, ipfs_address: String) -> u64 {
        let mut count_asset: u64 = env.storage().instance().get(&COUNT_ASSET).unwrap_or(0);
        count_asset += 1;

        let asset = Asset { ipfs_address };

        env.storage().instance().set(&AssetBook::Asset(count_asset), &asset);
        env.storage().instance().set(&COUNT_ASSET, &count_asset);

        count_asset
    }

    pub fn fetch_asset(env: Env, asset_id: u64) -> String {
        let asset: Asset = env.storage().instance().get(&AssetBook::Asset(asset_id)).unwrap_or_else(|| {
            panic!("Asset not found");
        });
        asset.ipfs_address
    }
}
