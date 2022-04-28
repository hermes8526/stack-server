import express from 'express'

const router = express.Router()
const userRoutes = require('./routes/user');

router.get('/health-check', (req, res) =>
  res.send('OK')
)

router.use('/user', userRoutes);

module.exports = router;