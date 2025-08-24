const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const providerAddr =
    process.env.AAVE_ADDRESSES_PROVIDER ||
    process.env.AAVE_POOL_ADDRESSES_PROVIDER ||
    process.env.AAVE_POOL;

  if (!providerAddr) {
    throw new Error(
      "Missing AAVE provider/pool address. Set AAVE_ADDRESSES_PROVIDER in .env"
    );
  }

  console.log("Using provider/pool address:", providerAddr);

  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  const flash = await FlashLoan.deploy(providerAddr.trim());
  await flash.waitForDeployment();   // <-- wait for deployment confirmation

  const addr = await flash.getAddress();
  console.log("FlashLoan deployed to:", addr);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
