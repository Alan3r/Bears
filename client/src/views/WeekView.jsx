import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function WeekView(){
  const [data, setData] = useState([])

  useEffect(()=>{
    // fetch from backend
    axios.get('/api/performance/week')
      .then(res=>setData(res.data))
      .catch(()=>{
        // fallback mock
        setData([
          {name:'Anna Kowalska', week:[12,18,9,22,20,14]},
          {name:'Marek Zieliński', week:[6,8,5,12,9,7]},
          {name:'Ewa Lis', week:[4,7,3,6,5,8]}
        ])
      })
  },[])

  const avg = arr => (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(1)
  const total = arr => arr.reduce((a,b)=>a+b,0)

  return (
    <section className="view-container active">
      <div className="week-controls">
        <div className="week-info">
          <div className="week-label">Current Week</div>
          <div className="week-display">Mon — Sat</div>
        </div>
        <div className="week-buttons">
          <button className="week-nav-btn">Prev</button>
          <button className="week-nav-btn">Next</button>
          <button className="week-nav-btn new-week-btn">New Week</button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="add-member-btn">+ ADD TEAM MEMBER</button>
        <button className="edit-data-btn">Edit Data</button>
      </div>

      <div className="performance-table">
        <table>
          <thead>
            <tr>
              <th>Team / Agent</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Avg</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r,idx)=>{
              return (
                <tr key={idx}>
                  <td className="member-card">{r.name}</td>
                  {r.week.map((d,i)=> <td key={i} className="editable-cell">{d}</td>)}
                  <td className="metric-avg">{avg(r.week)}</td>
                  <td className="metric-value">{total(r.week)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
