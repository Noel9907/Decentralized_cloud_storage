Decentralized Cloud-Like Storage System
Overview
This project aims to create a decentralized cloud-like storage system leveraging blockchain technology. It provides a secure, distributed, and reliable storage solution similar to traditional cloud services but decentralized.

Features
Decentralized Storage: Utilizes blockchain technology (Stellar) and IPFS for decentralized storage of files.
Smart Contracts: Implements smart contracts (written in Rust using Soroban SDK) for managing storage transactions securely.
Integration with MetaMask: Allows users to interact securely with the system through MetaMask for file upload and asset management.
API for File Operations: Provides endpoints for initializing storage, uploading files, pulling files, and managing assets.
Blockchain Integration: Supports Stellar blockchain for transactions and IPFS for file storage.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/Noel9907/Decentralized_cloud_like_storage_system.git
Install dependencies:
bash
Copy code
cd Decentralized_cloud_like_storage_system
npm install
Usage
Start the application:
sql
Copy code
npm start
Access the application at http://localhost:3000.
Configuration
MetaMask Integration: Ensure MetaMask is installed in your browser and connected to the correct network (Stellar).
Environment Variables: Set up environment variables for Stellar blockchain configuration and IPFS API endpoints.
Contributing
Contributions are welcome! Please fork the repository and submit pull requests to contribute to the development of the project.

License
This project is licensed under the MIT License.




# Soroban Project

## Project Structure

This repository uses the recommended structure for a Soroban project:
```text
.
├── contracts
│   └── hello_world
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── Cargo.toml
└── README.md
```

- New Soroban contracts can be put in `contracts`, each in their own directory. There is already a `hello_world` contract in there to get you started.
- If you initialized this project with any other example contracts via `--with-example`, those contracts will be in the `contracts` directory as well.
- Contracts should have their own `Cargo.toml` files that rely on the top-level `Cargo.toml` workspace for their dependencies.
- Frontend libraries can be added to the top-level directory as well. If you initialized this project with a frontend template via `--frontend-template` you will have those files already included.
