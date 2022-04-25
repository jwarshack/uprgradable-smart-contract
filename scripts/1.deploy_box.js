// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades} = require("hardhat");

async function main() {

  const Box = await ethers.getContractFactory("Box");
  const box = await upgrades.deployProxy(Box, [42], { initializer: 'store' });

  await box.deployed();

  console.log("Box proxy deployed to:", box.address);

  console.log(await upgrades.erc1967.getImplementationAddress(box.address)," implementation address")
  console.log(await upgrades.erc1967.getAdminAddress(box.address), " admin address")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
