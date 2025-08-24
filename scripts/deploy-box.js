// scripts/deploy-box.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const bal = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(bal), "ETH");

  const Box = await hre.ethers.getContractFactory("Box");
  const box = await Box.deploy();
  await box.waitForDeployment();

  const addr = await box.getAddress();
  console.log("Box deployed to:", addr);

  // quick test
  const tx = await box.store(42);
  await tx.wait();
  const v = await box.retrieve();
  console.log("Stored value now:", v.toString());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
