const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.header.cookie === undefined) {
    // create a session for user
    // add to req
    // console.log(req.cookies)
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId}))
      .then((session) => {
        req.session = session;
        next();
      });
    
  } 
    
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

