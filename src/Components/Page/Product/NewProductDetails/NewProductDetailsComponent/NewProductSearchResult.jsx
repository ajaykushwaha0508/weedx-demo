import { ScrollContainer } from 'react-indiana-drag-scroll';
import * as React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoMdStar } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import IconButton from '@mui/material/IconButton';
import { BsStar, BsStarFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { IoShareSocialSharp } from "react-icons/io5"
import useStyles from '../../../../../Style';
import { WhisList } from '../../../../Component/Whishlist/WhisList';
import Createcontext from "../../../../../Hooks/Context"
import { WishListPost } from "../../../../Component/Whishlist/WishListApi_"
import '../NewProductDetails.css'
import { convertNwSeToNeSw } from 'google-map-react';
const NewProductSearchResult = ({ NewProductSearchRseultArray, heading }) => {
    const classes = useStyles()
    const [Whishlist, SetWishList] = React.useState(false)
    const { state, dispatch } = React.useContext(Createcontext)

    const handleWhishList = (id) => {
        if (state.login === false) {
            SetWishList(!Whishlist)
        }
        else {
            WishListPost(id).then(async (res) => {
                if (res.data.data === 'Remove From WishList') {
                    dispatch({ type: 'WishList', WishList: { ...state.WishList, [id]: !state.WishList[id] } })
                }
                else {
                    dispatch({ type: 'WishList', WishList: { ...state.WishList, [id]: true } })
                }
            }).catch((err) => { });
        }
    }
    const ref = React.useRef(null);
    return (

        <div className='dealsCard_wrapper'>
            <h2 className='section_main_title '>{heading}</h2>
            <div className="col-lg-12 col-12   recentViewProductSlider" id="width" ref={ref}>
                <ScrollContainer className=" newProductSearchResult_ScrollContainerRelative">
                    {NewProductSearchRseultArray?.map((items, index) => {

                        return (
                            <>

                                <div className="deals_card" key={index}>
                                    <div className="action_icons">
                                        <div className=" product_whish_list text-end">
                                            {state.login ? state.WishList[items.id] ?
                                                <Box className={classes.productSearchIcons}>
                                                    <IconButton onClick={() => { handleWhishList(items.id) }} aria-label="Example">

                                                        <AiFillHeart color={'#31B665'} size={18}></AiFillHeart>

                                                    </IconButton>
                                                </Box>
                                                :
                                                <Box className={classes.productSearchIcons}>
                                                    <IconButton onClick={() => { handleWhishList(items.id) }} aria-label="Example">

                                                        <AiOutlineHeart color={'#31B665'} size={18} />

                                                    </IconButton>
                                                </Box> :
                                                <Box className={classes.productSearchIcons}>
                                                    <IconButton onClick={() => { handleWhishList(items.id) }} aria-label="Example">

                                                        <AiOutlineHeart color={'#31B665'} size={18} />

                                                    </IconButton>
                                                </Box>
                                            }
                                        </div>
                                        <div className=" product_whish_list text-end ">
                                            <Box className={classes.productSearchIcons}>
                                                <IconButton aria-label="Example">
                                                    <IoShareSocialSharp color={'#31B665'} size={18} />
                                                </IconButton>
                                            </Box>
                                        </div>
                                    </div>
                                    <div className="card_img">
                                        <LazyLoadImage
                                            className="product_search_result_image"
                                            onError={event => {
                                                event.target.src = "/image/blankImage.jpg"
                                                event.onerror = null
                                            }}
                                            src={items?.images ? `${items?.images[0]?.image}` : items.imgUrl}
                                            alt={items.Product_Name}
                                            title={items.Product_Name}
                                            height={"100px"}
                                        />
                                    </div>
                                    <div className="col-12 product_search_result_content_div mt-4">
                                        <div className="row gap-0">

                                            <h3 className="productSearchResultParagraph text-truncate">{items.Product_Name}</h3>


                                            <p className="product_search_result_sub_heading text-truncate">by {items.StoreName}</p>


                                            <span className="product_search_result_span1"></span>
                                            {/* <span className="product_search_result_span2"><span className={` ${classes.disp_star_color}`}><IoMdStar className="product_search_rating_star" /></span>4.5 rating</span> */}
                                            <div className="product_cart_review">
                                                { new Array(items.rating).fill(null).map(() => (
                                                    <BsStarFill size={16} color="#31B665" className="product_search_rating_star" />
                                                ))}

                                                {new Array(5 - items.rating).fill(null).map(() => (
                                                    <BsStar size={16} color="#31B665" className="product_search_rating_star" />
                                                ))}
                                            </div>
                                            <p className="productSearch text-truncate"><span className="productSearchPrice">$ {items.Prices[0].Price[0].SalePrice != null ? items.Prices[0].Price[0].SalePrice : items.Prices[0].Price[0].Price}</span> <span className='productSearchPerDoller'>PER {items.Prices[0].Price[0].Weight != '' ? items?.Prices[0]?.Price[0]?.Weight : `${items.Prices[0]?.Price[0]?.Unit} Unit`}</span></p>

                                            <div className="col-12  my-2">
                                                <Box className={`center ${classes.loadingBtnTextAndBack}`}>
                                                    <LoadingButton style={{ width: "100%", height: "35px", fontSize: "14px" }}
                                                    >
                                                        Buy now
                                                    </LoadingButton>
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </ScrollContainer>

            </div>
            {Whishlist && <WhisList open1={Whishlist} SetWishList={SetWishList}></WhisList>}
        </div>

        //     </div>

        // </div>
    )
}
export default NewProductSearchResult