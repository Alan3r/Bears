const express = require('express')
const asyncHandler = require('express-async-handler')
const Performance = require('../models/Performance')
const Member = require('../models/Member')
const router = express.Router()

// GET /api/history
router.get('/', asyncHandler(async (req,res)=>{
  // simple aggregation: last 5 weeks totals and per-member breakdown
  const weeks = await Performance.find().sort({weekStart:-1}).limit(20).populate('member').lean()
  const grouped = {}
  weeks.forEach(w=>{
    const key = w.weekStart.toISOString().slice(0,10)
    if(!grouped[key]) grouped[key] = {label:key, teamTotal:0, sales:{}}
    const sum = (w.values||[]).reduce((a,b)=>a+b,0)
    grouped[key].teamTotal += sum
    grouped[key].sales[w.member.name] = grouped[key].sales[w.member.name] ? grouped[key].sales[w.member.name]+sum : sum
  })
  const keys = Object.keys(grouped).sort().slice(-5)
  const labels = keys.map(k=>grouped[k].label)
  const teamTotals = keys.map(k=>grouped[k].teamTotal)
  const sales = {}
  keys.forEach(k=>{
    Object.keys(grouped[k].sales).forEach(name=>{
      sales[name] = sales[name] || []
      sales[name].push(grouped[k].sales[name])
    })
  })
  res.json({labels, teamTotals, sales})
}))

module.exports = router
