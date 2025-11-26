import React, {useEffect, useState} from 'react'
import { Line, Bar } from 'react-chartjs-2'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export default function HistoryView(){
  const [history, setHistory] = useState(null)
  useEffect(()=>{
    axios.get('/api/history').then(r=>setHistory(r.data)).catch(()=>setHistory({
      labels:['Wk1','Wk2','Wk3','Wk4','Wk5'],
      teamTotals:[120,150,132,180,160],
      sales:{'Anna Kowalska':[40,48,36,56,50],'Marek Zieliński':[30,40,32,48,36],'Ewa Lis':[20,30,28,36,28]}
    }))
  },[])

  if(!history) return <div>Loading...</div>

  const lineDatasets = Object.keys(history.sales).map((k,i)=>({label:k,data:history.sales[k],borderColor: i===0? '#d4af37': (i===1? '#b8860b':'#8b6e2f'),backgroundColor:'transparent'}))
  const lineData = {labels:history.labels,datasets:lineDatasets}
  const barData = {labels:history.labels,datasets:[{label:'Team Total',data:history.teamTotals,backgroundColor:'#d4af37'}]}

  return (
    <section className="view-container active">
      <div className="charts">
        <div>
          <Line data={lineData} />
        </div>
        <div>
          <Bar data={barData} />
        </div>
      </div>
    </section>
  )
}
