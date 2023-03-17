import { ethers } from "hardhat";
import { expect } from "chai";

// Start test block
describe('Managing Token', function () {
  before(async function () {
    [this.owner] = await ethers.getSigners()

    this.Token = await ethers.getContractFactory('Token');

    this.ONE_ETH = ethers.utils.parseEther("1.0")
  });

  beforeEach(async function () {
    this.token = await this.Token.deploy(100, this.ONE_ETH);
    await this.token.deployed();
  });

  it('assigns initial tokens to the owner', async function() {
    const ownerBalance = await this.token.balanceOf(this.owner.address);
    expect(await this.token.totalSupply()).to.equal(ownerBalance);
  });

  it('has a default price', async function () {
    expect((await this.token.getPrice())).to.equal(this.ONE_ETH);
  });

  it('stores a new price', async function () {
    const new_token_price = ethers.utils.parseEther("2.0")

    // Store a value
    await this.token.setPrice(new_token_price);

    // Test if the returned value is the same one
    expect((await this.token.getPrice())).to.equal(new_token_price);
  });
});

describe('Selling Tokens', function () {
  before(async function () {
    [this.owner, this.addr1, this.addr2] = await ethers.getSigners()

    this.Token = await ethers.getContractFactory('Token');

    this.ONE_ETH = ethers.utils.parseEther("1.0")
  });

  beforeEach(async function () {
    this.token = await this.Token.deploy(100, this.ONE_ETH);
    await this.token.deployed();
  });

  it('receives ether based on price', async function(){
    await this.addr1.sendTransaction({to: this.token.address, value: this.ONE_ETH})
    // const balance = await ethers.provider.getBalance(this.token.address)

    expect(await this.token.balanceOf(this.addr1.address)).to.equal(1)

  });
});
