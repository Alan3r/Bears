import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function TeamView(){
  const [members, setMembers] = useState([])
  useEffect(()=>{
    axios.get('/api/members').then(r=>setMembers(r.data)).catch(()=>setMembers([
      {id:1,name:'Anna Kowalska',role:'leader'},
      {id:2,name:'Marek Zieliński',role:'agent'},
      {id:3,name:'Ewa Lis',role:'agent'}
    ]))
  },[])

  const leaders = members.filter(m=>m.role==='leader')
  const agents = members.filter(m=>m.role!=='leader')

  return (
    <section className="view-container active">
      <div className="org-chart">
        <div className="tree-level">
          {leaders.map(l=> (
            <div className="tree-node root" key={l.id}>
              <div className="member-card">
                <div className="name">{l.name}</div>
                <div className="role-badge role-leader">Lider</div>
              </div>
              <div className="tree-children">
                {agents.map(a=> (
                  <div className="tree-node" key={a.id}>
                    <div className="member-card">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
