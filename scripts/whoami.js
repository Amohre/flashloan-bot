require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const addr = await signer.getAddress();
  const bal  = await hre.ethers.provider.getBalance(addr);
  console.log("Deployer:", addr);
  console.log("Balance:", hre.ethers.formatEther(bal), "ETH");
}

main().catch((e) => { console.error(e); process.exit(1); });
