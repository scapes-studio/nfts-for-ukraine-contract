# NFTsForUkraine

The PunkScape team and community wants to contribute towards helping the Ukrainian people in these sad and confusing times.

Community member `vault0x.eth` kindly donated Twenty Seven Year Scape (27YS) *“Day 19: Half and side the rein”* with the request to the PunkScape team to do a charity auction.

![***[Day 19: Half and side the rein](https://punkscape.xyz/gallery27/19)***](https://cdn.punkscape.com/ai-scapes/2769/55f406c3-7bf4-4fb6-b13c-617de6ebdda2/steps/143.png)
<small>*[Day 19: Half and side the rein](https://punkscape.xyz/gallery27/19)*</small>

This will be the first auction on “NFTsForUkraine”, but ***we will allow anyone to donate NFTs of their choosing to be sold by charity auction via the contract and website to raise funds for Ukraine.***  NFTsForUkraine is different than many auction services in that it adds no fees to the auction.  The auction contract is designed to maximize proceeds from the auction going directly to fund the Ukrainian People (although the auction still requires gas fees as required by the Ethereum blockchain).

All proceeds will go to [Unchain.Fund](http://Unchain.Fund).  You can read more about Unchain.Fund [here](https://unchain.fund/).  Unchain.Fund is a charity project created by blockchain activists and endorsed by Vitalik Buterin that focuses on humanitarian aid.  The NFTsForUkraine auction contract has the Unchain.Fund wallet address hard-coded into it as the destination for proceeds raised.

More details: https://punkscape.notion.site/NFTsForUkraine-c106840a11ae4a8a8d7e8bb2ec5c879a

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
