const { expect } = require("chai");
const { ethers } = require("hardhat");
const {BigNumber} = require('ethers')

describe("Box", function () {

  let box

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box");
    box = await Box.deploy();
    await box.deployed();
  })
  it("should retrieve value", async function () {
    await box.store(42)
    expect(await box.retrieve()).to.equal(BigNumber.from('42'))

    await box.store(100)
    expect(await box.retrieve()).to.equal(BigNumber.from('100'))


  });
});
