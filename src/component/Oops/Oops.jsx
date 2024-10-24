import React from 'react'
import Image from 'next/image'
import gifimage from '../../../public/image/gif.svg';
import clases from '../../styles/customstyle.module.scss'
import { BsStarFill } from "react-icons/bs";
import 'swiper/css/navigation';
import "swiper/css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Dispensoriescart from '../../component/WeedDispansires/Dispensoriescart'
import ProductSearchResult from '../productcard/ProductSearchResult';
const Oops = (props) => {
  return (
    <>
      <div className={clases.oopss}>
        <div className={clases.errortext}>
          <Image unoptimized={true} width={100} height={100} src={gifimage.src} alt="no product" onError={(e) => (e.target.src = '/image/blankImage.jpg')} />
          <span>{`Menu Not Available`}</span>
          <p>{`This business hasn't posted its menu on Weedx.io yet. Click below to discover other nearby businesses`}</p>
          <span className={clases.back}>{`VIEW OTHER BUSINESSES`}</span>
        </div>
      </div>
      {Boolean(props?.AllReview?.length) &&
        <div>
          <div>
            <h4 className='oopsreviewheading'>{`What Customers Say about ${props.delBtn[0].Store_Name}`}</h4>
          </div>
          <Swiper className={`mySwiper similerproduxt`}
            spaceBetween={50}
            slidesPerView={2}
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2
              },
              1296: {
                slidesPerView: 2
              },
            }}>
            {
              props?.AllReview?.map((data, index) => {

                return (
                  <SwiperSlide key={index}>
                    <div key={index} style={styles.card}  >
                      <div style={styles.header}>
                        <div style={styles.profile}>
                          <Image
                            width={100}
                            height={100}
                            unoptimized
                            src={data.userImage} // Replace with the actual image source
                            alt="Profile"
                            style={styles.image}
                          />
                          <div>
                            <p style={styles.author}>{data.username}</p>
                          </div>
                          <div style={styles.rating}>
                            <span style={styles.star} >
                              {new Array(data.rating).fill(null).map((data, index) => (
                                <BsStarFill key={index} size={12} color="#31B665" />
                              ))}
                            </span>
                          </div>
                        </div>
                        <div style={styles.dateAndMenu}>
                          <span style={styles.date}>{data.created_at.slice(0, 10)}</span>
                        </div>
                      </div>

                      <div >
                        <h4 style={styles.contenth4}>{data.Title}</h4>
                        <div className='description-text' >

                          <p style={styles.content}>
                            {data.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )

              })
            }
          </Swiper>
          <div className='mt-5' >
            <h4 className='center nearbyStore'>{`Explore Other Nearby Dispensaries`}</h4>
            <h4 className='nearbystoreheading center'>{`Can’t find what you’re looking for? Check out these nearby dispensaries that have products available now.`}</h4>
          </div>
          <Swiper className={`mySwiper similerproduxt mt-5 `}
            spaceBetween={40}
            slidesPerView={2}
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2
              },
              1296: {
                slidesPerView: 3
              },
            }}>
            {
              props.store?.map((data, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Dispensoriescart ele={data} key={index} width={"100%"} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          <ProductSearchResult link={'/products'} RelatedProductResult={props?.allproduct} currentProductID={props?.allproduct[0]?.id} title={'Explore Nearby Products'} CategoryName={props?.allproduct[0]} />
        </div>
      }
    </>
  )
}


export default Oops

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "16px",
    borderRadius: "8px",
    width: "100%",
    margin: "auto",
    height: "206px",

  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
  },
  title: {
    margin: "0",
  },
  author: {
    fontSize: '14px',
    margin: "0",
    color: "#666",
  },
  dateAndMenu: {
    display: "flex",
    alignItems: "center",
  },
  date: {
    marginRight: "8px",
    color: "#999",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    margin: "12px 5px",
  },
  ratingValue: {
    fontWeight: "bold",
    marginRight: "4px",
  },
  star: {
    color: "#4CAF50",
  },
  content: {
    marginTop: '10px',
    fontSize: '14px',
    fontWeight: '400px',
    color: "#a5a5a5",
    // maxHeight:"150px"

  },
  contenth4: {
    fontSize: '14px',
    fontWeight: '500px',
    color: "#858585"

  }

};