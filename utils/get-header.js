/**
 * aaa-bbb-cc => Aaa-Bbb-Ccc
 * @param {*} text
 * @returns {string}
 */
function toFirstUpper (text) {
  return text
    .toLowerCase()
    .split('-')
    .map(item => item.slice(0, 1).toUpperCase() + item.slice(1))
    .join('-')
}

/**
 * 获取 headers 中的字段值
 * @param {object} headers
 * @param {string} key 字段key
 * @returns {string}
 */
function getHeader (headers, key) {
  const _key = key.toLowerCase()
  return headers[_key] || headers[toFirstUpper(_key)]
}

module.exports = getHeader