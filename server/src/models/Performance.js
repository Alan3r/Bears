const mongoose = require('mongoose')

const PerformanceSchema = new mongoose.Schema({
  member: {type: mongoose.Schema.Types.ObjectId, ref: 'Member', required:true},
  weekStart: {type: Date, required: true},
  values: [{type:Number}], // Mon..Sat
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Performance', PerformanceSchema)
