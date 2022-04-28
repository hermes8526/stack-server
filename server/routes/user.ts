import express from 'express'

const {
  authenticate,
  authError
} = require('../middlewares/auth')

const router = express.Router()

const userCtrl = require('../controllers/user')

router.post('/login', userCtrl.login)
router.post('/saveScore', userCtrl.saveScore)
router.post('/getScores', userCtrl.getScores)

router.get('/test', [authenticate, authError], (req, res, next) => res.json({ 'msg': "it's working" }))

router.get('/me', [authenticate, authError], userCtrl.getMe)

module.exports = router