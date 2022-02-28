const { expect } = require('chai')
const { ethers } = require('hardhat')
const { nowInSeconds } = require('../helpers/time')

const PUNKSCAPE = '0x51Ae5e2533854495f6c587865Af64119db8F59b4'
const NFPEACE = '0x0000000011E48D382b4F627437A2bBAc3b10F90e'

describe.only('FloatingIslandRetriever', function () {
  let
    FloatingIslandRetriever,
    floatingIslandRetrieverContract,
    nfPeaceContract,
    punkScapeContract,
    PunkScapeMockContract,
    punkScapeMockContract,
    owner,
    person1,
    person2,
    addrs

  before(async () => {
    FloatingIslandRetriever = await ethers.getContractFactory('FloatingIslandRetriever')
    nfPeaceContract = await ethers.getContractAt('NFPeace', NFPEACE)
    punkScapeContract = await ethers.getContractAt('IERC721', PUNKSCAPE)

    PunkScapeMockContract = await ethers.getContractFactory('PunkScapeMock')
    punkScapeMockContract = await PunkScapeMockContract.deploy()
    await punkScapeMockContract.deployed()

    // Snyc to now...
    const now = nowInSeconds()
    await hre.network.provider.send('evm_setNextBlockTimestamp', [now])
    await hre.network.provider.send('evm_mine');

    // Get user addresses
    [ owner, person1, person2, ...addrs ] = await ethers.getSigners()

    // floatingIslandRetrieverContract = await FloatingIslandRetriever.deploy(PUNKSCAPE)
    floatingIslandRetrieverContract = await FloatingIslandRetriever.deploy(punkScapeMockContract.address)
    await floatingIslandRetrieverContract.deployed()

    await floatingIslandRetrieverContract.fill({
      value: ethers.utils.parseEther('10'),
    })
  })

  it(`NFPeace has punkScape 393`, async () => {
    expect(await punkScapeMockContract.ownerOf(393)).to.equal(nfPeaceContract.address)
    expect(await punkScapeContract.ownerOf(393)).to.equal(nfPeaceContract.address)
  })

  it(`Allows the deployer to initialize the auction`, async () => {
    await floatingIslandRetrieverContract.initializeAuction()

    const auction = await nfPeaceContract.getAuction(1)
    expect(auction.tokenContract).to.equal(floatingIslandRetrieverContract.address)
    expect(auction.tokenId).to.equal(393)
    expect(auction.latestBidder).to.equal(nfPeaceContract.address)
    expect(auction.latestBid).to.equal(0)
    expect(auction.tokenERCStandard).to.equal(721)
    expect(auction.settled).to.equal(false)

    // Do a bid
    await nfPeaceContract.connect(person1).bid(1, { value: ethers.utils.parseEther('1') })

    const afterAuction = 24 * 60 * 60 + 20 // 24h and 20s
    await hre.network.provider.send('evm_increaseTime', [afterAuction])
    await hre.network.provider.send('evm_mine')

    console.log(await nfPeaceContract.getAuction(1))
    console.log(`RETREIVER ADDRESS`, floatingIslandRetrieverContract.address)

    expect(await punkScapeContract.ownerOf(393)).to.equal(nfPeaceContract.address)
    expect(await punkScapeMockContract.ownerOf(393)).to.equal(nfPeaceContract.address)

    await nfPeaceContract.settle(1)
    console.log('SETTLED')

    expect(await punkScapeContract.ownerOf(393)).to.equal(person1.address)
  })
})
