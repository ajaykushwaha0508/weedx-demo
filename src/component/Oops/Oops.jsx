import React, { useState } from 'react'
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Oops = (props) => {
  var date = new Date();
  const easternTime = date.toLocaleString("en-US", { timeZone: "America/New_York" })
  let day = new Date(easternTime)

  const faq1 = [
    {
      title: `Where is ${props?.delBtn[0]?.Store_Name} located?`,
      answer: `${props?.delBtn[0]?.Store_Name} is located at ${props?.delBtn[0]?.Store_Address}.`
    },
    {
      title: `What are the operating hours of ${props?.delBtn[0]?.Store_Name}?`,
      answer: (
        <div>
          {props?.delBtn[0]?.Hours?.map((items, idxe) => {
            const isToday = day.getDay() - 1 === idxe; 
            if (items.close) {
              return (
                <p
                  key={idxe}
                  className={`${isToday ? "highlightToday" : ""} d-flex`}>
                  <span className="w-50">{`${items.day} `}</span>
                  <span className="w-50">Close</span>
                </p>
              );
            } else {
              return items.Open?.map((ite, index) => {
                if (index === 0) {
                if (ite.Time1 === "24 Hours" || ite.Time2 === "24 Hours") {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">24 Hours</span>
                    </p>
                  );
                } else if (ite.Time1 === "00:00" || ite.Time2 === "00:00") {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">Closed</span>
                    </p>
                  );
                } else {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">{`${ite.Time1} - ${ite.Time2}`}</span>
                    </p>
                  );
                }
              }
              return null;
            });
            }
          })}
        </div>
      )
    },
    {
      title: `How can I contact ${props?.delBtn[0]?.Store_Name}?`,
      answer: `You can contact ${props?.delBtn[0]?.Store_Name} by phone at ${props.delBtn[0].Stores_MobileNo}`
    }
  ];

const faq = [
    {
      title: `What is the service area for ${props?.delBtn[0]?.Store_Name} ?`,
      answer: `${props?.delBtn[0]?.Store_Name} delivers to ${props?.delBtn[0]?.Store_Address}.`
    },
    {
      title: `What are the delivery hours for  ${props?.delBtn[0]?.Store_Name}?`,
      answer: (
        <div>
          <span>${props?.delBtn[0]?.Store_Name}</span>
          <span>{` offers delivery from`}</span>
      
          {props?.delBtn[0]?.Hours?.map((items, idxe) => {
            const isToday = day.getDay() - 1 === idxe; 
            if (items.close) {
              return (
                <p
                  key={idxe}
                  className={`${isToday ? "highlightToday" : ""} d-flex`}>
                  <span className="w-50">{`${items.day} `}</span>
                  <span className="w-50">Close</span>
                </p>
              );
            } else {
              return items.Open?.map((ite, index) => {
                if (index === 0) {
                if (ite.Time1 === "24 Hours" || ite.Time2 === "24 Hours") {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">24 Hours</span>
                    </p>
                  );
                } else if (ite.Time1 === "00:00" || ite.Time2 === "00:00") {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">Closed</span>
                    </p>
                  );
                } else {
                  return (
                    <p
                      key={index}
                      className={`${isToday ? "highlightToday" : ""} d-flex`}
                    >
                      <span className="w-50">{`${items.day} `}</span>
                      <span className="w-50">{`${ite.Time1} - ${ite.Time2}`}</span>
                    </p>
                  );
                }
              }
              return null;
            });
            }
          })}

        </div>
      )
    },
    {
      title: `How can I contact ${props?.delBtn[0]?.Store_Name}?`,
      answer: `You can contact ${props?.delBtn[0]?.Store_Name} by phone at ${props.delBtn[0].Stores_MobileNo}`
    }
  ];

  



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
                            onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                            style={styles.image}
                          />
                          <div className='cardnamerating'>

                            <p style={styles.author}>{data.username}</p>

                            <div style={styles.rating}>
                              <span style={styles.star} >
                                {new Array(data.rating).fill(null).map((data, index) => (
                                  <BsStarFill key={index} size={12} color="#31B665" />
                                ))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div style={styles.dateAndMenu}>
                          <span style={styles.date}>{data.created_at.slice(0, 10)}</span>
                        </div>
                      </div>

                      <div className='mt-2' >
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

        </div>
      }
      <>
        {
          Boolean(props?.store?.length)  &&
          <>
            {
              Boolean(props?.store?.length !==1) && 
              <div className='mt-5' >
              <h4 className='center nearbyStore'>{`Explore Other Nearby Dispensaries`}</h4>
              <h4 className='nearbystoreheading center'>{`Can’t find what you’re looking for? Check out these nearby dispensaries that have products available now.`}</h4>
            </div>
            }
            <Swiper className={`mySwiper similerproduxt mt-5 `}
              spaceBetween={40}
              slidesPerView={2}
              navigation={true}
              modules={[Navigation]}
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
                props?.store?.map((data, index) => {
                  if (data.id !== props.delBtn[0].id) {
                    return (
                      <SwiperSlide key={index}>
                        <Dispensoriescart ele={data} key={index} classdefalut={'despensories_card_container1'} />
                      </SwiperSlide>
                    )
                  }
                })
              }
            </Swiper>
          </>
        }
        {Boolean(props?.allproduct?.length) && <ProductSearchResult link={'/products'} RelatedProductResult={props?.allproduct} currentProductID={props?.allproduct[0]?.id} title={'Explore Nearby Products'} CategoryName={props?.allproduct[0]} />}
      </>
      <>
        <h3 className="section_main_title mt-4">{`Frequently Asked Questions (FAQs)`}</h3>

        <div className="row">
          {
          (props.faq === "delivery" ?  faq :   faq1) ?.map((item, index) => {
              return <div key={index} className="col-lg-12 my-1"> <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <h3
                    style={{
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "14px"
                    }}
                  >{item.title}</h3>
                </AccordionSummary>
                <AccordionDetails >
                  <span style={{ margin: "0" }}>{item.answer}</span>
                </AccordionDetails>
              </Accordion></div>
            })
          }

        </div>
      </>

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
    width: "30px",
    height: "30px",
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
    // margin: "12px 5px",
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

{/* <span
dangerouslySetInnerHTML={{
  __html: `You can contact ${props.delBtn[0].Store_Name} by phone at <a href="tel:${props.delBtn[0].Stores_MobileNo}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${props.delBtn[0].Stores_MobileNo}</a>`
}}
/> */}