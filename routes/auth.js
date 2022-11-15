var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
var db = require('../db');


// Configure the Google strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'profile' ]
}, function verify(issuer, profile, cb) {
  db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    issuer,
    profile.id
  ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) {
      db.run('INSERT INTO users (name) VALUES (?)', [
        profile.displayName
      ], function(err) {
        if (err) { return cb(err); }
        var id = this.lastID;
        db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
          id,
          issuer,
          profile.id
        ], function(err) {
          if (err) { return cb(err); }
          var user = {
            id: id,
            name: profile.displayName
          };
          return cb(null, user);
        });
      });
    } else {
      db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false); }
        return cb(null, row);
      });
    }
  });
}));
  
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const controleElencos = require('../controladores/elencos');
const seguranca = require('../controladores/seguranca')
const controleJogadores = require("../controladores/jogadores");
var router = express.Router();
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.route('/elencos')
     .get(seguranca.verificaJWT, controleElencos.getElencos)
     .post(seguranca.verificaJWT, controleElencos.addElenco)
     .put(seguranca.verificaJWT, controleElencos.updateElenco)

router.route('/elencos/:codigo')
     .get(seguranca.verificaJWT, controleElencos.getElencoPorCodigo)
     .delete(seguranca.verificaJWT, controleElencos.deleteElenco)

router.route('/jogadores')
   .get(seguranca.verificaJWT, controleJogadores.getJogadores)
   .post(seguranca.verificaJWT, controleJogadores.addJogador)
   .put(seguranca.verificaJWT, controleJogadores.updateJogador)

router.route('/jogadores/:codigo')
   .get(seguranca.verificaJWT, controleJogadores.getJogadorPorCodigo)
   .delete(seguranca.verificaJWT, controleJogadores.deleteJogador)

router.route("/login")
   .post(seguranca.login) 
module.exports = router;
