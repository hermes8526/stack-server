const userService = require('../services/user')

const login = async (req, res, next) => {
  const {
    account
  } = req.body

  const usr = await userService.findUserByAccount(account)
  if (!usr) {
    const user = {
      account,
      sores: []
    }
    //must add validate signMsg
    const usrRes = await userService.addUser(user)
    return res.json({
      error: null,
      result: usrRes
    })
  }
  return res.json({
    error: null,
    result: "Your account is already registered."
  })
}

const saveScore = async (req, res, next) => {
  const {
    account,
    score
  } = req.body

  const usr = await userService.findUserByAccount(account)
  if (usr) {
    const result = await userService.updateUser(account, Number(score))
    return res.json({
      error: null,
      result: result
    })
  }
  return res.json({
    error: "your account is not registered.",
  })
}

const getScores = async (req, res, next) => {
  const result = await userService.getUsers()
  return res.json({
    error: null,
    result: result
  })
}

const getMe = (req, res, next) => {
  res.json({
    account: req.account
  })
}

module.exports = {
  login,
  getMe,
  getScores,
  saveScore
}