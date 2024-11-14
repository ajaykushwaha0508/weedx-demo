import React from 'react';
import clases from "@/styles/customstyle.module.scss"
import Image from 'next/image';
const Staticcontent = () => {
    return (
        
            <div className="About_weedx">
                <div className="container-fluid">
                    <h2 className={`${clases.section_main_title} mb-sm-1 mb-3`}>{`Welcome to weedx.io`}</h2>
                    <p className="section_main_description">{`Your all-in-one cannabis destination. Discover a world of convenience with our Online Ordering and Delivery   Services. Explore a rich selection of Dispensary and Retailer Listings, all while enjoying the peace of mind that comes with our
                        full Compliance with Local Laws. Your journey to a seamless, legal, and informed cannabis experience begins here at
                        weedx.io`}</p>

                    <div className={clases.about_card_Wraper}>
                        <div className={clases.about_card}>
                            <div className={clases.about_card_img}>
                                <Image unoptimized={true} width={100}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs1/about1.webp'}
                                    alt=" Online Ordering"
                                    title=" Online Ordering"
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                />
                            </div>
                            <div className={clases.about_text}>
                                <h3 className={clases.acard_title}>{` Online Ordering`} </h3>
                                <p className={clases.acard_description}>
                                    {` Experience the convenience of ordering your
                                    favorite cannabis products online. Browse a
                                    wide selection, place your order, and have it
                                    delivered or ready for pickup with just a few
                                    clicks.`}
                                </p>
                            </div>
                        </div>
                        <div className={clases.about_card}>
                            <div className={clases.about_card_img}>
                                <Image
                                    unoptimized={true}
                                    width={100}
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs2/about2.webp'}
                                    alt="Delivery Services"
                                    title="Delivery Services"
                                />
                            </div>
                            <div className={clases.about_text}>
                                <h3 className={clases.acard_title}> {`  Delivery Services`} </h3>
                                <p className={clases.acard_description}> {` Enjoy the ease of cannabis delivery right
                                    to your doorstep. Whether you're seeking
                                    flowers, edibles, or concentrates, our
                                    delivery services ensure a hassle-free
                                    experience`} </p>
                            </div>
                        </div>
                        <div className={clases.about_card}>
                            <div className={clases.about_card_img}>
                                <Image
                                    unoptimized={true}
                                    width={100}
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs3/about3.webp'}
                                    alt="Dispensary Listings"
                                    title="Dispensary Listings"
                                />
                            </div>
                            <div className={clases.about_text}>
                                <h3 className={clases.acard_title}>
                                    {`Dispensary Listings`}
                                </h3>
                                <p className={clases.acard_description}>
                                    {`  Explore our comprehensive directory of
                                    cannabis dispensaries. Each listing
                                    provides essential details, including
                                    addresses, operating hours, and
                                    customer reviews, to help you make
                                    informed choices.`}
                                </p>
                            </div>
                        </div>
                        <div className={clases.about_card}>
                            <div className={clases.about_card_img}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs4/about4.webp'}
                                    alt="Retailer Listings"
                                    title="Retailer Listings"
                                    onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                                    unoptimized={true}
                                />
                            </div>
                            <div className={clases.about_text}>
                                <h3 className={clases.acard_title}>
                                    {`  Retailer Listings`}
                                </h3>
                                <p className={clases.acard_description}>
                                    {`Our retailer listings showcase the best
                                    places to explore, purchase, and learn
                                    about cannabis. Discover the perfect
                                    spot to meet your cannabis
                                    requirements`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
};

export default Staticcontent; 