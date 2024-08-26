import React from 'react'
import { Outlet } from 'react-router-dom'
import Menuintregrate from '../Components/Page/StoreDetail/StoreDetailComponent/Menuintregrate'

const EmbeddedLayout = () => {
  return (
    <div>
     
      <Menuintregrate></Menuintregrate>
      <div className='container-fluid'>
       <Outlet  />
      </div>
      <div className='integratedmanuFooter' style={{ backgroundColor: '#F6F6F6'}}>
        <p className='m-0 text-center'>A minimum age of 21 is required to place any order</p>
      </div>
    </div>
  )
}

export default EmbeddedLayout