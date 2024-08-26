import React from 'react'
import Newsletter from '../../Component/Newsletter/HomePageDealsSignup';
import {PrivacyPolicy}  from "../../Component/ScoPage/CommenpageSeo";
import { useRef } from 'react';
import { useLocation ,Link} from 'react-router-dom';
const Privacypolicy = () => {
  // const [offset, setOffset] = React.useState(0);
  // const [Id, setId] = React.useState("");
//  const allHeigths = []
//   React.useEffect(() => {
//     document.documentElement.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "instant",
//     }); 
    
//     const onScroll = () => setOffset(window.pageYOffset);
//     window.removeEventListener('scroll', onScroll);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [])
//   let divElement = document.getElementById('Navbar_box')?.clientHeight
//   React.useEffect(()=>{
    

 
//     ref.current.childNodes.forEach((item , index)=>{
//       allHeigths.push({
//        topheigth: item.offsetTop,
//        id : item.id,
//        height : item.clientHeight
//       })
//     })
   
//     for(let i=0 ; i < allHeigths.length -1 ; i++){
//        if(offset > allHeigths[i].topheigth - divElement - 100   && offset < allHeigths[i+1].topheigth - divElement ){
//         setId(allHeigths[i].id)
//        }else if(offset < allHeigths[0].topheigth){
//         setId(allHeigths[0].id)
        
//        }else if(offset > allHeigths[allHeigths.length -1].topheigth){
//         setId(allHeigths[allHeigths.length -1].id)
        
//        }
//     }
//   },[offset])

  // function gothroughID(ID){
   
  //   allHeigths.forEach((item)=>{
  //     if(item.id === ID){
  //       window.scrollTo(0, item.topheigth - divElement)
  //     }
  //   })
  // }


  const location = useLocation()
  const ref = useRef(null);
  const [allHeigths,setallheight] = React.useState([])
 

  React.useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    }); 
        let data =[]
        ref.current.childNodes.forEach((item , index)=>{
    
            data.push({
                topheigth: item.offsetTop,
                id : item.id,
                height : item.clientHeight
            })   
        })
        setallheight(data)
    
  },[])

React.useEffect(() => {
     let divElement = document.getElementById('Navbar_box')?.clientHeight
      
       allHeigths.forEach((item)=>{
       
       if(location.hash === `#${item.id}`){
       
         window.scroll(0 , item.topheigth - divElement)
       }
    })
  }, [location,allHeigths])
  return (
    <>
    <div className='term_condition'>
      <PrivacyPolicy></PrivacyPolicy>
      <div className="container-fluid">
        <div className="tc_hero">
          <h1 className="page_heading">  Weedx.io Privacy policy  </h1>
        </div>

        <div className="row tc_content justify-content-between">
         <div className="col-md-7 tc_main-centent"> 
            <ol  ref={ref}>
              <li id='introduction'>
                <span className='question'> Introduction</span>
                <span className="answer">
                Welcome to weedx.io (the "Website"), owned and operated by selnox infotech  ("we," "us," "our"). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you access or use our Website.
                </span>
              </li>
              <li id='information_we_collect'>
                <span className='question'>Information We Collect</span>
                <span className="answer">
                We may collect the following types of information:

                Personal Information: This may include your name, email address, contact information, and any other information you provide when using our Website.

                Usage Information: We may collect information about how you access and use our Website, including your IP address, device information, browser type, and pages you visit.
                </span>
              </li>
              <li id='how_we_use_your_information'>
                <span className='question'>How We Use Your Information</span>
                <span className="answer">We may use your information for various purposes, including:

              Providing and improving our services.

              Communicating with you, including responding to your inquiries and requests.

              Customizing and enhancing your experience on our Website.

              Complying with legal and regulatory requirements.


              </span>
              </li>
              <li id='sharing_your_information'>
                <span className='question'>Sharing Your Information</span>
                <span className="answer">
                We may share your information with third parties for the following purposes:
                Service Providers: We may share your information with third-party service providers who assist us in delivering and improving our services.
                Legal Requirements: We may disclose your information to comply with legal obligations or respond to lawful requests from authorities.
                </span>
              </li>
              <li id='cookies_and_tracking_technologies'>
                <span className='question'>Cookies and Tracking Technologies</span>
                <span className="answer">
                We may use cookies and similar tracking technologies to collect information about your browsing activities on our Website. You can manage your cookie preferences through your browser settings.
                </span>
              </li>
              <li id='your_choices'>
                <span className='question'> Your Choices </span>
                <span className="answer">
                You can access and update your personal information by [provide instructions for updating information]. You may also opt-out of receiving promotional communications from us.

                </span>
              </li>
              <li id='security'>
                <span className='question'> Security </span>
                <span className="answer">
                We take reasonable measures to protect your information from unauthorized access and use. However, no data transmission over the internet is entirely secure, and we cannot guarantee the security of your information.
                </span>
              </li>
              <li id="children's_privacy">
                <span className='question'>Children's Privacy</span>
                <span className="answer">
                Our Website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.
                </span>
              </li>
              <li id='changes_to_this_privacy_policy'>
                <span className='question'>Changes to This Privacy Policy</span>
                <span className="answer">
                We may update this Privacy Policy to reflect changes to our information practices. We will post the updated Privacy Policy on this page with a revised "Last Updated" date.
                </span>
              </li>
              <li id='contact_us'>
                <span className='question'>Contact Us</span>
                <span className="answer">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at <a  href = "mailto:info@weedx.io">info@weedx.io</a> .
                </span>
              </li> 
            </ol>
         </div>
         <div className="col-md-4"> 
           <div className="tc_topic_list">
            <div className="heading_box">
            <h3 className='text-white m-0 sideTableHeading'>Table of Contents</h3>
            </div>
            <ul>
               <Link to={{ hash:`#introduction`,}} ><li  className={location.hash === "#introduction" && "activeTable"  }>1. Introduction </li></Link>
               <Link to={{ hash:`#information_we_collect`,}} ><li  className={location.hash === "#information_we_collect" && "activeTable"  }>2. Information We Collect</li></Link>
               <Link to={{ hash:`#how_we_use_your_information`,}} ><li className={location.hash === "#how_we_use_your_information" && "activeTable"  }> 3. How We Use Your Information  </li></Link>
               <Link to={{ hash:`#sharing_your_information`,}} ><li className={location.hash === "#sharing_your_information" && "activeTable"  }>4. Sharing Your Information</li></Link>
               <Link to={{ hash:`#cookies_and_tracking_technologies`,}} ><li  className={location.hash === "#cookies_and_tracking_technologies" && "activeTable"  }> 5. Cookies and Tracking Technologies </li></Link>
               <Link to={{ hash:`#your_choices`,}} ><li  className={location.hash === "#your_choices" && "activeTable"  }> 6. Your Choices</li></Link>
               <Link to={{ hash:`#security`,}} ><li  className={location.hash === "#security" && "activeTable"  }>  7. Security </li></Link>
               <Link to={{ hash:`#children's_privacy`,}} ><li className={location.hash === "#children's_privacy" && "activeTable"  }> 8. Children's Privacy </li></Link>
               <Link to={{ hash:`#changes_to_this_privacy_policy`,}} ><li  className={location.hash === "#changes_to_this_privacy_policy" && "activeTable"  }>  9. Changes to This Privacy Policy </li></Link>
               <Link to={{ hash:`#contact_us`,}} ><li  className={location.hash === "#contact_us" && "activeTable"  }>10. Contact Us </li></Link>
            </ul>
           </div>
         </div>
        </div>
      </div>
    </div>
    <Newsletter></Newsletter>
    </>
  )
}

export default Privacypolicy