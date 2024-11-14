import React, { useState } from 'react'
import Image from 'next/image'
import gifimage from '../../../public/image/gif.svg';
import clases from '../../styles/customstyle.module.scss'

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
import  Faq from '@/component/storedetailsfootecomponent/faq';
import Review from '@/component/storedetailsfootecomponent/review';
const Oops = (props) => {
  var date = new Date();
  // console.log(props)

  const easternTime = date.toLocaleString("en-US", { timeZone: "America/New_York" })
  let day = new Date(easternTime)
  const faq1 = [
    {
      title: `Where is ${props?.delBtn[0]?.Store_Name} located?`,
      answer:
        <span
          dangerouslySetInnerHTML={{
            __html: ` ${props.delBtn[0].Store_Name} is located at  <a target="#" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props?.delBtn[0]?.Store_Address)}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${props.delBtn[0].Store_Address}</a>`
          }}
        />
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
      answer: <span
        dangerouslySetInnerHTML={{
          __html: `You can contact ${props.delBtn[0].Store_Name} by phone at <a  href="tel:${props.delBtn[0].Stores_MobileNo}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${props.delBtn[0].Stores_MobileNo}</a>`
        }}
      />
    }
  ];

  const faq = [
    {
      title: `What is the service area for ${props?.delBtn[0]?.Store_Name} ?`,
      answer:
        <span
          dangerouslySetInnerHTML={{
            __html: ` ${props.delBtn[0].Store_Name} delivers to <a target="#" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props?.delBtn[0]?.Store_Address)}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${props.delBtn[0].Store_Address}</a>`
          }}
        />
    },
    {
      title: `What are the delivery hours for  ${props?.delBtn[0]?.Store_Name}?`,
      answer: (
        <div>
          <span>{props?.delBtn[0]?.Store_Name}</span>
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
      answer: <span
        dangerouslySetInnerHTML={{
          __html: `You can contact ${props.delBtn[0].Store_Name} by phone at <a  href="tel:${props.delBtn[0].Stores_MobileNo}" style="cursor: pointer; color: #31B665; text-decoration: underline;">${props.delBtn[0].Stores_MobileNo}</a>`
        }}
      />
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
   <Review AllReview = {props?.AllReview || []} storename={props?.delBtn[0].Store_Name} ></Review>
      <>
        {
          Boolean(props?.store?.length) &&
          <>
            {
              Boolean(props?.store?.length !== 1) &&
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
                      
                        <Dispensoriescart ele={data} key={index} type={'swiper'} />
                    
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
            (props.faq === "delivery" ? faq : faq1)?.map((item, index) => {
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