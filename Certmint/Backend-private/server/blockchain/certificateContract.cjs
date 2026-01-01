const { ethers } = require("ethers");
require("dotenv").config();

/* ================= SAFETY CHECKS ================= */
if (!process.env.SEPOLIA_RPC_URL) {
  throw new Error("SEPOLIA_RPC_URL missing");
}
if (!process.env.DEPLOYER_PRIVATE_KEY) {
  throw new Error("DEPLOYER_PRIVATE_KEY missing");
}
if (!process.env.CERTIFICATE_NFT_ADDRESS) {
  throw new Error("CERTIFICATE_NFT_ADDRESS missing");
}

/* ================= ABI ================= */
// ABI from Hardhat artifacts (READ ONLY)
const CertificateABI = require(
  "../../../blockchain/artifacts/contracts/CertificateNFT.sol/CertificateNFT.json"
);

/* ================= PROVIDER ================= */
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

/* ================= WALLET ================= */
const wallet = new ethers.Wallet(
  process.env.DEPLOYER_PRIVATE_KEY,
  provider
);

/* ================= CONTRACT ================= */
const certificateContract = new ethers.Contract(
  process.env.CERTIFICATE_NFT_ADDRESS,
  CertificateABI.abi,
  wallet
);

/* ================= WALLET BALANCE CHECK (IMPORTANT) ================= */
(async () => {
  try {
    const balance = await provider.getBalance(wallet.address);
    console.log(
      "💰 Deployer wallet address:",
      wallet.address
    );
    console.log(
      "💰 Deployer wallet balance:",
      ethers.formatEther(balance),
      "ETH"
    );

    if (balance === 0n) {
      console.warn(
        "⚠️ Wallet has 0 ETH. NFT minting WILL FAIL until funded."
      );
    }
  } catch (err) {
    console.error("❌ Failed to check wallet balance:", err);
  }
})();

/* ================= EXPORT ================= */
module.exports = {
  certificateContract,
  wallet,
};
