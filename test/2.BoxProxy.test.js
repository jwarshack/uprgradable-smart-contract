const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const {BigNumber} = require('ethers')

describe("Box proxy", function () {

  let box

  beforeEach(async () => {
    const Box = await ethers.getContractFactory("Box")

    box = await upgrades.deployProxy(Box, [42], {initializer: 'store'})

  })

  it("should retrieve value", async () => {
    expect(await box.retrieve()).to.equal(BigNumber.from('42'))

    await box.store(100)
    expect(await box.retrieve()).to.equal(BigNumber.from('100'))
  })


})