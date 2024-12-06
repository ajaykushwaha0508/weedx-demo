import { useState, useEffect, useContext } from 'react';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsStar, BsStarFill } from "react-icons/bs";
import { IconButton } from "@mui/material";
import { useRouter } from 'next/router';
import axios from 'axios';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { FaComment } from "react-icons/fa";
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import Badge from '@mui/material/Badge';
import Createcontext from "@/hooks/context";
import useStyles from "@/styles/style";
import { StoreHelpFull } from '@/hooks/apicall/api';
import { ProductHelpFull } from '@/hooks/utilis/ProductApi';
import { Menuintegration_login } from '@/component/Menuintregation/Menuintregation';
import clases from '@/styles/customstyle.module.css'

const Myreview = () => {
    const classes = useStyles();
    const [allproductreviews, setAllProductReviews] = useState([]);
    const [allstorereviews, setAllStoreReviews] = useState([]);
    const cookies = new Cookies();
    const [open, setOpen] = useState(false);
    const { state, dispatch } = useContext(Createcontext);
    const router = useRouter();
    let token_data = cookies.get('User_Token_access');
    let accessToken;

    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('User_Token_access');
    }

    if (Boolean(accessToken)) {
        token_data = accessToken;
    }

    useEffect(() => {
        if (state.login) {
            axios.get('https://api.cannabaze.com/UserPanel/Get-ProductReviewbyUser/', {
                headers: { Authorization: `Bearer ${token_data}` }
            }).then((res) => {
                setAllProductReviews(res.data);
            });

            axios.get('https://api.cannabaze.com/UserPanel/Get-StoreReviewbyUser/', {
                headers: { Authorization: `Bearer ${token_data}` }
            }).then((res) => {
                setAllStoreReviews(res.data);
            });
        }
    }, [state.login, token_data]);

    const handleHelpfulProductReview = (reviewId) => {
        if (state.login) {
            ProductHelpFull(reviewId.id, state.Profile.id).then(() => {
                axios.get('https://api.cannabaze.com/UserPanel/Get-ProductReviewbyUser/', {
                    headers: { Authorization: `Bearer ${token_data}` }
                }).then((res) => {
                    setAllProductReviews(res.data);
                });
            }).catch((error) => {
                console.trace(error);
            });
        }
    };

    const handleHelpfulStoreReview = (reviewId) => {
        if (state.login) {
            StoreHelpFull(reviewId.id, state.Profile.id).then(() => {
                axios.get('https://api.cannabaze.com/UserPanel/Get-StoreReviewbyUser/', {
                    headers: { Authorization: `Bearer ${token_data}` }
                }).then((res) => {
                    setAllStoreReviews(res.data);
                });
            }).catch(() => {});
        }
    };

    const [readopen, setReadOpen] = useState(true);
    const textGive = (text) => {
        let arrofstr = text?.split(' ');
        let finalstr = "";
        if (arrofstr?.length >= 100 && readopen) {
            for (let i = 0; i < 100; i++) {
                finalstr += `${arrofstr[i]} `;
            }
        } else {
            finalstr = text;
        }
        return finalstr;
    };

    const calculateTimeFromDate = (value) => {
        console.log(value)
        let diffTime = Math.abs(new Date().valueOf() - new Date(value).valueOf());
        let months = Math.trunc(diffTime / (24 * 60 * 60 * 1000) / 30);
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        let secs = (minutes % 1) * 60;
        [days, hours, minutes, secs] = [Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)];
        if (months !== 0) {
            return months + "Month ago";
        } else if (days !== 0) {
            return days + "days ago";
        } else if (hours !== 0) {
            return hours + "hours ago";
        } else if (minutes !== 0) {
            return minutes + "minutes ago";
        } else {
            return secs + "secs ago";
        }
    };
    return (
        <div className='container'>
            <div className='myreviewContainer'>
                <div className='w-100 d-flex gap-2 align-items-center my-4'>
                    <span><IconButton onClick={() => router.push('-1')}><MdOutlineKeyboardArrowLeft color="#000000" /></IconButton></span>
                    <span onClick={() => router.push(-1)} className="BackPageBtn">Back</span>
                </div>
                <div className="col-12 mt-sm-4 mt-2">
                    <h1 className={clases.section_main_title}>{'My Reviews'}</h1>
                </div>
                {
                    !Boolean(allstorereviews.length && allproductreviews.length) ?  <div className=" Empty_container_margin_top">
                    <div className="EmtyCard_container">
                            <div className="image_container">
                                <div className="Empty_card_image">
                                    <Box className={classes.muiIcons}>
                                    <FaComment size={40}/>
                                    </Box>
                                </div>
        
                            </div>
                            <div className="height_empty_div_heading">
                                <h1>{`Your cart is empty`}</h1>
                            </div>
                            <p className="height_empty_div_paragraph ellipsis">{`Don't wait to bake. Add items to your cart and enjoy`}</p><br/>
                            <p className="height_empty_div_paragraph ellipsis">{` your weed today.`}</p>
                            {/* {   
                                <div className="height_Empty_btnDiv mt-2">
                                    <Box className={`  ${classes.loadingBtnTextAndBack}`}>
                                            <LoadingButton  style={{width:"100%",height:"100%"}} variant="outlined" loading={false} type={'submit'}>{`Shop now`}</LoadingButton>
                                    </Box>
                                </div>
                            } */}
                    </div>
                </div>
                :
                <div className='reviews'>
                    {allstorereviews?.map((item) => (
                        <div className='myreviewBox' key={item?.review?.id}>
                            <div className='reviewHeaders mb-sm-4 mb-3 d-flex gap-3'>
                                <div className='productReviewImg'>
                                    <div className='productreview_imgcircle'>
                                        <Image   onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={400} height={400} src={item?.Product?.images[0]?.image} alt='Profile' title='Profile' className="Navbar_profile_imgs" />
                                    </div>
                                </div>
                                <div className='productReviewText'>
                                    <h2 className='producRRRtitle'>{item?.review?.ProductName}</h2>
                                    <h4>{calculateTimeFromDate(item?.review?.created_at)}</h4>
                                </div>
                            </div>
                            <div className="d-flex gap-1">
                                {Boolean(item.rating) && new Array(item?.review?.rating).fill(null).map((_, index) => (
                                    <BsStarFill size={16} color="#31B665" className="" key={index} />
                                ))}
                             {Array.from({ length: 5 - (item?.review?.rating || 0) }).map((_, index) => (
                                <BsStar size={16} color="#31B665" className="" key={index} />
                            ))}
                            </div>
                            <h2 className="Myreview_titile">{item?.review?.Title}</h2>
                            <p className='myreviewComment'>{item?.review?.comment}</p>
                            {item?.review?.Reply !== null && (
                                <div className='replyByvenderreview'>
                                    <div className='container-fluid mx-2 review_reply'>
                                        <div className="d-flex gap-2">
                                            <div className="related_img_container">
                                                <div className="related_review_image">
                                                    <Image   onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={100} height={100} className='realted_review_images' src={item?.review?.StoreImage} alt="userImage" title="userImage" />
                                                </div>
                                            </div>
                                            <div className="related_review_content">
                                                <h3 className='reviews_title'>Response from the Owner</h3>
                                                <p className='reviews_writer'>{item?.review?.Store_Name}</p>
                                                <div className='review_date'>
                                                    <p>{calculateTimeFromDate(item?.review?.ReplyTime)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='review_description_container'>
                                            <p>{textGive(item.Reply)} {item?.Reply?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => setReadOpen(!readopen)}>...Read {readopen ? "More" : "Less"}</span>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='myreview_footer text-end px-3'>
                                <Badge badgeContent={item?.review?.count} className={classes.sliderLink_badge}>
                                    {item?.review?.helpfull?.includes(state?.Profile?.id)
                                        ? <AiTwotoneLike color='#31B655' size={25} onClick={() => { state?.login ? handleHelpfulProductReview(item?.review) : router.push('/login') }} />
                                        : <AiOutlineLike color='#31B655' size={25} onClick={() => { state.login ? handleHelpfulProductReview(item?.review) : router.push("/login") }} />}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    {/* {allproductreviews?.map((item) => (
                        <div className='myreviewBox' key={item.id}>
                            <div className='reviewHeaders mb-sm-4 mb-3 d-flex gap-3'>
                                <div className='productReviewImg'>
                                    <div className='productreview_imgcircle'>
                                        <Image    onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={100} height={100} src={item?.StoreImage} alt='Profile' title='Profile' className="Navbar_profile_imgs" />
                                    </div>
                                </div>
                                <div className='productReviewText'>
                                    <h2 className='producRRRtitle'>{item.StoreName}</h2>
                                    <h4>{calculateTimeFromDate(item.created_at)}</h4>
                                </div>
                            </div>
                            <div className="d-flex gap-1">
                                {Boolean(item.rating) && new Array(item?.rating).fill(null).map((_, index) => (
                                    <BsStarFill size={16} color="#31B665" className="" key={index} />
                                ))}
                                {new Array(Math.max(0, 5 - (item?.rating ?? 0))).fill(null).map((_, index) => (
                                    <BsStar size={16} color="#31B665" className="" key={index} />
                                ))}
                            </div>
                            <h2 className="Myreview_titile">{item.Title}</h2>
                            <p className='myreviewComment'>{item.comment}</p>
                            {item.Reply !== null && (
                                <div className='replyByvenderreview'>
                                    <div className='container-fluid mx-2 review_reply'>
                                        <div className="d-flex gap-2">
                                            <div className="related_img_container">
                                                <div className="related_review_image">
                                                    <Image   onError={(e) => (e.target.src = '/blankImage.jpg')}  priority width={100} height={100} className='realted_review_images' src={item?.StoreImage} alt="userImage" title="userImage" />
                                                </div>
                                            </div>
                                            <div className="related_review_content">
                                                <h3 className='reviews_title'>Response from the Owner</h3>
                                                <p className='reviews_writer'>{item?.StoreName}</p>
                                                <div className='review_date'>
                                                    <p>{calculateTimeFromDate(item?.ReplyTime)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='review_description_container'>
                                            <p>{textGive(item?.Reply)} {item?.Reply?.split(' ')?.length >= 100 && <span className='band_shlebtn' onClick={() => setReadOpen(!readopen)}>...Read {readopen ? "More" : "Less"}</span>}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='myreview_footer text-end px-3'>
                                <Badge badgeContent={item?.count} className={classes.sliderLink_badge}>
                                    {item?.helpfull?.includes(state?.Profile?.id)
                                        ? <AiTwotoneLike color='#31B655' size={25} onClick={() => { state?.login ? handleHelpfulStoreReview(item) : (router.pathname.includes('/menu-integration') ? setOpen(true) : router.push('/login')) }} />
                                        : <AiOutlineLike color='#31B655' size={25} onClick={() => { state.login ? handleHelpfulStoreReview(item) : (router.pathname.includes('/menu-integration') ? setOpen(true) : router.push('/login')) }} />}
                                </Badge>
                            </div>
                        </div>
                    ))} */}
                </div>
                }
            </div>
            {open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>}
        </div>
    );
};

export default Myreview;
