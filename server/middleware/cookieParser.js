const _ = require('lodash');

const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    req.cookies = {};
    let semiColonSplit = req.headers.cookie.split('; ');
    if (semiColonSplit.length > 0) {
      req.cookies = _.reduce(semiColonSplit, (acc, string) => {
        let tempArr = string.split('=');
        acc[tempArr[0]] = tempArr[1];
        return acc;
      }, {});
    } else {
      let keyValue = req.headers.cookie.split('=');
      req.cookies[keyValue[0]] = keyValue[1];
    }
  }

  next();
};

module.exports = parseCookies;