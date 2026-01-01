async function main() {
  // Get contract factory
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");

  // Deploy contract
  const certificateNFT = await CertificateNFT.deploy();

  await certificateNFT.deployed();

  console.log("CertificateNFT deployed to:", certificateNFT.address);
}

// Run script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
