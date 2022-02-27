const daysInSeconds = days => days * 60 * 60 * 24
const nowInSeconds = () => Math.floor(Date.now() / 1000)

module.exports = {
  daysInSeconds,
  nowInSeconds,
}
