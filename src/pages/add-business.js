import React from "react";
import { useRef } from "react";
import Link from "next/link";
import Business from "@/component/tableofcontent/Business";
import Businesspageseo from "@/component/ScoPage/businesspageseo";
const Businesspage = () => {
  const ref = useRef(null);

  return (
    <div className="About_business">
      <Businesspageseo/>
     
        <div className="term_condition">
          <div className="container-fluid">
            <div className="tc_hero">
              <h1 className="page_heading">
                {" "}
                {`Add Your Cannabis Business to WeedX.io`}
              </h1>
            </div>

            <div className="row tc_content justify-content-between">
              <div className="col-md-7 tc_main-centent">
                <div
                  className="section_box"
                  id="grow_your_business_with_weedx.io"
                >
                  <h3 className="section_box_heading">
                    {`Grow Your Business with WeedX.io`}
                  </h3>
                  <p className="section_box_para">
                    {`Join the leading cannabis platform and get your business in front of thousands of potential customers. Whether you're running a `}
                    <b>{`dispensary`}</b>
                    {`, offering`} <b>{` delivery services`} </b>
                    {`, or building a`} <b> {`cannabis brand, WeedX.io`}</b>
                    {` helps you connect with the right audience and grow your reach.`}{" "}
                  </p>
                  <p className="section_box_para">
                    {`By listing your business with us, you'll not only gain visibility but also manage your inventory and orders through our powerful backend platform,`}{" "}
                    <b>{` Cannabaze.`}</b>
                  </p>
                </div>
                <div className="section_box" id="why_list_your_business_on_weedx.io">
                  <h3 className="section_box_heading">{`Why List Your Business on WeedX.io?`}</h3>
                  <ul>
                    <li>
                      <p className="section_box_para">
                        <b>{`Reach More Customers:`}</b>
                        {` Get your business in front of cannabis enthusiasts in your area and beyond.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Manage Inventory Anytime, Anywhere:`}</b>
                        {` With Cannabaze available on the App Store and Google Play Store, you can now manage your business on the go from your mobile device. Add products, track inventory, and handle orders all from the palm of your hand!`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Real-Time Updates:`}</b>
                        {` Automatically sync your product menu, pricing, and stock levels with your WeedX.io listing.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Multi-Channel Support:`}</b>{" "}
                        {`Manage multiple dispensary locations or delivery areas from a single platform.`}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="section_box" id="who_can_list_their_business?">
                  <h3 className="section_box_heading">{`Who Can List Their Business?
`}</h3>
                  <p className="section_box_para">
                    {` We welcome a variety of cannabis businesses, including:`}
                  </p>
                  <ul>
                    <li>
                      <p className="section_box_para">
                        <b>{`Dispensaries:`}</b>{" "}
                        {`Showcase your products, menu, and services for in-store pickup or delivery.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Delivery Services:`}</b>
                        {` Let customers know where and when you deliver, and offer them a smooth ordering experience.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Cannabis Brands:`}</b>{" "}
                        {`Build your brand presence, highlight your products, and connect directly with dispensaries and consumers`}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="section_box" id="how_to_add_your_business">
                  <h3 className="section_box_heading">{`How to Add Your Business`}</h3>
                  <p className="section_box_para">
                    {`   Adding your business to `} <b>{`  WeedX.io`} </b>
                    {`  is simple. Just follow
                    these easy steps:`}
                  </p>
                  <ul>
                    <li>
                      <p className="section_box_para">
                        <b>{`Click the Button Below: `}</b>
                        {`Sign up through Cannabaze to manage your business and get listed on WeedX.io.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Fill Out Your Business Details:`} </b>
                        {` Provide essential information like your business name, location, contact details, and services.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Submit and Get Verified:`}</b>{" "}
                        {`Our team will review your submission for approval.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b> {`Start Managing Your Business:`}</b>{" "}
                        {`Once approved, you can manage your inventory, orders, and listings right from the Cannabaze dashboard.`}
                      </p>
                    </li>
                  </ul>
                 <button className="addbusinessbtn"> <Link href={'https://cannabaze.com/signup'}> {`Add Your Business Now`}</Link></button>
                </div>
                <div className="section_box" id="claim_your_existing_business_listing">
                  <h3 className="section_box_heading">{`Claim Your Existing Business Listing`}</h3>
                  <p className="section_box_para">{`If you find your business already listed on WeedX.io but need to claim it, you can easily do so by reaching out to us. Simply send us an email at `} <b><Link href="mailto:info@weedx.io">{`info@weedx.io,  `}</Link></b> {`and our team will assist you in claiming and managing your existing business listing.`}</p>
                </div>
                <div className="section_box" id="integration_with_cannabaze">
                  <h3 className="section_box_heading">{`Integration with Cannabaze`}</h3>
                  <p className="section_box_para">
                    {` When you list your business on `}
                    <b> {`WeedX.io,`} </b>{" "}
                    {`you also get access
                    to the Cannabaze Vendor Dashboard, where you can easily
                    manage everything:`}
                  </p>
                  <ul>
                    <li>
                      <p className="section_box_para">
                        <b>{`Add new products,`}</b>{" "}
                        {`set pricing, and keep stock levels up to date.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Track orders`}</b>{" "}
                        {` from delivery and pickup options.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{`Sync your menu `}</b>{" "}
                        {`directly to WeedX.io and other platforms.`}
                      </p>
                    </li>
                    <li>
                      <p className="section_box_para">
                        <b>{` Mobile Access:`} </b>
                        {` Manage your inventory and business operations on the go with the Cannabaze mobile app, available on the App Store and Google Play Store.`}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="section_box" id="">
                  <h3 className="section_box_heading">{`Need Help? We’re Here for You!`}</h3>
                  <p className="section_box_para">{`If you have any questions or need support, feel free to reach out to us. Just drop us an email at  `} <b><Link href="mailto:info@weedx.io">{`info@weedx.io,  `}</Link></b> {`and our support team will be happy to assist you.`}</p>
                </div>
                <div className="section_box" id="">
                  <h3 className="section_box_heading">{`Join the WeedX.io Community Today!`}</h3>
                  <p className="section_box_para">{`Ready to take your cannabis business to the next level? Start growing your audience, simplifying your operations, and expanding your reach with `}  <b><Link href={'/'}> {`WeedX.io.`}</Link> </b> {` List your dispensary, delivery service, or brand today and get started with the best cannabis e-commerce platform around.`}</p>
                  <p className="section_box_para"></p>
                </div>
              </div>
              <div className="col-md-4">
                <Business />
              </div>
            </div>
          </div>
        </div>
   
    </div>
  );
};

export default Businesspage;