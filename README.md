# Gallery 27

## TODOS
- [x] AI Scapes Collection ERC721
  - [X] `setAuctionContract(address) onlyOwner {}`
  - [x] `mint(...) onlyAuctionContractOrOwner {}`
- [ ] AI Scapes Auctions
  - [x] `initializeAuction(scape_id, endTimestamp)` - requires signature from Web API (Signer)
  - [x] `bid(scape_id, style, haiku) value` (alternatively only scape_id (w/o style, haiku), if much cheaper gas-wise)
    - [x] Event: `Bid(scape_id, bidder, style, haiku)` (check gas costs...)
  - [x] `claim(scape_id, ipfs_hash)`  - requires signature from Web API (Signer)
    - [x] ... calls the `mint` function on the collection
    - [x] ... pays out the funds to the respective recipients (Scape Owner, Team, DAO)
- [ ]

## Hardhat

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

## Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
