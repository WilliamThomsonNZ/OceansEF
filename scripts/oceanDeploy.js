const hre = require("hardhat");

async function main() {
  const Oceans = await hre.ethers.getContractFactory("Oceans");
  const oceans = await Oceans.deploy();

  await oceans.deployed();

  console.log("Oceans deployed to:", oceans.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
