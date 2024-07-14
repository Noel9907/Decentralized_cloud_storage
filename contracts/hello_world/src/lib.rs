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