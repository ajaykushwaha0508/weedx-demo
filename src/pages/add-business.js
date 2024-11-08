import React from "react";
import { useRef } from "react";
import Link from "next/link";
import Business from "@/component/tableofcontent/Business";
import Businesspageseo from "@/component/ScoPage/businesspageseo";
import classes from '@/styles/customstyle.module.scss'
import AdvertiseBanner from '../../public/image/ADDBUSINESSBanner.webp';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from "next/image";
import businness1 from '../../public/image/businness1.png'
import Bgheader from "@/component/bgheader/Bgheader";
import Add_business2 from '../../public/image/add_business2.png'
import Add_business1 from '../../public/image/add_business2.png'
import useStyles from "@/styles/style";

const Businesspage = () => {
  const ref = useRef(null);
const ssss = useStyles()
  return (
    <div className={classes.ad_page}>
      <Businesspageseo/>
     
        <div className={classes.business}>
          <div className="container-fluid">
          
            <div className={classes.adversticebanner_header}>
                <h1>{'Add Your Business to'} <span> {'WeedX.io'} </span></h1>
                <Image src={AdvertiseBanner.src} alt={"banner image"}  width={1200} height={400} />
            </div>
            <div className={`${classes.tbusiness_content} justify-content-between`}>
              <div className={classes.tbusiness_maincentent}>
                <div className={classes.section_box}  id="grow_your_business_with_weedx.io"  >
                  <h2 className={classes.section_box_heading}>
                    {`Grow Your Business with WeedX.io`}
                  </h2>
                    <p className={classes.section_box_para}>
                      {`Join the leading cannabis platform and get your business in front of thousands of potential customers. Whether you're running a `}
                      <b>{`dispensary`}</b>
                      {`, offering`} <b>{` delivery services`} </b>
                      {`, or building a`} <b> {`cannabis brand, WeedX.io`}</b>
                      {` helps you connect with the right audience and grow your reach.`}{" "}
                    </p>
                    <p className={classes.section_box_para}>
                      {`By listing your business with us, you'll not only gain visibility but also manage your inventory and orders through our powerful backend platform,`}{" "}
                      <b>{` Cannabaze.`}</b>
                    </p>
                </div>
                <div className={classes.section_boxBanner} >
                  <h2 className={classes.section_box_heading}>{`Why List Your Business on WeedX.io?`}</h2>
                  <div className={classes.ad_imageTextSection}>
                    <div className={classes.ad_textArea}>
                      <div>
                      <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Reach More Customers:`} </b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{` Get your business in front of cannabis enthusiasts in your area and beyond.`}</p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Manage Inventory Anytime, Anywhere: `} </b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{`With Cannabaze available on the App Store and Google Play Store, you can now manage your business on the go from your mobile device. Add products, track inventory, and handle orders all from the palm of your hand!`} </p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Real-Time Updates:`}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{`Automatically sync your product menu, pricing, and stock levels with your WeedX.io listing.`}</p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Multi-Channel Support:`}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p> {`Manage multiple dispensary locations or delivery areas from a single platform.`}</p>
                              </AccordionDetails>
                              </Accordion>
                      </div>
                    
                    </div>
                    <div className={classes.ad_Img_Area}>
                      <Image src={Add_business2.src} alt="weedx" width={400} height={400}/>
                    </div>
                  </div>
                </div>
                <div className={classes.section_box} id="who_can_list_their_business?">
                  <h2 className={`text-center ${classes.section_box_heading}`}>{`Who Can List Their Business?`}</h2>
                  <p className={`text-center ${classes.section_box_para}`}>
                    {` We welcome a variety of cannabis businesses, including:`}
                  </p>
                  <ul>
                    <li>
                      <p className={classes.section_box_para}>
                        <b>{`Dispensaries:`}</b>{" "}
                        {`Showcase your products, menu, and services for in-store pickup or delivery.`}
                      </p>
                    </li>
                    <li>
                      <p className={classes.section_box_para}>
                        <b>{`Delivery Services:`}</b>
                        {` Let customers know where and when you deliver, and offer them a smooth ordering experience.`}
                      </p>
                    </li>
                    <li>
                      <p className={classes.section_box_para}>
                        <b>{`Cannabis Brands:`}</b>{" "}
                        {`Build your brand presence, highlight your products, and connect directly with dispensaries and consumers`}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className={classes.section_boxBanner} >
                    <div className={classes.ad_imageTextSection}>
                        <div className={classes.ad_Img_Area}>
                          <Image alt="weedx" width={400} height={400} src={Add_business1.src}/>
                        </div>
                        <div className={classes.ad_textArea}>
                        
                            <h2 className={classes.section_box_heading}>{`How to Add Your Business`}</h2>
                            <p className={classes.section_box_para}>
                              {`   Adding your business to `} <b>{`  WeedX.io`} </b>
                              {`  is simple. Just follow
                              these easy steps:`}
                            </p>
                            <div>
                              <div>
                             
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Click the Button Below`}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{` Sign up through Cannabaze to manage your business and get listed on WeedX.io.`}</p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Fill Out Your Business Details:`} </b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{`Provide essential information like your business name, location, contact details, and services.`} </p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Submit and Get Verified:`} </b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p>{`Our team will review your submission for approval.`} </p>
                              </AccordionDetails>
                              </Accordion>
                              <Accordion className={ssss.businessaccordion}>
                              <AccordionSummary
                                expandIcon={<ArrowDropDownIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                              >
                                <p> <b>{`Start Managing Your Business:`}</b></p>
                              </AccordionSummary>
                              <AccordionDetails>
                               <p> {`Once approved, you can manage your inventory, orders, and listings right from the Cannabaze dashboard.`}</p>
                              </AccordionDetails>
                              </Accordion>
                              </div>
                            </div>
                            {/* <ul>
                              <li>
                                <p className={classes.section_box_para}>
                                  <b>{`Click the Button Below: `}</b>
                                  {`Sign up through Cannabaze to manage your business and get listed on WeedX.io.`}
                                </p>
                              </li>
                              <li>
                                <p className={classes.section_box_para}>
                                  <b>{`Fill Out Your Business Details:`} </b>
                                  {` Provide essential information like your business name, location, contact details, and services.`}
                                </p>
                              </li>
                              <li>
                                <p className={classes.section_box_para}>
                                  <b>{`Submit and Get Verified:`}</b>{" "}
                                  {`Our team will review your submission for approval.`}
                                </p>
                              </li>
                              <li>
                                <p className={classes.section_box_para}>
                                  <b> {`Start Managing Your Business:`}</b>{" "}
                                  {`Once approved, you can manage your inventory, orders, and listings right from the Cannabaze dashboard.`}
                                </p>
                              </li>
                            </ul> */}
                            <div className='text-center'>
                              <button className={classes.addbusinessbtn}> <Link href={'https://cannabaze.com/signup'}> {`Add Your Business Now`}</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.section_box} id="claim_your_existing_business_listing">
                  <h2 className={classes.section_box_heading}>{`Claim Your Existing Business Listing`}</h2>
                  <p className={classes.section_box_para}>{`If you find your business already listed on WeedX.io but need to claim it, you can easily do so by reaching out to us. Simply send us an email at `} <b><Link href="mailto:info@weedx.io">{`info@weedx.io,  `}</Link></b> {`and our team will assist you in claiming and managing your existing business listing.`}</p>
                </div>

                <div className={classes.section_box} id="integration_with_cannabaze">
                  <h2 className={classes.section_box_heading}>{`Integration with Cannabaze`}</h2>
                  <p className={classes.section_box_para}>
                    {` When you list your business on `}
                    <b> {`WeedX.io,`} </b>{" "}
                    {`you also get access
                    to the Cannabaze Vendor Dashboard, where you can easily
                    manage everything:`}
                  </p>

                  <div className={classes.ad_imageTextSection}>
                    <div className={classes.ad_textArea}>
                      <ul>
                        <li>
                          <p className={classes.section_box_para}>
                            <b>{`Add new products,`}</b>{" "}
                            {`set pricing, and keep stock levels up to date.`}
                          </p>
                        </li>
                        <li>
                          <p className={classes.section_box_para}>
                            <b>{`Track orders`}</b>{" "}
                            {` from delivery and pickup options.`}
                          </p>
                        </li>
                        <li>
                          <p className={classes.section_box_para}>
                            <b>{`Sync your menu `}</b>{" "}
                            {`directly to WeedX.io and other platforms.`}
                          </p>
                        </li>
                        <li>
                          <p className={classes.section_box_para}>
                            <b>{` Mobile Access:`} </b>
                            {` Manage your inventory and business operations on the go with the Cannabaze mobile app, available on the App Store and Google Play Store.`}
                          </p>
                        </li>
                      </ul>
                    </div>
                    <div className={classes.ad_Img_Area}> 
                      <Image alt="weedx" src={businness1.src} width={300} height={240}/>
                    </div>
                  </div>
                </div>
                <div className={classes.section_box} >
                  <h2 className={classes.section_box_heading}>{`Need Help? We’re Here for You!`}</h2>
                  <p className={classes.section_box_para}>{`If you have any questions or need support, feel free to reach out to us. Just drop us an email at  `} <b><Link href="mailto:info@weedx.io">{`info@weedx.io,  `}</Link></b> {`and our support team will be happy to assist you.`}</p>
                </div>
                {/* <div className={classes.section_box}>
                  <h2 className={classes.section_box_heading}>{`Join the WeedX.io Community Today!`}</h2>
                  <p className={classes.section_box_para}>{`Ready to take your cannabis business to the next level? Start growing your audience, simplifying your operations, and expanding your reach with `}  <b><Link href={'/'}> {`WeedX.io.`}</Link> </b> {` List your dispensary, delivery service, or brand today and get started with the best cannabis e-commerce platform around.`}</p>
                  <p className={classes.section_box_para}></p>
                </div> */}
                <div className={classes.ad_footer}>
                  <h2 className={classes.page_heading}> {`Join the WeedX.io Community Today!`}
                  </h2>
                  <p>{`Ready to take your cannabis business to the next level? Start growing your audience, simplifying your operations, and expanding your reach with`}<Link href={'/'}>{` WeedX.io `}</Link> {`List your dispensary, delivery service, or brand today and get started with the best cannabis e-commerce platform around.`}</p>
                  <button ><Link href={'/'}>{`Join Weedx.io`}</Link></button>
                </div>
              </div>
              {/* <div className={classes.col-md-4}>
                <Business />
              </div> */}
            </div>
          </div>
        </div>
   
    </div>
  );
};
export default Businesspage;


