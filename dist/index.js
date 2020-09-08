
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./netlify-plugin-cache-nextjs.cjs.production.min.js')
} else {
  module.exports = require('./netlify-plugin-cache-nextjs.cjs.development.js')
}
