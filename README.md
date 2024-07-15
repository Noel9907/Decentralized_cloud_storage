# Decentralized File Management System

## Description
The Decentralized File Management System project aims to provide a secure and decentralized way to manage files using blockchain technology. It allows users to upload files, create blockchain-based assets for each file, and retrieve files based on blockchain records.

## Features
- **File Upload:** Users can securely upload files through a user-friendly interface.
- **Asset Creation:** Each uploaded file generates a unique asset on the blockchain, associated with its IPFS address.
- **File Retrieval:** Users can retrieve uploaded files based on the blockchain records.

## Smart Contract
The smart contract contains two functions:
- **create_asset:** This function creates an asset and returns the hash key.
- **fetch_asset:** This function fetches the asset using the hash key.

### Smart Contract Code Snippet
```rust
#[derive(Default)]
pub struct Contract;

impl Contract {
    pub fn create_asset(&self, asset_data: Vec<u8>) -> H256 {
        let hash_key = keccak256(&asset_data);
        // store asset_data in IPFS and save hash_key on the blockchain
        hash_key
    }

    pub fn fetch_asset(&self, hash_key: H256) -> Vec<u8> {
        // retrieve asset_data from IPFS using hash_key
        asset_data
    }
}

```
## Installation
To install and run the Decentralized File Management System locally, follow these steps:

Clone the repository:  https://github.com/Noel9907/Decentralized_cloud_like_storage_system

Navigate to the project directory: cd https://github.com/Noel9907/Decentralized_cloud_like_storage_system

Install dependencies: npm install


## Usage
Connect freighter: Ensure you have freighter installed and connected to the Ethereum blockchain.
Upload Files: Use the file upload interface to securely upload your files.
Transaction Details: Check the transaction details on the blockchain.
Retrieve Files: Retrieve uploaded files using the provided functionality based on blockchain records.

## Technologies Used
The Decentralized File Management System is built using the following technologies:

Frontend: React
Backend: Express
Blockchain: Ethereum
Wallet Integration: Freighter 

## Contributing
Contributions to the Decentralized File Management System project are welcome! To contribute:

### Fork the repository.
Create your feature branch: git checkout -b feature/NewFeature
Commit your changes: git commit -am 'Add some feature'
Push to the branch: git push origin feature/NewFeature
Submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Additional Documentation
For more detailed information:


## Additional Documentation
For more detailed information:
- [Stellar Documentation](https://developers.stellar.org/docs): Details Stellar and its documentation.
- [IPFS network provider](https://www.pinata.cloud/): IPFS provider used here
