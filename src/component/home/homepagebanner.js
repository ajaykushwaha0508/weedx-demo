import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { Box, Grid , useMediaQuery} from '@mui/material';
import destokig from '../../../public/destokig.png'
import { A11y } from 'swiper/modules';
const HomePageBanner = ({ props , btype }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const handleImageError = (event) => {
    if (event.type === "error") {
      event.target.src = '/blankImage.jpg'; // Fallback image URL
    }
  };
  const imageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 100}`;
  };

  console.log(isMobile)
  return (
      <div className="homeBannerContainer">
      <Swiper
        loop
        autoplay={{
          delay: isMobile ? 5000 : 1000, // Adjust delay based on screen size
          disableOnInteraction: false,
        }}
        style={{
          zIndex: 0,
          height: isMobile ? '212px' : '390px',
        }}
        a11y={{ enabled: true }}
        modules={[Autoplay, A11y]}
      >
        {btype !== 'submainbanner' && (
          <SwiperSlide>
            <div className="hm_banner">
              <div className="hm_bannerGlass">
                <div className="hm_banner-content">
                  <h1 className="hm_banner-heading">{'Find Weed Near You'}</h1>
                  <p className="hm_banner-description">
                    {'Locate nearby dispensaries, view menus, and enjoy fast pickup or delivery with WeedX.io.'}
                  </p>
                </div>
                <div className="hm_banner-image">
                  {/* <Image src={destokig} width={100} height={100} alt="Banner Image" /> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        )}
        {props?.reverse()?.map((items, index) => (
          <SwiperSlide key={index}>
            <div className="homePageBanner_container">
              <a href={items?.Link || '#'} target="_blank" rel="noopener noreferrer">
                <Image
                  src={isMobile ? items?.mobile : items?.Banner}
                  alt="Weedx.io Promotion Banner"
                  title="Weedx.io Promotion Banner"
                  width={isMobile ? 500 : 100}
                  height={isMobile ? 500 : 100}
                  quality={isMobile ? 60 : 100} // Adjust quality based on screen size
                  sizes={isMobile ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 1200px) 80vw, 1500px'}
                  className="HomePageBanner_image"
                  onError={handleImageError}
                  loader={imageLoader}
                  priority={index === 0} // Eager load the first image
                />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default HomePageBanner;


























      // <div className='homeBannerContainer'>
      //   <Grid item display={{ xs: "none", md: "block", lg: "block" }}>
      //     <Swiper
      //       loop={true}
      //       autoplay={{ 
      //         delay: 1000, // Reduced delay for faster LCP
      //         disableOnInteraction: false,
      //       }}
      //       style={{
      //         zIndex: 0,
      //         height:'390px'
      //       }}
      //       a11y={{ enabled: true }}
      //       modules={[Autoplay, A11y]}
      //     >
      //       {btype !== 'submainbanner'
      //        &&
      //         <SwiperSlide >
      //           <div class="hm_banner">
      //             <div className='hm_bannerGlass'>
      //               <div class="hm_banner-content">
      //                   {/* <h1 class="hm_banner-heading">{'Find Weed Near You'}</h1> */}
      //                   <p class="hm_banner-description">
      //                      {'Locate nearby dispensaries, view menus, and enjoy fast pickup or delivery with WeedX.io.'}
      //                   </p>
      //               </div>
      //               <div class="hm_banner-image">
      //                   {/* <Image src={destokig} width={100} height={100} alt="Banner Image" /> */}
      //               </div>
      //             </div>
      //           </div>
      //         </SwiperSlide>
      //         }
      //           {props?.reverse()?.map((items, index) => (
      //             <SwiperSlide key={index}>
      //               <div className={`col-12 homePageBanner_container`}>
      //                 <a href={items?.Link || "#"} target="_blank" rel="noopener noreferrer">
      //                 <Image
      //                   src={items?.Banner}
      //                   alt="Weedx.io Promotion banner"
      //                   title="Weedx.io Promotion banner"
      //                   width={100}
      //                   height={100}
      //                   quality={100} // High quality for desktop
      //                   priority={index === 0} // Eager load the first image
      //                   // placeholder="blur"
      //                   // blurDataURL="/image/blankImage.jpg" // Placeholder image
      //                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1500px"
      //                   className={'HomePageBanner_image'}
      //                   onError={handleImageError}
      //                   loader={imageLoader}
      //                 />
      //                 </a>
      //               </div>
      //             </SwiperSlide>
      //           ))}
      //         </Swiper>
      //   </Grid>
        
      //   <Grid item display={{ xs: "block", md: "none", lg: "none" }}>
      //     <Swiper
      //       loop={true}
      //       autoplay={{
      //         delay: 5000,
      //         disableOnInteraction: false,
      //       }}
      //       style={{ zIndex: 0 }}
      //       a11y={{ enabled: true }}
      //       modules={[Autoplay, A11y]}
      //     >
      //        {btype !== 'submainbanner'
      //         && <SwiperSlide  style={{ height: '212px' }} className='homePageBanner_container'>
      //           <div class="hm_banner">
      //             <div className='hm_bannerGlass'>
      //               <div class="hm_banner-content">
      //                   {/* <h1 class="hm_banner-heading">{'Find Weed Near You'}</h1> */}
      //                   <p class="hm_banner-description">
      //                      {'Locate nearby dispensaries, view menus, and enjoy fast pickup or delivery with WeedX.io.'}
      //                   </p>
      //               </div>
      //               <div class="hm_banner-image">
      //                   {/* <Image src={destokig} width={100} height={100} alt="Banner Image" /> */}
      //               </div>
      //             </div>
      //           </div>
      //         </SwiperSlide>}

      //       {props?.reverse()?.map((items, index) => (
      //         <SwiperSlide key={index} style={{ height: '212px' }} className='homePageBanner_container'>
      //           <a href={items?.Link || "#"} target="_blank" rel="noopener noreferrer">
      //           <Image
      //              src={items?.mobile }
      //             // src={items?.mobile || '/image/blankImage.jpg'}
      //             alt="Weedx.io Mobile Promotion Banner"
      //             title="Weedx.io Mobile Promotion Banner"
      //             width={500}
      //             height={500}
      //             quality={60} // Reduced quality for mobile
      //             sizes="(max-width: 768px) 100vw, 50vw"
      //             className={'HomePageBanner_image'}
      //             onError={handleImageError}
      //             loader={imageLoader}
      //             priority={index === 0}
      //           />
      //           </a>
      //         </SwiperSlide>
      //       ))}
      //     </Swiper>
      //   </Grid>
      // </div>