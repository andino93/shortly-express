const models = require('../models');
const Promise = require('bluebird');

const createNewSession = (req, res, session, callback) => {
  // res.cookies = {};
  session.user = {username: req.body.username};
  req.session = session;
  req.cookies = {
    shortlyid: {value: session.hash}
  };
  // console.log(req.body)
  res.cookie('shortlyid', session.hash);
  callback();
};

module.exports.createSession = (req, res, next) => {
  // console.log(req.url)
  if (req.cookies && Object.keys(req.cookies).length > 0) {
    // models.Users.get({username: req.body.username})
    // .then((user) => 
      models.Sessions.get({hash: req.cookies.shortlyid})
      .then(session => {
        req.session = session;
        next();
      })
      .catch(() => {
        models.Sessions.create()
          .then(session => createNewSession(req, res, session, () => next()));
      });
    // create a session for user
    // add to req
    // console.log(req.cookies)
    
  } else {
    models.Sessions.create()
      .then(({insertId}) => models.Sessions.get({id: insertId}))
      .then(session => createNewSession(req, res, session, () => next()))
      .catch(err => console.log(err));
  }
};

// save server session and cookie to clients browser

// res.cookie('cookieName', value {expires: newDAte () + ???, maxAge:})

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/



// module.exports.verifySession  //TODO
//  avail to all server routes that require login
//  require users to log in to see shortenedd links and create new ones
//  do not requre user to login wehn using a prev shortened link

// give user a way to log out
//  what happens to server session and cookie saved to clients browser?