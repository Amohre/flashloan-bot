const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", await deployer.getAddress());
  console.log("Balance (wei):", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  const Factory = await hre.ethers.getContractFactory("Ping");
  const contract = await Factory.deploy();      // no args, super simple
  await contract.waitForDeployment();
  console.log("Ping deployed at:", await contract.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
