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
  it('retrieve returns a value previously stored', async function () {
    // Store a value
    await this.token.set_price(1000000);

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await this.token.get_price()).toString()).to.equal('1000000');
  });
});