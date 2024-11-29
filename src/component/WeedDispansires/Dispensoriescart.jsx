import React from 'react'
import useStyles from "../../styles/style";
import Box from '@mui/material/Box';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingButton from '@mui/lab/LoadingButton';
// import {isShopOpen} from '../../../../Hooks/Function'
import Link from 'next/link';
import { Rating } from '@mui/material';
import { modifystr, isShopOpen } from '../../hooks/utilis/commonfunction';
import Image from 'next/image';
import newclases from '@/styles/customstyle.module.css'
const Dispensoriescart = (props) => {
    const { ele } = props
    const classes = useStyles()
    return (
        <div className={`${props.type === "swiper" && 'w-100'}   ${newclases.despensories_card_container}`} >
            <div className="row">
                <div className={`col-4 ${newclases.disensories_card_image_div}`}>
                    <Link href={`/weed-dispensaries/${modifystr(ele?.Store_Name)}/${ele.id}`}>
                        <Image
                             src={ele?.Store_Image || '/image/blankImage.jpg'} // Default image agar Store_Image na ho
                            //  onError={(e) => (e.target.src = '/image/blankImage.jpg')} // Default image
                            onError={(e) => {
                                // Infinite loop prevent karne ke liye check karein
                                if (e.target.src.endsWith('/images/blankImage.jpg')) {
                                  console.error(`Fallback image also failed to load: ${e.target.src}`);
                                  return; // Agar fallback bhi fail ho to stop kar dein
                                }
                            
                                console.error(`Image failed to load for ID: ${ele?.id}, URL: ${ele?.Store_Image}`);
                                e.target.src = '/images/blankImage.jpg'; // Fallback image set karein
                              }}
                            priority 
                             width={100} 
                             height={100} 
                             id={ele?.id} 
                             alt={ele.Store_Name || 'Default Image'} 
                             title={ele.Store_Name || 'Default Image'} 
                             className={newclases.dispensories_card_image} 
                        />
                    </Link>

                </div>
                <div className={`col-8 ${newclases.dispenosries_card_content_div}`}>

                    <p title={ele.Store_Name} className={`text-truncate ${newclases.dispensoriesHeadingName}`}>
                        <Link href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${ele.id}`}>
                            <span >{ele.Store_Name}</span>
                        </Link>             </p>

                    <p className={`text-truncate ${newclases.dispensorieAddressNames}`}>{ele.Store_Address}</p>
                    <div className={newclases.dispensories_buttonsContainer}>
                        <button className={newclases.dispensories_open_res_btn} style={{ color: isShopOpen([ele]) ? "#31B665" : "red" }}>{isShopOpen([ele]) ? 'Open' : "Closed"}</button>
                        {ele.Delivery && <button className={newclases.dispensories_open_res_btn}>{`Order Online`}</button>}

                        {ele.CurbSide_Pickup && <button className={newclases.dispensories_open_res_btn}>{`Pickup delivery`}</button>}

                        {ele.StoreFront && <button className={newclases.dispensories_open_res_btn}>{'Store Front'}</button>}
                    </div>
                    <div className={newclases.homecardRating}>
                        <Link href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${"review"}/${ele.id}`}>
                            <div className="d-flex">
                                <span className={newclases.disOPenResRating}>{ele?.rating !== null ? ele?.rating.toFixed(1) : 0}</span>
                                <Rating className={`mx-2 ${classes.homePageStarIcons}`} color='green' name="read-only" value={ele.rating === null ? 0 : ele.rating} readOnly />
                            </div>
                        </Link>
                    </div>
                    <div className="col-12">
                        <Box className={classes.loadingBtnTextAndBack}>
                            <Link href={`/weed-dispensaries/${modifystr(ele.Store_Name)}/${ele.id}`}>
                                <LoadingButton style={{ width: "100%", height: "30px" }}>{`Order Pickup`}</LoadingButton>
                            </Link>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dispensoriescart