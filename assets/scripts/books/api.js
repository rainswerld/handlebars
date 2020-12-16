'use strict'

const config = require('../config')

const getBooks = function () {
  return $.ajax({
    url: config.apiUrl + '/books'
  })
}

module.exports = {
  getBooks
}
