var express = require('express');
var jwt = require('jwt-simple');
var router = express.Router();

var roles = require("../app.constants").roles
var secret = require("../app.constants").secret
var vessels = require("../app.constants").vessels

router.get('/', (req, res) => res.send('Seaspan Test API ⛴'));

router.post('/auth', (req, res) => {
  console.log(`WHAT IS BEING POSTED? ${JSON.stringify(req.body)}`);

  if (req.body.name === 'captain' && req.body.password === 'hook') {
    const randomUser = roles[Math.floor(Math.random() * roles.length)]
    const token = jwt.encode(randomUser, 'superdupersecret');
    res.json({ token })
  } else {
    res.json({ "error": "Incorrect credentials" })
  }
})

router.get('/vessels', (req, res) => {
  if (req.headers && req.headers.authorization) {
    try {
      jwt.decode(req.headers.authorization, secret, false, 'HS256')
      return res.json({ vessels })
    } catch (e) {
      return res.json({ error: "Invalid JWT. Please pass a valid JWT. See https://jwt.io/ for more about JWTs" })
    }
  }
  return res.json({ error: "No JWT provided. Please pass a valid JWT in the 'Authorization' request header. See https://jwt.io/ for more about JWTs" })
})

router.post('/add-vessel', (req, res) => {
  console.log(`What come? ${JSON.stringify(req.headers)}`)
  if (req.headers && req.headers.authorization) {
    try {
      jwt.decode(req.headers.authorization, secret, false, 'HS256')
      const newVessel = {
        name: req.body.name,
        size: req.body.size,
      }
      return res.json({ vessels: vessels.concat(newVessel) })
    } catch (e) {
      return res.json({ error: "Invalid JWT. Please pass a valid JWT. See https://jwt.io/ for more about JWTs" })
    }
  }
  return res.json({ error: "No JWT provided. Please pass a valid JWT in the 'Authorization' request header. See https://jwt.io/ for more about JWTs" })
})

module.exports = router;
