import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdPlace } from "react-icons/md"
import { GoStar } from "react-icons/go"
import useStyles from "../../../../Style"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import React from "react"
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'
const RecentViewProduct = () => {
    const classes = useStyles()
    const ref = React.useRef(null);
    const FlowerArray = [{ imgUrl: "/image/cat_pro_img4.png", name: "flower" },
    { imgUrl: "/image/glass.png", name: "Capsules" },
    { imgUrl: "/image/flower2.webp", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/flower2.webp", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },
    { imgUrl: "/image/glass.png", name: "All American" },


    ]

    return (

        <div className="container-fluid" >
            <div className="row">
                <div className="col-12   recentViewProductSlider" id="width" ref={ref}>
                    <ScrollContainer className=" RecentViewScrollContainerRelative">
                        {FlowerArray.map((items, index) => {
                            // console.log(FlowerArray)
                            return (

                            <div className='recentViewContainer col-12  col-sm-6 col-md-6 col-lg-4 col-xl-3' key={index}>

                                <div className='recentViewProductBorder mx-1'>

                                        <div className="col-12 center recentViewImageContainer p-2">
                                            <LazyLoadImage className="recentView_images"
                                              src={items.imgUrl}
                                              alt="image not availble" 
                                              title="image not availble"
                                            />
                                        </div>
                                        <div className="col-12 recentViewProductContent_container">

                                                <div className="w-100 ">
                                                    <h4 className="recentViewProduct_heading">Urban flavour delivery</h4>

                                                </div>
                                                <div className="w-100 recentViewProductParagraph">
                                                    <p><span><MdPlace className={`${classes.homePage_iconsColor}`} /></span> <span className="recentView_place">Berkeley California</span></p>

                                                </div>
                                                
                                                <div className="w-100 recentViewProductParagraph">
                                                <GoStar className={`${classes.disp_star_color}`} size={20}/><span className=" recentView_rating">4.5 Rating</span>
                                                    {/* <p><span><GoStar className={`${classes.disp_star_color}`} size={16}/></span><span className="mx-1 recentView_rating">4.5 Rating</span></p> */}
                                                </div>
                                                <div className="w-100 recentViewProduct_BtnContainer">
                                                    <Box
                                                        className={` center ${classes.loadingBtnTextAndBack}`}
                                                        style={{ width: "100%" }}
                                                    >



                                                        <LoadingButton style={{ width: "80%" }} variant="outlined"> Order Now</LoadingButton>
                                                    </Box>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ScrollContainer>
                </div>
            </div>

        </div>

    )
}
export default RecentViewProduct