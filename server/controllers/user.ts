const userService = require('../services/user')

let scoreArr = [10, 15, 20, 25, 30, 40]

const rangeRandom = (min: number, max: number) => {
  return min + Math.random() * (max - min)
}

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
  let {
    account,
    score,
    isCompetition
  } = req.body

  const usr = await userService.findUserByAccount(account)
  if (usr) {

    score = Number(score)
    let isWin = 0
    let bonus = 0
    if (isCompetition === 1) {
      const index = rangeRandom(0, 4).toFixed(0)
      if (score > scoreArr[index]) {
        bonus = 10
        score = score + bonus
        scoreArr[index] = score
        isWin = 1
      }
    }

    const result = await userService.updateUser(account, score)
    const usr = await userService.findUserByAccount(account)
    return res.json({
      error: null,
      result: usr,
      isWin: isWin,
      bonus: bonus
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