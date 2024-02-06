import { ethers } from "hardhat";
import { expect } from "chai";

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

  it('can burn tokens', async function(){
    const oldBalance = await this.token.balanceOf(this.owner.address);
    await this.token.burn(500)
    expect(await this.token.balanceOf(this.owner.address)).to.not.equal(oldBalance);
  });

  it('has a default price', async function () {
    expect((await this.token.getPrice())).to.equal(this.ONE_ETH);
  });

  it('stores a new price', async function () {
    const new_token_price = ethers.utils.parseEther("2.0")

    await this.token.setPrice(new_token_price);

    expect((await this.token.getPrice())).to.equal(new_token_price);
  });

});

describe('Selling Tokens', function () {
  before(async function () {
    [this.owner, this.addr1, this.addr2, this.addr3] = await ethers.getSigners()
    this.Token = await ethers.getContractFactory('Token');
    this.ONE_ETH = ethers.utils.parseEther("1.0")
  });

  beforeEach(async function () {
    this.token = await this.Token.deploy(100, this.ONE_ETH);
    await this.token.deployed();
  });

  it('receives tokens based on token price', async function(){
    await this.addr1.sendTransaction({to: this.token.address, value: this.ONE_ETH})
    expect(await this.token.balanceOf(this.addr1.address)).to.equal(1000000000000000000n)

  });

  it('no sale occurs if the token sale is paused', async function(){
    await this.token.pause();
    await expect(this.addr2.sendTransaction({to: this.token.address, value: this.ONE_ETH})).to.be
        .revertedWith("The bank is not selling tokens right now.")
  });

  it('can sell if the sale has been paused and un-paused', async function(){
    await this.token.pause();
    await this.token.unpause();

    await this.addr3.sendTransaction({to: this.token.address, value: ethers.utils.parseEther("2.0")})
    expect(await this.token.balanceOf(this.addr3.address)).to.equal(2000000000000000000n)
  });

  it('allows the owner to withdraw contract balance', async function(){
    await this.addr1.sendTransaction({to: this.token.address, value: this.ONE_ETH})
    await expect(await this.token.withdrawMoney()).to.changeEtherBalance(this.owner, 1000000000000000000n)
  });

  it('prevents non owner from withdrawing money', async function(){
    await this.addr2.sendTransaction({to: this.token.address, value: this.ONE_ETH})
    await expect(this.token.connect(this.addr1).withdrawMoney()).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
