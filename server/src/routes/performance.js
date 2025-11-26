const express = require('express')
const asyncHandler = require('express-async-handler')
const Performance = require('../models/Performance')
const Member = require('../models/Member')
const router = express.Router()

// GET /api/performance/week?start=YYYY-MM-DD
router.get('/week', asyncHandler(async (req,res)=>{
  // for simplicity, return latest week's performances with populated member names
  const docs = await Performance.find().sort({weekStart:-1}).limit(10).populate('member').lean()
  // map by member name and take latest per member
  const map = {}
  docs.forEach(d=>{ if(!map[d.member._id]) map[d.member._id]=d })
  const out = Object.values(map).map(d=>({name:d.member.name, week:d.values}))
  res.json(out)
}))

// POST to add performance
router.post('/', asyncHandler(async (req,res)=>{
  const {memberId, weekStart, values} = req.body
  const p = new Performance({member:memberId, weekStart: new Date(weekStart), values})
  await p.save()
  res.status(201).json(p)
}))

module.exports = router
