import { ethers } from "hardhat";
import { expect } from "chai";

// Start test block
describe('Token', function () {
  before(async function () {
    this.Token = await ethers.getContractFactory('Token');
  });

  beforeEach(async function () {
    this.token = await this.Token.deploy();
    await this.token.deployed();

  });

  // Test case
  it('stores a new value', async function () {
    const new_token_price = 2000000000000

    // Store a value
    await this.token.setPrice(new_token_price);

    // Test if the returned value is the same one
    expect((await this.token.getPrice())).to.equal(new_token_price);
  });
});