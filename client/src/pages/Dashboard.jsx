import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeekView from '../views/WeekView'
import TeamView from '../views/TeamView'
import HistoryView from '../views/HistoryView'

export default function Dashboard(){
  const [tab, setTab] = useState('week')
  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Executive Dashboard</h1>
          <p>Clean, professional, data-driven interface</p>
        </div>
        <nav className="navigation">
          <button className={`nav-btn ${tab==='week'?'active':''}`} onClick={()=>setTab('week')}>Current Week</button>
          <button className={`nav-btn ${tab==='team'?'active':''}`} onClick={()=>setTab('team')}>Team Structure</button>
          <button className={`nav-btn ${tab==='history'?'active':''}`} onClick={()=>setTab('history')}>Performance History</button>
        </nav>
        <div className="actions">
          <button className="add-member-btn">+ ADD TEAM MEMBER</button>
        </div>
      </header>

      <main>
        {tab==='week' && <WeekView />}
        {tab==='team' && <TeamView />}
        {tab==='history' && <HistoryView />}
      </main>
    </div>
  )
}
