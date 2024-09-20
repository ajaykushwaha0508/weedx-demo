
import Bgheader from '@/component/bgheader/Bgheader'
import React from 'react'
import classes from '@/styles/customstyle.module.scss';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';
import Ads1 from '../../public/image/ads1.gif'
import Ads2 from '../../public/image/ads2.png'
import Ads3 from '../../public/image/ads3.png'
import Advertisseo from '@/component/ScoPage/advertisseo';

const advertise = () => {
  return (
    <>
      <Advertisseo/>
      <div className={classes.ad_page}>
          <div className='container'>
            
              <Bgheader text={'Advertise with WeedX.io'}/>
            
              <div className='my-md-5 my-3'>
                <h3>{`Reach Your Target Audience in the Cannabis Industry`}</h3>
                <p>{`WeedX.io is a trusted platform connecting cannabis consumers with dispensaries, brands, and delivery services across the USA and Canada. With our range of advertising options, you can promote your cannabis business directly to the audience that matters most. Whether you want to boost brand visibility, drive traffic to your dispensary, or highlight your cannabis products, we’ve got the perfect solution for you.`}</p>
              </div>
              <div>
                <h2>{`Our Advertising Options`}</h2>
                <div className={classes.ad_imageTextSection}>
                    <div className={classes.ad_textArea}>
                      <h4>{`1. Banner Ads`}</h4>
                      <p>{`Place your business in front of thousands of visitors with high-visibility banner ads. Whether you want to appear on the homepage or specific product pages, our banner ads will make sure your brand stands out.`}</p>
                      <h4>{`Benefits of Banner Ads:`}</h4>
                      <ul>
                        <li><p>{`Prime placement on WeedX.io’s homepage and relevant pages.`}</p></li>
                        <li><p>{`High click-through rate with targeted traffic.`}</p></li>
                        <li><p>{`Customize your banners for maximum impact.`}</p></li>
                      </ul>
                    </div>
                    <div className={classes.ad_Img_Area}>
                      <Image src={Ads1.src} unoptimized={true} width={400} height={250} title='ad_iamge'/>
                    </div>
                </div>
                <div className={classes.ad_imageTextSection}>
                    <div className={classes.ad_Img_Area}>
                      <Image src={Ads2.src} unoptimized={true} width={400} height={400}/>
                    </div>
                    <div className={classes.ad_textArea}>
                      <h4>{`2. Sponsored Listings`}</h4>
                      <p>{`Feature your dispensary or delivery service at the top of relevant search results. With a sponsored listing, your business gets more visibility and increases its chances of being selected by customers looking for cannabis products in their area.`}</p>
                      <h4>{`Why Choose Sponsored Listings?:`}</h4>
                      <ul>
                        <li><p>{`Get prioritized placement in search results.`}</p></li>
                        <li><p>{`Boost visibility and drive more traffic to your page.`}</p></li>
                        <li><p>{`Ideal for dispensaries and delivery services looking to stand out.`}</p></li>
                      </ul>
                    </div>
                
                </div>
                <div className={classes.ad_imageTextSection}>
                    <div className={classes.ad_textArea}>
                      <h4>{`3. Sponsored Blog Posts`}</h4>
                      <p>{`Leverage our popular cannabis blog to tell your brand’s story, announce a product launch, or share educational content. Our blog reaches cannabis enthusiasts and industry professionals, providing you with the opportunity to engage and inform your target audience.`}</p>
                      <h4>{`Sponsored Blog Post Features:`}</h4>
                      <ul>
                        <li><p>{`A dedicated blog post written by our team, highlighting your brand or product.`}</p></li>
                        <li><p>{`Reach a large audience of cannabis enthusiasts.`}</p></li>
                        <li><p>{`Boost your brand’s credibility through informative and engaging content.`}</p></li>
                      </ul>
                    </div>
                    <div className={classes.ad_Img_Area}>
                      <Image src={Ads3.src} unoptimized={true} width={400} height={400}/>
                    </div>
                </div>
                <div  className={`${classes.ad_imageTextSection}`}>
                  <h2>{`Why Advertise on WeedX.io?`}</h2>
                  <ul>
                    <li><p><b>{`Targeted Audience:`}</b>{` Reach a cannabis-focused audience that’s actively searching for dispensaries, products, and services.`}</p></li>
                    <li><p><b>{`Increased Visibility:`}</b>{` Get your brand in front of thousands of daily visitors who are looking for cannabis solutions.`}</p></li>
                    <li><p><b>{`Flexible Options:`}</b>{` Choose the advertising option that suits your needs and budget.`}</p></li>
                  </ul>
                </div>
                <div  className={classes.ad_imageTextSection}> 
                  <h2 className='w-100 '>{`How to Get Started`}</h2>
                  <p className='w-100'>{` Ready to promote your cannabis business on WeedX.io? Contact us today to learn more about our advertising packages.`}</p>
                </div>
                <div> 
                  <h2>{`Contact Information:`}</h2>
                  <p> <span><MdEmail /></span> <b>{`Email:`}</b>  <Link href={'mailto:info@weedx.io'}>{` info@weedx.io`}</Link></p>
                  <p> <span><FaPhoneAlt /></span> <b>{`WhatsApp:`}</b>  <Link href={'tel:+1 530-385-8664'}>{`+1 530-385-8664`}</Link></p>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default advertise