import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from 'swiper/modules';
import React from "react";
import 'react-indiana-drag-scroll/dist/style.css'
const NewProductCategorySlider = ({ flowerArray }) => {
    return (
        <>
            <div className="container-fluid">

                <div className="row  ">

                        
                    <div className="col-12 newProductCategorySliderContainer " id="width">
                      
                       <Swiper
                                breakpoints={{
                                    540: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 40,
                                    },
                                    991: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    1124: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                    1490: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                }}
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    pagination={{
                                        clickable: false,
                                    }}

                                    
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                        {flowerArray?.map((items, index) => {
                            return (
                                <SwiperSlide key={index}>
                                <div className="newProductCard mx-0 NewProductCategory_slider pt-2 " key={index}>


                                    <div className="col-12 center">
                                        <div className="newProduct_category_slider_image">

                                            <Link to={`/product/${items.name}/${items.id}`} >
                                            <LazyLoadImage
                                                    onError={event => {
                                                        event.target.src = "/image/blankImage.jpg"
                                                        event.onerror = null
                                                    }}
                                                    className="newProductCategory_image"
                                                    src={`${items?.SubCategoryImage}`}
                                                    alt={items.name}
                                                    title={items.name}
                                                    />
                                            </Link>
                                            
                                        </div>

                                        
                                    </div>
                                    <div className="col-12 d-flex center newProductCategorySliderName">
                                        <p className=" text-truncate">{items.name}</p>
                                    </div>
                                </div>
                                </SwiperSlide>
                            )
                        })}
                        </Swiper>
                        
                        </div>
                  
                    




                </div>

            </div>
        </>
    )
}
export default NewProductCategorySlider