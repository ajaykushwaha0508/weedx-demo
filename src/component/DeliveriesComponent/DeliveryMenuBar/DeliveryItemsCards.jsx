import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from '../../../styles/style';
import { MdShoppingCart } from "react-icons/md"
import clases from "@/styles/customstyle.module.css"
import Link from 'next/link';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { modifystr } from '@/hooks/utilis/commonfunction';
const DeliveryItemsCard = ({ Deliverie }) => {
    const classes = useStyles()
    return (
        <div>
            {Deliverie?.map((items, index) => {
                return (
                    <div className={clases.delivery_items_cards_container} key={index}>
                        <div className='d-flex w-100 justify-content-between'>
                            <div className={clases.delivery_items_card_img_container}>
                                <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${items.id}`}>
                                    <Image
                                        priority
                                        width={100}
                                        height={100}
                                        className='w-100 h-auto'
                                        src={`${items.Store_Image}`}
                                        alt={items.Store_Name}
                                        title={items.Store_Name}
                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    />
                                </Link>
                            </div>
                            <div className={clases.delivery_items_card_info_container}>
                                    <h2 className={`ellipsis ${clases.DeliveryItem_heading}`}>{items.Store_Name}</h2>
                                    <div className={clases.homecardRating}>
                                        <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${"review"}/${items.id}`}>
                                            <div className="d-flex ">
                                                <span className={`${clases.disOPenResRating} text-white`}>{items.rating === null ? 0 : items.rating.toFixed(0) + ".0"}</span>
                                                <Rating className={`mx-2 ${classes.homePageStarIcons}`} color='green' name="read-only" value={items.rating === null ? 0 : parseFloat(items.rating.toFixed(1))} readOnly />
                                            </div>
                                        </Link>
                                    </div>
                                    <p className={`ellipsis ${clases.delivery_item_paragraph}`}>{items.Store_Address}</p>
                                    <p className={`ellipsis ${clases.delivery_item_paragraph}`}>{items.address2}</p>
                                   
                                    <div className={clases.categoryinfowrapper}>
                                        {
                                            items?.Categories?.map((data, index) => {
                                                return (<div className={clases.categoryinfo} key={index + 1}>
                                                    <p className={clases.delivery_item_paragraph}>{Object.keys(data)} ({Object.values(data)})</p>
                                                </div>
                                                )
                                            })

                                        }
                                    </div>
                            </div>
                        </div>
                        <div className={clases.delivery_items_button_div}>
                                <div className={clases.delivery_items_button}>
                                    {   (items.SetbyMin) !== null ?
                                        <div className={clases.deliverItemCard_icons}>
                                            <MdShoppingCart color='#707070' size={16} /> <span>{items.SetbyMin.Startmin || 0} min to {items.SetbyMin.Endmin || 0} min |</span>{items.DeliveryPrice !== 0 ? <span> ${items.DeliveryPrice} Delivery changes </span> : <span>Free delivery</span>}
                                        </div>
                                          :
                                        <div className={clases.deliverItemCard_icons}>
                                            <MdShoppingCart color='#707070' size={16} /> <span>30 to 90 min |</span> <span>Free delivery</span> |<span>$50 min</span>
                                        </div>
                                    }
                                </div>
                                <Box className={`${classes.loadingBtnTextAndBack}`} >
                                    <Link href={`/weed-deliveries/${modifystr(items.Store_Name)}/${items.id}`}><LoadingButton variant="outlined">View Menu</LoadingButton></Link>
                                </Box>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default DeliveryItemsCard