// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades} = require("hardhat");

const proxyAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'

async function main() {

  console.log(proxyAddress, 'original box proxy address')

  const BoxV2 = await ethers.getContractFactory("BoxV2")

  const boxV2 = await upgrades.upgradeProxy(proxyAddress, BoxV2)

  console.log(boxV2.address, " Boxv2 address (should be same)")

  console.log(await upgrades.erc1967.getImplementationAddress(boxV2.address)," implementation address")
  console.log(await upgrades.erc1967.getAdminAddress(boxV2.address), " admin address")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
