import React from 'react'
import clases from '@/styles/customstyle.module.css'

const NearStores = () => {
  return (
    <div>
        <h1 className={`$ {clases.section_main_title} text-center`}  >{`Explore Other Nearby Dispensaries`}</h1>
        <p>{`Can't find what you're  looking for? Check out these`}</p>
    </div>
  )
}

export default NearStores