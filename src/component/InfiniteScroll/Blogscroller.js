import React,{ useState ,useContext , useEffect } from "react";
import { modifystr } from "@/hooks/utilis/commonfunction"
import { useRouter } from 'next/router';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { RWebShare } from "react-web-share";
import { FaRegHeart } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import Createcontext from '@/hooks/context.js';
import _, { assignWith } from "lodash";
import Image from 'next/image';
const Blogscroller = () => {
    const router = useRouter();
    const DeliverItemsCardArray = [1, 2, 3]
    const { state } = useContext(Createcontext);
    const [showabledata, setshowabledata] = useState([]);
    let pageheightfixed = 0;
        useEffect(() => {
            const handleScroll = () => {
            let scroll = window.scrollY;
            const element = document.getElementById("skeleton");

            if (element) {
                let height = window.innerHeight;
                const rect = element.getBoundingClientRect().top + window.pageYOffset;
                if ((rect - height < scroll) && (pageheightfixed !== rect || pageheightfixed === 0)) {
                    pageheightfixed = rect;
                    calldata();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [showabledata]);

    const calldata = async () => {
        if (showabledata.length % 10 === 0) {
            console.log(showabledata.length)
            try {
                const res = await fetch('https://apiv2.cannabaze.com/UserPanel/Get-GetNewsbycategory/', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "category": 2,
                        "limit": showabledata.length ===0 ? 20 : showabledata.length+10
                    })
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const json = await res.json();
                const data = _.orderBy(json, ['created'], ['desc']);
                
                setshowabledata(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };
  return (
    <>
        <div className="blogListWrapper">
          { showabledata?.slice(10)?.map((items, index) => {
            const modifiedSlug = items.Url_slug ? modifystr(items.Url_slug) : modifystr(items.Title);
            const blogUrl = `/${router.pathname.substring(1)}/${modifiedSlug}/${items.id}`;
            return (
              <div className="row blogListCard mx-0" key={index}>
                <div className='blogTOp'>
                  <div className="col-4 blog1">
                    <Link href={blogUrl}>
                      <Image
                        className='imageBlogSection'
                        width={100}
                        height={100}
                        unoptimized={true}
                        src={items.Image}
                        alt={items.Alt_Text}
                        title={items.Alt_Text}
                        onError={(e) => (e.target.src = '/image/blankImage.jpg')}
                      />
                    </Link>

                  </div>
                  <div className="col">
                    <div className="blogcardText">
                      <div className="blogDate">
                        <span>{items.Publish_Date.slice(0, 10)}</span>
                      </div>
                      <Link href={blogUrl}>
                        <h2 className="blogcardHeading">{items.Title}</h2>
                      </Link>
                      <div
                        onClick={() => { router.push(blogUrl) }}
                        className="blogcardDescription"
                        dangerouslySetInnerHTML={{ __html: items.Description?.split('</p>')[0] }}
                      />
                      <div className="row extra_function extra_function_destop">
                        <div className="col-3">
                          <span className="action_icons"><AiFillEye /></span>
                          <span>{items.ViewCount} Views</span>
                        </div>
                        <div className="col-3">
                          <span className="action_icons"><BiCommentDetail /></span>
                          <span>{items.commentCount}</span>
                        </div>
                        <div className="col-3">
                          <span
                            onClick={() => PostLike(items)}
                            className="action_icons"
                          >
                            {state?.login && items.Liked ? (
                              <AiFillHeart color="#31B655" />
                            ) : (
                              <FaRegHeart color="#31B655" />
                            )}
                          </span>
                          <span>{items.likeCount}</span>
                        </div>
                        <div className="col-3">
                          <span className="action_icons">
                            <RWebShare
                              data={{ url: `https://www.weedx.io/${router.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}` }}
                              sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                              onClick={() => console.info("share successful!")}
                              color="#31B665"
                            >
                              <BsShareFill />
                            </RWebShare>
                          </span>
                          <span>Share</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-1">
                  <div className="row extra_function extra_function_mobile">
                    <div className="col-3">
                      <span className="action_icons"><AiFillEye /></span>
                      <span>{items.ViewCount}</span>
                    </div>
                    <div className="col-3">
                      <span className="action_icons"><BiCommentDetail /></span>
                      <span>{items.commentCount}</span>
                    </div>
                    <div className="col-3">
                      <span
                        className="action_icons"
                        onClick={() => PostLike(items)}
                      >
                        {state?.login && items.Liked ? (
                          <AiFillHeart color="#31B655" />
                        ) : (
                          <FaRegHeart color="#31B655" />
                        )}
                        <span>{items.likeCount}</span>
                      </span>
                    </div>
                    <div className="col-3">
                      {/* Additional actions can be added here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div id='skeleton'>
            {   showabledata.length % 10 === 0 &&
                <div className="col-md-12 col-12 DeliveryItemsCardSkeleton">
                    {DeliverItemsCardArray.map((items, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="col-12 eachDeliveryItemsCardLeftSkeleton">
                                    <div className="col-12 d-flex ">
                                        <div className="col-4 DeliveryItemsCardLeftSkeleton">
                                            <Skeleton variant="rectangular" sx={{ height: "150px", width: "90%", borderRadius: "10px" }} />
                                        </div>
                                        <div className="col-8 DeliveryItemsCardRightSkeleton d-flex">
                                            <div className="col-6 deliveryItemFirstRightSide">
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", marginTop: "10px", width: "60%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "70%", marginTop: "10px", }} />
                                            </div>
                                            <div className="col-6 deliveryItemRightSide">
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "60%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "80%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "60%", marginTop: "10px", }} />
                                                <Skeleton variant="text" sx={{ height: "20px", width: "90%", marginTop: "10px", }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 DeliveryItemsCardRightSkeletonBtn">
                                        <Skeleton variant="text" sx={{ height: "20px", width: "30%", }} />
                                        <Skeleton variant="text" sx={{ height: "50px", width: "20%",borderRadius:"25px" }} />
                                    </div>
                                </div>

                            </React.Fragment>
                        )
                    })}
                </div>
            }
        </div>
    </>
  )
}

export default Blogscroller