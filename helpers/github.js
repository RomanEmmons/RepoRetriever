const request = require('request');
const config = require('../config.js');
const fs = require('file-system');

let getReposByUsername = (userName, callback) => {
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${config.TOKEN}`,
    },
  };
  request.get(options, function (error, response, body) {
    callback(null, body);
  });
};

module.exports.getReposByUsername = getReposByUsername;
