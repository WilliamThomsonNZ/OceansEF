const { expect } = require("chai");
const { ethers } = require("hardhat");

//To test:
// - Mint , Mint multiple , Mint when sold out, Mint more than allowed in tx, Mint with incorrect ether value
// - Minting while contract paused
// - Updating the total supply
// - Withdrawing from the contract as the owner of the contract

describe("Oceans ERC721", function () {
  beforeEach(async function () {
    this.Oceans = await ethers.getContractFactory("Oceans");
    this.oceans = await this.Oceans.deploy();
    await this.oceans.deployed();
  });
  describe("Minting functionality", function () {
    it("should mint one token", async function () {
      const [owner, addr1] = await ethers.getSigners();
      const tx = await this.oceans.mint(1, {
        value: ethers.utils.parseEther("0.044"),
      });
      await tx.wait();

      const balance = await this.oceans.balanceOf(owner.address);
      expect(balance).to.equal(1);
    });

    it("should mint multiple tokens", async function () {
      const [owner, addr1] = await ethers.getSigners();

      const tx = await this.oceans.mint(3, {
        value: ethers.utils.parseEther("0.132"),
      });
      await tx.wait();
      const balance = await this.oceans.balanceOf(owner.address);
      expect(balance).to.equal(3);
    });
    it("Should fail to mint as it exceeds the amount of tokens per tx", async function () {
      await expect(
        this.oceans.mint(4, {
          value: ethers.utils.parseEther("0.176"),
        })
      ).to.be.revertedWith("3_PER_TX_MAX");
    });
    it("Should fail to mint as incorrect eth amount sent", async function () {
      await expect(
        this.oceans.mint(1, {
          value: ethers.utils.parseEther("0.05"),
        })
      ).to.be.revertedWith("INVALID_ETH_AMOUNT");
    });

    it("Should fail to mint as collection is sold out", async function () {
      const tx = await this.oceans.mint(3, {
        value: ethers.utils.parseEther("0.132"),
      });
      await tx.wait();
      const tx1 = await this.oceans.mint(3, {
        value: ethers.utils.parseEther("0.132"),
      });
      await tx1.wait();
      const tx2 = await this.oceans.mint(3, {
        value: ethers.utils.parseEther("0.132"),
      });
      await tx2.wait();
      const tx4 = await this.oceans.mint(1, {
        value: ethers.utils.parseEther("0.044"),
      });
      await tx4.wait();

      await expect(
        this.oceans.mint(1, {
          value: ethers.utils.parseEther("0.044"),
        })
      ).to.be.revertedWith("MAX_SUPPLY_REACHED");
    });
  });
  describe("Contract paused functionality", function () {
    it("Should set contract state to paused", async function () {
      const tx = await this.oceans.setContractPaused(true);
      await tx.wait();
      const pausedState = await this.oceans.paused();
      expect(pausedState).to.equal(true);
    });
    it("should revert when trying to mint when contract is paused", async function () {
      const tx = await this.oceans.setContractPaused(true);
      await tx.wait();
      await expect(
        this.oceans.mint(1, {
          value: ethers.utils.parseEther("0.044"),
        })
      ).to.be.revertedWith("MINTING_IS_PAUSED");
    });
  });

  describe("Updating the total supply", function () {
    it("Should update the total supply from 10 to 20", async function () {
      const tx = await this.oceans.updateTotalSupply(20);
      await tx.wait();
      const currentTotalSupply = await this.oceans.currentTotalSupply();
      expect(currentTotalSupply).to.equal(20);
    });
  });

  describe("Withdrawing from the contract after collection sells out", function () {
    it("Should withdraw the balance of the contract to the contract owner", async function () {
      const tx = await this.oceans.mint(3, {
        value: ethers.utils.parseEther("0.132"),
      });
      await tx.wait();
      const [owner] = await ethers.getSigners();
      const ownerBal = await owner.getBalance();
      const withdrawTx = await this.oceans.withdraw();
      await withdrawTx.wait();
      const ownerBalAfterWithdraw = await owner.getBalance();
      expect(Number(ownerBal)).to.be.lessThan(Number(ownerBalAfterWithdraw));
    });
  });
});
