// import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiFillStar } from "react-icons/ai"
import { IoLocationSharp } from "react-icons/io5"
import { TbCircleFilled } from "react-icons/tb"
import { BsStar, BsStarFill } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";
import useStyles from '../../styles/style';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { RWebShare } from "react-web-share";
import React, { useMemo, useState } from 'react';
import { isShopOpen, modifystr } from '../../hooks/utilis/commonfunction'
// import { Link, useParams, useLocation } from 'react-router-dom';
import Link from "next/link";
import { useRouter } from "next/router"; 
import Image from "next/image";
import clases from '@/styles/customstyle.module.css'
const NewFlavourBanner = ({ delBtn }) => {
    const location = useRouter()
    const classes = useStyles()
    const [shopopen, setshopopen] = useState()
    React.useEffect(() => {
        const myTimeout = setTimeout(() => {
            setshopopen(isShopOpen(delBtn))
        }, 0);
    }, [new Date().getMinutes(), delBtn])
    return (
        <React.Fragment>
            <div className={clases.StoreHeader} >
           
               {  delBtn?.map((data, index) =>
                 {  
                    return  <div className="d-flex align-items-md-start align-items-center   gap-lg-5 gap-md-4 gap-2" key={index}>
                        <div className="d-inline">
                            <div className={clases.newFlavourimage_div}>
                                <Image
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    unoptimized={true}
                                    width={100}
                                    height={100}
                                    quality={100}
                                    className={clases.newFlavour_image}
                                    src={`${data?.Store_Image}`}
                                    alt={data.Store_Name}
                                    title={data.Store_Name}
                                />
                            </div>
                        </div>
                        <div className="d-inline">
                                    <h1 className={clases.StoreHeader_Heading}>{data.Store_Name}</h1>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <IoLocationSharp /><h4 id='' className={clases.newFlavourBannerSubHead}>{data.Store_Address}</h4>
                                    </div>
                                    <div className="d-none d-md-block">
                                        <div className="d-flex gap-3 my-2 align-items-center">
                                            <div className='d-flex gap-1 align-items-center'>
                                                <BsStarFill size={16} color="#FFD700" />
                                                <p className={clases.marginLeftnewFlavStore}>{data?.rating?.toFixed(1)}</p>
                                            </div>

                                            <div className='d-flex gap-1 align-items-center'>
                                                <TbCircleFilled size={16}  color={shopopen ? "#31B665" : "red"} />
                                                <p style={{color:shopopen ?"#31B655":"red"}} className={clases.marginLeftnewFlavStore}>{shopopen ? "Open" : "Closed"}</p>
                                            </div>
                                        </div>
                                        <div className=' d-flex  mt-3 gap-3 align-items-center '>
                                           

                                            {
                                                data.Stores_MobileNo !== '' && data.Stores_MobileNo !== null && <Box
                                                    className={`${classes.loadingBtnTextAndBack}`}    >
                                                    <Link href={`tel:${delBtn[0].Stores_MobileNo}`}>
                                                        <LoadingButton className={`${classes.storeheaderbtn}`} variant="outlined">{'Call'}</LoadingButton>
                                                    </Link>
                                                </Box>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                 })
                }
                {  
                    delBtn?.map((data, index) =>
                    { 
                       return  <div className="d-block d-md-none" key={index}>
                            <div className="d-flex gap-3 my-2 align-items-center">
                                <div className='d-flex gap-1 align-items-center'>
                                    <BsStarFill size={16} color="#FFD700" />
                                    <p className={clases.marginLeftnewFlavStore}>{data?.rating?.toFixed(1)}</p>
                                </div>
                                {/* 
                                        <div className='d-flex gap-1 align-items-center'>
                                            <TbCircleFilled  size={16} color="gray" />
                                            <Link
                                                href={location.pathname.includes("weed-dispensaries")
                                                    ? `${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`
                                                    :
                                                    location.pathname.includes("/weed-deliveries") &&

                                                    `/weed-deliveries/${modifystr(data.Store_Name)}/store-details/${delBtn[0].id}`}>

                                                <p className={clases.marginLeftnewFlavStore} >Store details</p></Link>
                                        </div>
                                */}

                                <div className='d-flex gap-1 align-items-center'>
                                    <TbCircleFilled size={16}  color={shopopen ? "#31B665" : "red"} />
                                    <p style={{color:shopopen ?"#31B655":"red"}} className={clases.marginLeftnewFlavStore}>{shopopen ? "Open" : "Closed"}</p>
                                </div>
                            </div>
                            <div className=' d-flex  mt-3 gap-3 align-items-center '>
                                {/* {
                                    data.StoreEmail !== "" && data.StoreEmail !== null &&
                                    <Box className={`${classes.loadingBtnTextAndBack}`}  >  <LoadingButton className={`${classes.storeheaderbtn}`} variant="outlined">{'Email'}</LoadingButton>
                                    </Box>
                                } */}

                                {
                                    data.Stores_MobileNo !== '' && data.Stores_MobileNo !== null && <Box
                                        className={`${classes.loadingBtnTextAndBack}`}    >
                                        <Link href={`tel:${delBtn[0].Stores_MobileNo}`}>
                                            <LoadingButton className={`${classes.storeheaderbtn}`} variant="outlined">{'Call'}</LoadingButton>
                                        </Link>
                                    </Box>
                                }
                            </div>
                        </div>
                    }
                 )
                }
                <div className={clases.storeShareBtn}>
                 <RWebShare
                        data={{ url: `https://www.weedx.io`+location.asPath }}
                        sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                        onClick={() => console.info("share successful!")}
                        color="#31B665" >
                        <BsShareFill color="#31B655" />
                 </RWebShare>
                </div>
            </div>
        </React.Fragment >
    )
}
export default NewFlavourBanner













