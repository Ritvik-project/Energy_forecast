import React from 'react'
import Dashboard1 from '../components/Dashboard1'
import Dashboard2 from '../components/Dashboard2'
import Dashboard3 from '../components/Dashboard3'

const Dashboard = () => {
  return (
    <>
        <div style={{display:'flex',justifyContent:'center',fontFamily:'calibri',fontSize:'40px'}}>
        {/* <div style={{position:'absolute',left:'0',padding:'10px'}}>
          Energy Meter
        </div> */}
        <div>
          DASHBOARD
        </div>
        </div>
        <div>
            <Dashboard1 />
        </div>
        <div style={{display:'flex',justifyContent:'center',fontSize:'20px'}}>
          Today's data
        </div>
        <div>
            <Dashboard2 />
        </div>
        {/* <div>
            <Dashboard3 />
        </div> */}
    </>
  )
}

export default Dashboard