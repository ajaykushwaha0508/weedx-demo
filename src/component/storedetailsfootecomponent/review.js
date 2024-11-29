import React from "react";
import 'swiper/css/navigation';
import "swiper/css";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import Image from 'next/image'
import { BsStarFill } from "react-icons/bs";
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

    },
    cardnamerating:{
        display: 'contents',

    },
    description_text:{
        "& p":{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display:' -webkit-box',
            WebkitLineClamp: '5', 
            WebkitBoxOrient: 'vertical',
        }
    }

};


const Review = (props) => {

    return (
        <div>
            {
                Boolean(props?.AllReview?.length) &&
                    <React.Fragment>
                        <h4 className={`section_main_title mb-3 `}>{`What Customers Say about ${props.storename}`}</h4>
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
                                                            src={data.userImage}
                                                            alt="Profile"
                                                            onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                                            style={styles.image}
                                                        />
                                                        <div className={styles.cardnamerating}>

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
                                                    <div className={styles.description_text} >
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
                    </React.Fragment>
            }
        </div>
    )
}
export default Review