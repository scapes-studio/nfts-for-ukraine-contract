task('deploy', 'Deploys the smart contract')
  .setAction(async () => {
    const NFPeace = await ethers.getContractFactory('NFPeaceV2')
    contract = await NFPeace.deploy()
    console.log(`Deployed the contract at address "${contract.address}"`)
  })
