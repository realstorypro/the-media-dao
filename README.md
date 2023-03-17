# Media-DAO
The web3 media business-in-a-box.

[![Node.js CI](https://github.com/realstorypro/media-doa/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/realstorypro/media-doa/actions/workflows/node.js.yml)

## Rules of the Contract
1. The person who originally deployed the contract is considered an __owner__.
2. The contract acts as bank and mints tokens when users send eth to contract address.
3. The token supply is unlimited, but the ability for the bank to mint token can be turned on and off by the __owner__ by calling the  ```pause()``` and ```unppause()``` functions.
4. The token price is set and can be updated by the __owner__ by calling the ```setPrice()``` function passing a numeric value such as ```1000000000000000000n``` to represent 1eth.
5. The price of token can always be retrieved by calling ``getPrice()``.
3. The 

## Setup

### Running Tests
```shell
npm run test
```

## Deployment
In this example we will be deploying to [Sepolia Testnet](https://www.alchemy.com/overviews/sepolia-testnet).

### Getting the API Keys
1. Signup for a free [Alechemy](https://alchemy.com/) account.
2. On the menubar click __Apps__ -> __Create App__
3. Ensure that the new app you are creating is using __Sepolia__ network.
 
<img src="docs/project.png" width="700" alt="Screenshot of Spolia Create App Screen"/>

4. After the app has been created click on __View Keys__ button located underneath the main nav.

<img src="docs/alchemy-keys.png" width="700" alt="Screenshot of the Keys screen"/>

5. Create ```.env``` file in the root directory and populated it with API_KEY and API_URL
```bash
    API_KEY = "API_KEY"
    API_URL = "https://eth-sepolia.g.alchemy.com/v2/API_KEY"
```



### Deploying to Blockchain
```shell
npx hardhat run scripts/deploy.ts --network sepolia
```

If successful this will return deployed __CONTRACT ADDRESS__.

```bash
Deployed to 0x562B9B7BE96E1687DA93589db0568d80Ec0dADB6
```

### Upload to Etherscan
Next thing to do is to upload the contract to etherscan so people can read the actual code.
```bash
# Replace CONTACT_ADDRESS with contract address from previous step.
npx hardhat verify --constructor-args test/etherscan-arguments.js  --network sepolia CONTRACT_ADDRESS
```



```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
