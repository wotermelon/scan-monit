const requireContext = require('../utils/require-context')

const files = requireContext('..', true, /\.js$/)

console.log(files)