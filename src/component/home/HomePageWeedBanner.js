import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import useStyles from '../../styles/style';
import Axios from "axios";
import HomePageBannerSkeleton from '../../component/skeleton/DashBoardSkeleton/HomePageBannerSkeleton';
import Image from 'next/image';
import clases from '@/styles/customstyle.module.css'
const HomePageWeedBanner = ({ props }) => {


    const imageLoader = ({ src, width, quality }) => {
        return `${src}`
    }

    return (
        <div className={clases.homeBannerContainer}>
          
                <div className={clases.destop_image}>
                    <Swiper loop={true} autoplay={{
                        delay: 250000,

                        disableOnInteraction: false,
                    }} style={{ zIndex: 0 }} modules={[Autoplay]}>
                        {props?.reverse()?.map((ele, index) => {
                            return (
                                <SwiperSlide key={index}>

                                    <div className={`col-12 ${clases.homePageBanner_container}`} >
                                        <a href={ele.Link !== null ? ele.Link : "#"}>
                                            <Image onError={(e) => (e.target.src = '/blankImage.jpg')}
                                                priority
                                                width={1400} height={500}
                                                loader={imageLoader}
                                                src={`${ele?.Banner}`}
                                                alt="Weedx.io Promotion banner"
                                                title="Weedx.io Promotion banner"
                                                className={clases.HomePageBanner_image}
                                  

                                                />
                                        </a>
                                    </div>

                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
                <div className={clases.mobile_imges}>
                    <Swiper loop={true} autoplay={{
                        delay: 2500,

                        disableOnInteraction: false,
                    }} style={{ zIndex: 0 }} modules={[Autoplay]}>
                        {props?.reverse()?.map((ele, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className={`col-12 ${clases.homePageBanner_container}`}>
                                        <a href={ele.Link !== null ? ele.Link : "#"}>
                                            <Image priority
                                                onError={(e) => (e.target.src = '/blankImage.jpg')}
                                                width={100} height={10}
                                                loader={imageLoader}
                                                src={`${ele?.mobile}`}
                                                alt="Weedx.io Promotion banner"
                                                title="Weedx.io Promotion banner"
                                                className={clases.HomePageBanner_image}
                                               

                                                />
                                        </a>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
         
        </div>
    )
}
export default HomePageWeedBanner