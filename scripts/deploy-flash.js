const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const providerAddr = process.env.AAVE_ADDRESSES_PROVIDER;
  if (!providerAddr) throw new Error(" Missing AAVE_ADDRESSES_PROVIDER in .env");

  const FlashBorrower = await ethers.getContractFactory("FlashBorrower");
  const borrower = await FlashBorrower.deploy(providerAddr);

  await borrower.waitForDeployment();

  console.log(" FlashBorrower deployed at:", await borrower.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
