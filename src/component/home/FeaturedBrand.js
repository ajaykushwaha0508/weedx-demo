import Image from 'next/image';
import  ScrollContainer  from 'react-indiana-drag-scroll';
import * as React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { modifystr } from "@/hooks/utilis/commonfunction";
import Link from 'next/link';
import clases from '@/styles/customstyle.module.css'
const Featuredbrand = ({ CardDataArray}) => {
    

    return (
        <div className="px-sm-0">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className={clases.section_main_title}>{`Featured Brands`}</h2>
                    <Link href='/brands'>
                        <span className={clases.viewallbtn}>{`View All`} <FaArrowRight   /></span>
                    </Link>
                </div>
                <ScrollContainer className="ScrollContainerRelative">
                    {
                        CardDataArray?.map((items, index) => {
                            return (
                                    <Link  href={`/brands/${modifystr(items.name)}/${items.id}`} key={index}>
                                        <div className={`${clases.FeaturedBrandImageContainer} px-0`}>
                                            <Image   onError={(e) => (e.target.src = '/image/blankImage.jpg')} priority width={100} height={100}  alt={items.name} title={items.name}  src={`${items.Brand_Logo}`} />
                                        </div>
                                    </Link>
                            )
                        })
                    }
                </ScrollContainer>
               
        </div>
    )
}
export default Featuredbrand