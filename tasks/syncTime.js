const { nowInSeconds } = require('./../helpers/time')

task('syncTime', 'Sync the blockchain time to now', async (_, hre) => {
  const now = nowInSeconds()
  await hre.network.provider.send('evm_setNextBlockTimestamp', [now])
  await hre.network.provider.send('evm_mine')

  const block = await ethers.provider.getBlock('latest')

  console.log(`Now is ${now} and blocktime is ${block.timestamp}`)
})
