import React from 'react'
import Windgraph from '../components/Windgraph'
import Solargraph from '../components/Solargraph'
const Forteen_days = () => {
  return (
    <>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
            <div style={{display:'flex',justifyContent:'center',fontFamily:'calibri',fontSize:'40px'}}>
              <div>
                Energy Meter
              </div>
            </div>
            <Windgraph />
            <Solargraph />
        </div>

    </>
  )
}

export default Forteen_days