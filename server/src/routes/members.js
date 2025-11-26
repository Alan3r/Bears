const express = require('express')
const asyncHandler = require('express-async-handler')
const Member = require('../models/Member')
const router = express.Router()

// GET /api/members
router.get('/', asyncHandler(async (req,res)=>{
  const members = await Member.find().lean()
  res.json(members)
}))

// POST /api/members
router.post('/', asyncHandler(async (req,res)=>{
  const {name, role} = req.body
  if(!name) return res.status(400).json({message:'Name required'})
  const m = new Member({name, role})
  await m.save()
  res.status(201).json(m)
}))

// PUT /api/members/:id
router.put('/:id', asyncHandler(async (req,res)=>{
  const m = await Member.findByIdAndUpdate(req.params.id, req.body, {new:true})
  res.json(m)
}))

// DELETE
router.delete('/:id', asyncHandler(async (req,res)=>{
  await Member.findByIdAndDelete(req.params.id)
  res.json({ok:true})
}))

module.exports = router
