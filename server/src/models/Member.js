const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name: {type:String, required:true},
  role: {type:String, enum:['leader','agent','assistant','other'], default:'agent'},
  team: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}],
  createdAt: {type:Date, default: Date.now}
})

module.exports = mongoose.model('Member', MemberSchema)
