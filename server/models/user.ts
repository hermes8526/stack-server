import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
  },
  scores: [
    { score: Number },
    { datetime: Date }
  ]
})

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    account: this.account
  }
}

module.exports = mongoose?.model('User', UserSchema);