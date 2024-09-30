
import * as React from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { Rating } from '@mui/material';
import useStyles from '../../styles/style';
import { FaArrowRight } from "react-icons/fa";
import { BiMap } from "react-icons/bi"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Createcontext from "../../hooks/context"
import { modifystr } from '../../hooks/utilis/commonfunction';
import Image from 'next/image';
import Link from 'next/link';
import clases from '@/styles/customstyle.module.scss'
// import { DespensioriesItem } from '@/hooks/apicall/api';
const DeliveryServices = ({ link, title, data , location , initialData }) => {
    let DeliveryService = data || []
    const navigate = useRouter()
    const { state } = React.useContext(Createcontext)
    const classes = useStyles()
    const ref = React.useRef(null);


    const handleImageError = (event) => {
        event.target.onerror = null; // Reset to prevent infinite loop
        event.target.src = "/weedx.iologo.png"; // Replace with your fallback image source
    };
    const getDeliveryHref = () => {
        if (state.Country && state.State && state.City && state.route) {
          return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}/${state.route.toLowerCase()}`;
        } else if (state.Country && state.State && state.City) {
          return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
        } else if (state.Country && state.State) {
          return `/weed-deliveries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
        } else if (state.Country) {
          return `/weed-deliveries/in/${state.Country.toLowerCase()}`;
        } else {
          return '/'; // Default fallback if no valid state is provided
        }
      };
      const getDispensariesHref = () => {
        if (state?.Country && state?.State && state?.City && state?.route) {
          return `/weed-dispensaries/in/${state?.Country.toLowerCase()}/${state.State.toLowerCase()}/${state?.City.toLowerCase()}/${state?.route.toLowerCase()}`;
        } else if (state?.Country && state?.State && state?.City) {
          return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}/${state.City.toLowerCase()}`;
        } else if (state?.Country && state?.State) {
          return `/weed-dispensaries/in/${state.Country.toLowerCase()}/${state.State.toLowerCase()}`;
        } else if (state?.Country) {
          return `/weed-dispensaries/in/${state.Country.toLowerCase()}`;
        } else {
          return '/'; // Default fallback if no valid state is provided
        }
      };
    return (
        <React.Fragment>
            <div className="px-sm-0 px-3">
                <div >
                    {
                        <React.Fragment>

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h2 className='section_main_title'>{title}</h2>
                                    {link === "weed-deliveries" && <h3 className='section_main_subtitle'>{location}</h3>}
                                </div>
                                <Link href={link === "weed-deliveries" ?getDeliveryHref() : getDispensariesHref()}>
                                    <span className={clases.viewallbtn}>View All <FaArrowRight /></span>
                                </Link>
                            </div>
                            {
                                
                                    Boolean(DeliveryService.length) ?
                                    <div className={clases.recentViewProductSlider} id="width" ref={ref}>
                                        <ScrollContainer className="ScrollContainerRelative">
                                            {DeliveryService?.map((items, index) => {
                                                return (
                                                    <div className={clases.dispensoriesContainer} key={index}>
                                                        <div className={clases.dispensoriesAddressBorder}>
                                                            <div className={clases.dispensoriesAddresCardimg}>
                                                                <Link href={`/${link}/${modifystr(items?.Store_Name)}/${items?.id}`}>
                                                                    <Image
                                                                        unoptimized={true}
                                                                        width={100}
                                                                        height={100}
                                                                        quality={100}
                                                                        src={items?.Store_Image}
                                                                        alt={items?.Store_Name.charAt(0)?.toUpperCase() + items?.Store_Name.slice(1)}
                                                                        title={items?.Store_Name.charAt(0)?.toUpperCase() + items?.Store_Name.slice(1)}
                                                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                                        className={`${clases.dispensories_image}  center-block`}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className={clases.dispensoriesContentContainer}>
                                                                <Link href={`/${link}/${modifystr(items?.Store_Name)}/${items?.id}`}>
                                                                
                                                                    <p className={`ellipsis ${clases.dispensoriesHeadings}`}>{items?.Store_Name.charAt(0).toUpperCase() + items?.Store_Name.slice(1)}</p>
                                                                        <div className={clases.Dispensaries_card_discription}>
                                                                            <span><BiMap className={classes.disPen_Icons} /></span>
                                                                            <p className='ellipsis mb-0'>{items?.Store_Address}</p>
                                                                        </div>
                                                                  
                                                                </Link>
                                                                <div className={clases.homecardRating}>
                                                                    <Link href={`/weed-dispensaries/${modifystr(items?.Store_Name)}/${'review'}/${items?.id}`}>
                                                                        <div className=' w-100 d-flex align-items-center gap-2'>
                                                                            <span className={clases.DeliveryServicesRatingTitle}>{items?.rating !== null ? items?.rating.toFixed(1) : 0}</span>
                                                                            <Rating className={classes.homePageStarIcons} color='#fff' name="read-only" value={items?.rating === null ? 0 : items?.rating} readOnly />
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className='col-12  mt-2'>
                                                                    <Box className={`${classes.loadingBtnTextAndBack}`} >
                                                                        <LoadingButton onClick={() => { navigate.push(`/${link}/${modifystr(items?.Store_Name)}/${items?.id}`) }} style={{ width: "100%" }}>{`Order Pickup`}</LoadingButton>
                                                                    </Box>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </ScrollContainer>
                                    </div>
                                    :
                                    <div className='nodeliveryinhomepage' >
                                        <div className='nodeliveryinhomeimage'>
                                            <Image
                                                 onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                width={100}
                                                unoptimized={true}
                                                height={100} src='/NOTDELIVERED.png' alt='NOTDELIVERED' title='NOTDELIVERED' />
                                        </div>
                                        <p>No Delivery Services available</p>
                                    </div>
                            }

                        </React.Fragment> 
                     
                    }
                </div>

            </div>
        </React.Fragment>
    )
}
export default DeliveryServices
