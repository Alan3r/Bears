const mongoose = require('mongoose')
const Member = require('./models/Member')
const Performance = require('./models/Performance')

async function seed(){
  await mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/lead-site')
  await Member.deleteMany({})
  await Performance.deleteMany({})

  const a = await Member.create({name:'Anna Kowalska', role:'leader'})
  const b = await Member.create({name:'Marek Zieliński', role:'agent'})
  const c = await Member.create({name:'Ewa Lis', role:'agent'})

  const weeks = []
  for(let i=4;i>=0;i--){
    const date = new Date(); date.setDate(date.getDate() - i*7)
    weeks.push(date)
  }

  for(const w of weeks){
    await Performance.create({member:a._id, weekStart:w, values:[14,20,12,24,22,16]})
    await Performance.create({member:b._id, weekStart:w, values:[6,8,5,12,9,7]})
    await Performance.create({member:c._id, weekStart:w, values:[4,7,3,6,5,8]})
  }
  console.log('seeded')
  process.exit(0)
}

seed().catch(e=>{console.error(e);process.exit(1)})
