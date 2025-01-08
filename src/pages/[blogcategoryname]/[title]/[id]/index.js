import React from "react";
import { IoChevronBack } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import { IconButton } from "@material-ui/core";
import useStyles from "@/styles/style";
import dynamic from 'next/dynamic'
const Newsletter = dynamic(() => import('@/component/home/HomePageDealsSignup') , {ssr:true});
const RecentPost = dynamic(() => import('@/component/BlogComponent/RecentPost') , {ssr:true});
import { BsFillShareFill } from "react-icons/bs";
const RecentPostComment = dynamic(() => import('@/component/BlogComponent/RecentPostComment') , {ssr:true});
import { BiCommentDetail } from "react-icons/bi";
import Select from '@mui/material/Select';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import BlogPaginate from "@/component/BlogComponent/BlogPaginate.jsx";  
import { BsThreeDotsVertical } from "react-icons/bs"
import Createcontext from "@/hooks/context";
import { BlogLike, Get_Comment, Post_BlogLike } from "@/hooks/apicall/api"
import _ from "lodash"
import Layout from "@/layout/layout";
import Cookies from 'universal-cookie';
import { RWebShare } from "react-web-share";
import { WhisList } from "@/component/Whishlist/WhisList";
import axios from "axios";
import { SingleNewsSeo } from "@/component/ScoPage/NewsSeo";
import { modifystr } from "@/hooks/utilis/commonfunction";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from '@/styles/customstyle.module.css'
export default function Blogs (props){
    let News = props.data[0]
    const router = useRouter()
    const { state } = React.useContext(Createcontext) 
    const [value, SetValue] = React.useState([])
    const [Getlikes, SetLikes] = React.useState([])
    const [Getcommnet, Setcommnet] = React.useState([])
    // const [GetComment, SetComment] = React.useState('')
    const id = router?.query?.id;
    const [WishList, SetWishList] = React.useState(false)
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {
        accessToken = localStorage.getItem('User_Token_access');
    }
    
    function PostLike(like) {
        if (state?.login) {
            Post_BlogLike(News?.id, !like).then((res) => {
                BlogLike(News.id).then((res) => {
                    SetLikes(res.data.Like)
                    SetValue({ ...value, "LinkCount": res.data.LikeCount })
                }).catch((error) => {
                    console.error(error)
                })
            }).catch(() => {

            })
        }
        else {
            SetWishList(true)
        }
    }
    function color() {
        const l = _.find(Getlikes, function (n) {
            return n?.user === state?.Profile?.id;
        })
        return l
    }
    const [ShowCards, SetShowCards] = React.useState(false)
    const [CommentCardArrays, SetCommentCardArray] = React.useState()
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage] = React.useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = CommentCardArrays?.slice(indexOfFirstPost, indexOfLastPost);
    let usercomment = currentPosts?.filter((item) => {
        return item.user === state?.Profile.id
    })
    let newdata = currentPosts?.filter((item, index) => {
        return item.user !== state.Profile.id
    })
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const nextPage = () => {
        if (currentPage !== Math.ceil(CommentCardArrays?.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    function scrolltocomment() {
        SetShowCards(true)
        // let horiheight = ref.current.children[4].offsetTop - document.getElementById('Navbar_box').clientHeight
        // document.documentElement.scrollTo({
        //     top: horiheight,
        //     left: 0,
        //     behavior: "smooth",
        // });
    }
    function handleDelete(id) {

        axios.delete(`https://api.cannabaze.com/UserPanel/Delete-Comment/${id}`,
            {
                headers: { Authorization: `Bearer ${token_data}` }
            },).then((response) => {
                Get_Comment(id).then((res) => {
                    Setcommnet({ ...Getcommnet, "CommentCounts": res.data.CommentCounts, 'UserComment': res.data.Comments })
                }).catch((error) => {
                    console.error(error)
                })
            })
    }
    async function GetComment(id) {
        await Get_Comment(id).then((res) => {
            Setcommnet({ ...Getcommnet, "CommentCounts": res.data.CommentCounts, 'UserComment': res.data.Comments })
        }).catch((error) => {
            console.error(error)
        })
    }
    return(
        <React.Fragment>
            {state.permission && <Currentlocation />}
               <SingleNewsSeo Title={News?.Meta_title} Description={News?.Meta_Description} location={router.asPath} image={News?.Image}></SingleNewsSeo>
                <div className="row mx-1">
                    <div className="col-12 w-100 row align-items-center justify-content-between blog_searchBar_container px-0">
                        <section className=" col-2 backButton_section">
                            <div className="col-12 backBtnCol_searchBar_height">
                                <Link href={props.category === 'blogs' ? "/blogs" : "/cannabis-news"}><span style={{ marginLeft: "-4px", cursor: 'pointer' }}> <IoChevronBack color="#000000" size={20} /></span></Link>
                                <Link href={props.category === 'blogs' ? "/blogs" : "/cannabis-news"}><span onClick={() => { Location?.pathname?.split('/')[1] === "cannabis-news" ? router.push(Location?.pathname?.split('/')[1] === "cannabis-news" ? '/cannabis-news' : '/blogs') : router.push('/blogs') }} style={{ cursor: 'pointer' }} className="blogBackSpan">Back</span></Link>
                            </div>
                        </section>
                    </div>
                    <div className={'blogEditorContainer'}>
                        <h1 className={'blog_Title'}>{News?.Title}</h1>
                        <section className={'blog_Image'}>
                            <Image src={News.Image} alt="image" width={1200} height={900} quality={100} />
                        </section>
                        <div className={'blog_text_container'}  >
                            <div className={'blogEditorPaddings'}>
                                <figure className={'linkTaginsideEditer'} dangerouslySetInnerHTML={{ __html:News.Description}} />
                            </div>
                        </div>
                        <div className={'blog_text_container'} >
                               <div className={'Linkofblog'}>
                                    <div className={`col BlogSocal viewsBlog`} >

                                        <RWebShare
                                            data={{ url: "https://www.weedx.io" + props.url }}
                                            sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                            onClick={() => console.info("share successful!")}
                                            color="#31B665" >
                                            <IconButton>
                                                <BsFillShareFill size={16}></BsFillShareFill>
                                            </IconButton>
                                        </RWebShare>

                                        <div className="blogViewCounts d-md-block d-none">Share</div>
                                    </div>
                                    <div className={`col viewsBlog BlogSocal`}  >
                                        <IconButton> <IoEyeSharp></IoEyeSharp>  </IconButton>
                                        <span className="blogViewCounts">{News.ViewCount} <span className="d-md-block d-none">Views</span></span>


                                    </div>
                                    <div className={`col viewsBlog BlogSocal`}   onClick={()=>{router.push('#comment')}} >
                                        <IconButton>  <BiCommentDetail />   </IconButton>
                                        <span className="blogViewCounts">{Getcommnet.CommentCounts} <span className="d-md-block d-none"> Comment</span> </span>
                                    </div>
                                    <div className={`col viewsBlog BlogSocal`} >
                                        <IconButton onClick={(() => { PostLike(color()?.like) })}>
                                            <AiFillHeart></AiFillHeart>
                                        </IconButton>
                                        <span className="blogViewCounts">{value?.LinkCount}</span>
                                    </div>
                               </div>
                        </div>
                          <div id="comment" className="col-12">
                        <RecentPost />
                        </div>
                         {WishList && <WhisList open1={WishList} SetWishList={SetWishList}></WhisList>}
                           <RecentPostComment scrolltocomment={scrolltocomment} id={id} GetUserComment={Getcommnet} SetUserComment={Setcommnet} Get={GetComment} />
                      
                   </div>
                </div>
            <Newsletter />
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
    try {
        const { id, title, blogcategoryname } = context.params;

        const res = await fetch(`https://api.cannabaze.com/UserPanel/Get-GetNewsById/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await res.json();
        if( modifystr(data[0].category_name) === blogcategoryname &&  modifystr(data[0].Title) === title && parseInt(id) === parseInt(data[0].id))
        return {
            props: {
                data: data,
                category: blogcategoryname,
            },
        };
        else{
            return {
                notFound: true, // Redirect to 404 if no data found
            };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        };
    }
}
Blogs.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};