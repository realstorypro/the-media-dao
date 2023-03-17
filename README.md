# Media-DAO
The web3 media business-in-a-box.

[![Node.js CI](https://github.com/realstorypro/media-doa/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/realstorypro/media-doa/actions/workflows/node.js.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![OpenZeppelin](https://img.shields.io/badge/OpenZeppelin-4.8.2-orange)](https://www.openzeppelin.com/contracts)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.9-green)](https://docs.soliditylang.org/en/v0.8.19/)


## How Contract Works
1. The person who originally deployed the contract is considered an __owner__.
2. The contract acts as bank and mints tokens when users send eth to contract address.
3. The token supply is unlimited, but the ability for the bank to mint token can be turned on and off by the __owner__ by calling the  ```pause()``` and ```unppause()``` functions.
4. The token price is set and can be updated by the __owner__ by calling the ```setPrice()``` function passing a numeric value such as ```1000000000000000000n``` to represent 1eth.
5. The price of token can always be retrieved by calling ``getPrice()``.
6. Pausing, un-pausing, and changing token price all emit events for increased visibility.


## Setup

1. Install the dependencies with NPM install.

```bash
npm install
```

2. Compile the contract with 

```bash
npx hardhat compile
```

3. Run Tests with
```shell
REPORT_GAS=true npx hardhat test --network hardhat
```

## Customization
1. Navigate to ```contracts``` directory and open the file named ```Token.sol```
&nbsp;
2. Change the token name and symbol by editing the following line and replacing ```Token``` and ```TKN``` with the values of your choosing.
```solidity
constructor(uint256 initialMint, uint256 initialPrice) ERC20("Token", "TKN") {
```
3. Navigate to ```scripts``` fodler and open file named ```etherscan-arguments.js ```
```javascript
module.exports = [
    100,
    1000000000000000000n
]
```
4. The first number represents the number of tokens to be sent to the contract deployer (premint). The second number represents the initial token price when purchased form a Bank (1 ether).
5. Modify the ```etherscan-arguments.js``` with the appropriate values to meet your tokenomic model.

## Deployment
In this example we will be deploying to [Sepolia Testnet](https://www.alchemy.com/overviews/sepolia-testnet).

### Getting the API Keys
#### Alechemy
1. Signup for a free [Alechemy](https://alchemy.com/) account.
2. On the menubar click __"Apps"__ -> __"Create App"__
3. Ensure that the new app you are creating is using __Sepolia__ network.
 
<img src="docs/project.png" width="700" alt="Screenshot of Spolia Create App Screen"/>

4. After the app has been created click on __"View Keys"__ button located underneath the main nav.

<img src="docs/alchemy-keys.png" width="700" alt="screenshot of the alchemy keys screen"/>

5. Create ```.env``` file in the root directory and populated it with ```API_KEY``` with value from API_KEYand ```API_URL``` with value from HTTPS.
```bash
    API_KEY = "API_KEY"
    API_URL = "https://eth-sepolia.g.alchemy.com/v2/API_KEY"
```

----

#### Etherscan
1. Visit [etherscan.io](https://www.etherscan.io) and signup for a [free account](https://etherscan.io/register).
2. Once logged in, press your username on the top right, and select the __"My profile"__ button.
3. Click on the __"API-KEYs"__ button the left hand side and then press the __"Add"__ button.
 
<img src="docs/etherscan-api-key.png" width="700" alt="screenshot of the etherscan keys screen"/>

4. Add the API key to the .env file you've created in the previous step.
```bash
ETHERSCAN_API_KEY = "YOUR_API_KEY"
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
npx hardhat verify --constructor-args scripts/etherscan-arguments.js  --network sepolia CONTRACT_ADDRESS
```


## Acknowledgements
- [Alchemy ERC-20 Token Tutorials](https://docs.alchemy.com/docs/erc-20-tokens )


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License
[MIT](https://choosealicense.com/licenses/mit/)



