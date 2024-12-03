import React from 'react';
import Image from 'next/image';
const Staticcontent = () => {
    return (
        
            <div className="About_weedx">
                <div className="container-fluid">
                    <h2 className={`${"section_main_title"} mb-sm-1 mb-3 text-center`}>{`Welcome to weedx.io`}</h2>
                    <p className="section_main_description">{`WeedX.io is your one-stop destination for all things cannabis! Connect with local dispensaries, explore trusted brands, and enjoy fast delivery or convenient pickup options. Browse detailed menus, discover high-quality cannabis products, and experience seamless shopping tailored to your needs. Whether you’re seeking medical or recreational marijuana, WeedX.io makes access easy and hassle-free.`}</p>

                    <div className={"about_card_Wraper"}>
                        <div className={"about_card"}>
                            <div className={"about_card_img"}>
                                <Image priority width={100}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs1/about1.webp'}
                                    alt=" Online Ordering"
                                    title=" Online Ordering"
                                    onError={(e) => (e.target.src = '/blankImage.jpg')}
                                />
                            </div>
                            <div className={"about_text"}>
                                <h3 className={"acard_title"}>{` Online Ordering`} </h3>
                                <p className={"acard_description"}>
                                    {` Experience the convenience of ordering your
                                    favorite cannabis products online. Browse a
                                    wide selection, place your order, and have it
                                    delivered or ready for pickup with just a few
                                    clicks.`}
                                </p>
                            </div>
                        </div>
                        <div className={"about_card"}>
                            <div className={"about_card_img"}>
                                <Image
                                    priority
                                    width={100}
                                    onError={(e) => (e.target.src = '/blankImage.jpg')}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs2/about2.webp'}
                                    alt="Delivery Services"
                                    title="Delivery Services"
                                />
                            </div>
                            <div className={"about_text"}>
                                <h3 className={"acard_title"}> {`  Delivery Services`} </h3>
                                <p className={"acard_description"}> {` Enjoy the ease of cannabis delivery right
                                    to your doorstep. Whether you're seeking
                                    flowers, edibles, or concentrates, our
                                    delivery services ensure a hassle-free
                                    experience`} </p>
                            </div>
                        </div>
                        <div className={"about_card"}>
                            <div className={"about_card_img"}>
                                <Image
                                    priority
                                    width={100}
                                    onError={(e) => (e.target.src = '/blankImage.jpg')}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs3/about3.webp'}
                                    alt="Dispensary Listings"
                                    title="Dispensary Listings"
                                />
                            </div>
                            <div className={"about_text"}>
                                <h3 className={"acard_title"}>
                                    {`Dispensary Listings`}
                                </h3>
                                <p className={"acard_description"}>
                                    {`  Explore our comprehensive directory of
                                    cannabis dispensaries. Each listing
                                    provides essential details, including
                                    addresses, operating hours, and
                                    customer reviews, to help you make
                                    informed choices.`}
                                </p>
                            </div>
                        </div>
                        <div className={"about_card"}>
                            <div className={"about_card_img"}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={'https://selnew.s3.amazonaws.com/media/AboutUs4/about4.webp'}
                                    alt="Retailer Listings"
                                    title="Retailer Listings"
                                    onError={(e) => (e.target.src = '/blankImage.jpg')}
                                    priority
                                />
                            </div>
                            <div className={"about_text"}>
                                <h3 className={"acard_title"}>
                                    {`  Retailer Listings`}
                                </h3>
                                <p className={"acard_description"}>
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