task('deploy', 'Deploys the smart contract')
  .setAction(async () => {
    const NFTsForUkraine = await ethers.getContractFactory('NFTsForUkraine')
    contract = await NFTsForUkraine.deploy()
    console.log(`Deployed the contract at address "${contract.address}"`)
  })
