const crypto = require('crypto')

module.exports = function (text) {
  const hash = crypto.createHash('md5')
  hash.update(text)
  return hash.digest('hex')
}