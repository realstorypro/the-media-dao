import { ethers } from "hardhat";
import { expect } from "chai";

// Start test block
describe('Token', function () {
  before(async function () {
    this.Token = await ethers.getContractFactory('Token');
  });

  beforeEach(async function () {
    const ONE_ETH = 1000_000_000_000_000_000n

    this.token = await this.Token.deploy(100, ONE_ETH);
    await this.token.deployed();
  });

  // Test case
  it('has a default value', async function () {
    // Test if the returned value is the same one
    const ONE_ETH = 1000_000_000_000_000_000n
    expect((await this.token.getPrice())).to.equal(ONE_ETH);
  });

  it('stores a new value', async function () {
    const new_token_price = 2000_000_000_000_000_000n

    // Store a value
    await this.token.setPrice(new_token_price);

    // Test if the returned value is the same one
    expect((await this.token.getPrice())).to.equal(new_token_price);
  });
});