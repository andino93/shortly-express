const _ = require('lodash');

const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    // split semi colon
    // map on array 
    // split on equal
    let semiColonSplit = req.headers.cookie.split('; ');
    if (semiColonSplit.length > 0) {
      let cookies = _.reduce(semiColonSplit, (acc, string) => {
        let tempArr = string.split('=');
        acc[tempArr[0]] = tempArr[1];
        return acc;
      }, {});
      req.cookies = cookies;
    } else {
      let keyValue = req.headers.cookie.split('=');
      let key = keyValue[0];
      let value = keyValue[1];
      let cookies = {};
      cookies[key] = value;
      req.cookies = cookies;
    }
    
    
    
    
    // console.log(req.headers.cookie)  
  }

  next();
};

module.exports = parseCookies;