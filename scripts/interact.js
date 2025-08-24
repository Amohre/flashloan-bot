const hre = require("hardhat");
const { ethers } = hre;
require("dotenv").config();

async function main() {
  const addr = process.env.FLASHLOAN_ADDRESS;
  if (!addr) throw new Error("Missing FLASHLOAN_ADDRESS in .env");
  if (!hre.ethers.utils.isAddress(addr)) {
    throw new Error(`Not a valid address: ${addr}`);
  }

  // whos sending the tx
  const [signer] = await hre.ethers.getSigners();
  console.log("Using account:", await signer.getAddress());
  console.log("Contract address:", addr);

  // make sure contract code exists there
  const code = await hre.ethers.provider.getCode(addr);
  if (code === "0x") throw new Error("No contract code at that address");

  // attach to your deployed contract (name must match your .sol contract)
  const borrower = await hre.ethers.getContractAt("FlashBorrower", addr, signer);

  // list available functions
  const fns = borrower.interface.fragments
    .filter(f => f.type === "function")
    .map(f => f.name);
  console.log("Functions:", fns);

  // try calling a flashloan function if env vars are set
  const flashNames = ["flashBorrow", "initiateFlashLoan", "requestFlashLoan", "flashLoan"];
  const flashFn = flashNames.find(n => fns.includes(n));

  if (flashFn && process.env.FLASH_ASSET && process.env.FLASH_AMOUNT) {
    const asset = process.env.FLASH_ASSET;
    const amount = hre.ethers.utils.parseUnits(process.env.FLASH_AMOUNT, 18); // adjust decimals if needed
    console.log(`Calling ${flashFn}(${asset}, ${amount.toString()})...`);
    const tx = await borrower[flashFn](asset, amount);
    console.log("Tx hash:", tx.hash);
    const rcpt = await tx.wait();
    console.log("Mined in block:", rcpt.blockNumber);
  } else {
    console.log("No flash function found or FLASH_ASSET/FLASH_AMOUNT missing; skipping call.");
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
