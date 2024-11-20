import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { Box, Grid } from '@mui/material';
const HomePageBanner = ({ props }) => {
  const handleImageError = (event) => {
    if (event.type === "error") {
      event.target.src = '/image/blankImage.jpg'; // Fallback image URL
    }
  };

  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  return (
<React.Fragment>
  <div className='homeBannerContainer'>

    {/* Desktop Images */}
    <Grid items display={{ xs: "none", md: "block", lg: "block" }}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 5000, // Reduced delay for faster LCP
          disableOnInteraction: false,
        }}
        style={{ zIndex: 0 }}
        modules={[Autoplay]}
      >
        {props?.reverse()?.map((items, index) => (
          <SwiperSlide key={index}>
            <div className={`col-12 homePageBanner_container`}>
              <a href={items?.Link || "#"} target="_blank" rel="noopener noreferrer">
                <Image
                  src={items?.Banner}
                  alt="Weedx.io Promotion banner"
                  title="Weedx.io Promotion banner"
                  width={1500}
                  height={500}
                  quality={100} // Adjusted for better compression
                  priority // Critical for LCP
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1500px"
                  className={'HomePageBanner_image'}
                  onError={handleImageError}
                  loader={imageLoader}
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>

    {/* Mobile Images */}
    <Grid items display={{ xs: "block", md: "none", lg: "none" }}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        style={{ zIndex: 0 }}
        modules={[Autoplay]}
      >
        {props?.reverse()?.map((items, index) => (
          <SwiperSlide key={index} style={{ height: '212px' }} className='homePageBanner_container'>
            <a href={items?.Link || "#"} target="_blank" rel="noopener noreferrer">
              <Image
                src={items?.mobile}
                alt="Weedx.io Promotion banner"
                title="Weedx.io Promotion banner"
                width={500}
                height={500}
                quality={100} // Reduced quality for mobile optimization
                loading="lazy" // Lazy load for non-critical images
                sizes="(max-width: 768px) 100vw, 50vw"
                className={'HomePageBanner_image'}
                onError={handleImageError}
                loader={imageLoader}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>

  </div>
</React.Fragment>

  );
}
export default HomePageBanner;
