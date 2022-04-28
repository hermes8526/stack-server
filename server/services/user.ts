const User = require('../models/user')

const findUserByAccount = async account => {
  const usr = await User.findOne({ account: account })
  return usr;
}

const addUser = async user => {

  const usr = new User(user)
  const result = await usr.save()
  return result
}

const getUsers = async () => {

  const users = await User.aggregate([
    {
      $group: {
        _id: "$_id",
        account: { $first: "$account" },
        score: { $sum: { $sum: "$scores.score" } },
        count: { $sum: { $sum: 1 } },
      }
    },
    {
      $sort: { score: -1 }
    }
  ])
  return users
}

const updateUser = async (account, score) => {

  const usr = await User.findOne({ account: account })
  const result = await User.findOneAndUpdate({ account }, { scores: [...usr.scores, { score: score, datetime: Date.now() }] })
  return result
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  findUserByAccount
}