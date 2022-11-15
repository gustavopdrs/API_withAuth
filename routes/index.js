const { Router } = require('express');
const controleJogadores = require("../controladores/jogadores");
const controleElencos = require('../controladores/elencos');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var db = require('../db');

var ensureLoggedIn = ensureLogIn();


const rotas = new Router();

/* GET home page. */
rotas.get('/', function(req, res, next) {
  if (!req.user) { return res.render('home'); }
  next();
}, function(req, res, next) {
  res.locals.filter = null;
  res.render('index', { user: req.user });
});

rotas.route('/elencos')
     .get(ensureLoggedIn, controleElencos.getElencos)
     .post(ensureLoggedIn, controleElencos.addElenco)
     .put(ensureLoggedIn, controleElencos.updateElenco)

rotas.route('/elencos/:codigo')
     .get(ensureLoggedIn, controleElencos.getElencoPorCodigo)
     .delete(ensureLoggedIn, controleElencos.deleteElenco)

rotas.route('/jogadores')
   .get(ensureLoggedIn, controleJogadores.getJogadores)
   .post(ensureLoggedIn, controleJogadores.addJogador)
   .put(ensureLoggedIn, controleJogadores.updateJogador)

rotas.route('/jogadores/:codigo')
   .get(ensureLoggedIn, controleJogadores.getJogadorPorCodigo)
   .delete(ensureLoggedIn, controleJogadores.deleteJogador)


module.exports = rotas;
