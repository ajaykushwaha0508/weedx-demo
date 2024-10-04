import React from 'react'
import Image from 'next/image'
import gifimage from '../../../public/image/gif.svg';
import clases from '../../styles/customstyle.module.scss'
const Oops = () => {
  return (
    <div className={clases.oopss}>
        <div className={clases.errortext}>
            <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product"   onError={(e) => (e.target.src = '/image/blankImage.jpg')} />
            <span>{`Menu Not Available`}</span>
            <p >{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses `}</p>
            <span className={clases.back}>{`VIEW OTHER BUSINESSES`}</span>
        </div>
    </div>
  )
}
export default Oops