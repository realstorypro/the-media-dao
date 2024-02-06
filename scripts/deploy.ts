import { ethers } from "hardhat";

async function main() {
  const Token = await ethers.getContractFactory("Token");
  // const token = await Token.deploy(100, ethers.utils.parseEther("0.05"));
  const token = await Token.deploy(100000, ethers.utils.parseEther("45.00"));
  await token.deployed();

  console.log(
    `Deployed to ${token.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
