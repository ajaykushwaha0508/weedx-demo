import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import HomePageBannerSkeleton from '../skeleton/DashBoardSkeleton/HomePageBannerSkeleton.jsx';
import clases from '@/styles/customstyle.module.scss'
const HomePageBanner = ({ props }) => {

    const [Skeletoncom, SetSkeleton] = React.useState(false)

    const handleImageError = (event) => {
        //  console.log(event.type === "error")
        if (event.type === "error") {
            // event.target.src = "/image/1.jpg"; // Fallback image URL
            // setImageError(true);
        }
    };

    const imageLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 100}`;
    }
    return (
        <React.Fragment>
            {
                !Skeletoncom ?
                    <div className={clases.homeBannerContainer}>
                        <div className={clases.destop_image}>
                            <Swiper loop={true} autoplay={{
                                delay: 25000,
                                disableOnInteraction: false,

                            }} style={{ zIndex: 0 }} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className={`col-12 ${clases.homePageBanner_container}`}>
                                                <a href={items?.Link !== null ? items?.Link : "#"}>
                                                    <Image
                                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                        src={items?.Banner}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={1500}
                                                        quality={1}
                                                        height={500}
                                                        priority
                                                        loader={imageLoader}
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
                                delay: 2000,

                                disableOnInteraction: true,
                            }} style={{ zIndex: 0 }} modules={[Autoplay]}>
                                {props?.reverse()?.map((items, index) => {

                                    return (
                                        <SwiperSlide key={index}>
                                            <div className={`col-12 ${clases.homePageBanner_container}`}>
                                                <a href={items?.Link !== null ? items?.Link : "#"}>
                                                    <Image
                                                        priority
                                                        src={items?.mobile}
                                                        alt="Weedx.io Promotion banner"
                                                        title="Weedx.io Promotion banner"
                                                        width={500}
                                                        height={10}
                                                        quality={30} // Adjusted quality
                                                        sizes="(max-width: 768px) 100vw, 50vw" // Responsive sizes for mobile and desktop
                                                        className={clases.HomePageBanner_image}
                                                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                        loader={imageLoader} // Consider removing if using default optimization
                                                    />
                                                </a>

                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    :
                    <HomePageBannerSkeleton />
            }


        </React.Fragment>
    )
}
export default HomePageBanner