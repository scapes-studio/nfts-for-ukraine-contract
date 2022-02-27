task('deploy', 'Deploys the smart contract')
  .setAction(async () => {
    const NFPeace = await ethers.getContractFactory('NFPeace')
    contract = await NFPeace.deploy()
    console.log(`Deployed the contract at address "${contract.address}"`)
  })
