const hre = require("hardhat");
const { FLASHLOAN_ADDRESS, FLASH_ASSET, FLASH_AMOUNT } = process.env;

async function main() {
  if (!FLASHLOAN_ADDRESS || !FLASH_ASSET || !FLASH_AMOUNT) {
    throw new Error("Missing FLASHLOAN_ADDRESS / FLASH_ASSET / FLASH_AMOUNT in .env");
  }

  const flash = await hre.ethers.getContractAt("FlashLoan", FLASHLOAN_ADDRESS);
  console.log("Requesting flash loan...");
  const tx = await flash.requestFlashLoan(
    FLASH_ASSET,
    hre.ethers.parseUnits(FLASH_AMOUNT, 18), // adjust decimals if needed
    "0x"
  );
  const rec = await tx.wait();
  console.log("Tx:", rec.transactionHash);
}

main().catch((e) => { console.error(e); process.exit(1); });
