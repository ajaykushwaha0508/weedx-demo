import React, { useContext, useEffect, useState } from 'react'
import { getAllNews } from '../../../../Api/Api.jsx';
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { Link, useLocation, useParams } from 'react-router-dom';
import SearchBar from '@mkyy/mui-search-bar';
import useStyles from "../../../../Style.jsx";
import axios from "axios";
import { BlogLike,Post_BlogLike} from "../../../../Api/Api"
import { FaRegHeart } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { NewsSeo } from "../../../Component/ScoPage/NewsSeo.jsx";
import DeliveryItemsCardSkeleton from '../../../Component/Skeleton/Deliveries/DeliveriesComponent/DeliveryMenu/DeliveryItemsCardSkeleton.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import _, { reverse } from "lodash";
import Createcontext from '../../../../Hooks/Context.jsx';
import { RWebShare } from "react-web-share";
import { IconButton } from "@material-ui/core";
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'
import Loader from '../../../Component/Loader/Loader.js';
import  {modifystr} from "../../../../Hooks/Function.jsx"
const Allblogs = () => {
  const [allblogs, setallblogs] = useState([])
  let location= useLocation();
  const navigate = useNavigate()
  const { state } = React.useContext(Createcontext)
  const [value, SetValue] = React.useState([])
  const [allLikes, SetallLikes] = React.useState([])
  const [isdata, setisdata] = useState(true)
  const [loader, setloader] = React.useState(true)
  const [searchtext , setsearchtext] = useState('')
  const classes = useStyles()
  const cookies = new Cookies();
  let token_data = cookies.get('User_Token_access')
  let accessToken = localStorage.getItem('User_Token_access');
  if(  Boolean(accessToken) ){ token_data  =  accessToken}

  useEffect(() => {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      }); 
       
      if (state.login) {
        
            if(location.pathname.substring(1)==='blogs'){
              axios.get('https://api.cannabaze.com/UserPanel/Get-NewsbyCategorybyBlog/').then(async (res) => {

                let as = _.orderBy(res.data, [ 'created' ],  [ 'asc', 'desc' ]);
                setallblogs(as)
                setloader(false)
                setisdata(true)
              }).catch((err) => {
                console.trace(err)
                setloader(false)
      
              })
            }else{
                axios.get('https://api.cannabaze.com/UserPanel/Get-NewsbyCategorybyCANNABISNEWS/').then(async (res) => {
              
                let as = _.orderBy(res.data, [ 'created' ],  [ 'asc', 'desc' ]);
                setallblogs(as)
                setloader(false)
                setisdata(true)
                }).catch((err) => {
                  console.trace(err)
                })
            }
      }else{
        if(location.pathname.substring(1)==='blogs'){
          axios.get('https://api.cannabaze.com/UserPanel/Get-NewsbyCategorybyBlog/').then(async (res) => {
            
            let as = _.orderBy(res.data, [ 'created' ],  [ 'asc', 'desc' ]);
            setallblogs(as)
            setloader(false)
            setisdata(true)
          }).catch((err) => {
            console.trace(err)
            setloader(false)
  
          })
        }else{
            axios.get('https://api.cannabaze.com/UserPanel/Get-NewsbyCategorybyCANNABISNEWS/').then(async (res) => {
          
            let as = _.orderBy(res.data, [ 'created' ],  [ 'asc', 'desc' ]);
            setallblogs(as)
            setloader(false)
            setisdata(true)
            }).catch((err) => {
              console.trace(err)
            })
        }
      }
  }, [location.pathname])
  function Searchbar(e){
    setsearchtext(e)
   axios.post('https://api.cannabaze.com/UserPanel/Get-BlogSearchApi/', {
      "search": e
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
   }).then((res)=>{
    setallblogs(res.data)
   })
  }
  function PostLike(item) {
   
    if (state.login) {
        Post_BlogLike(item?.id , !item.Liked ).then((res) => {
       
        axios.get('https://api.cannabaze.com/UserPanel/GetNewsbyUser/',{
      
          headers: { Authorization: `Bearer ${token_data}` }
      
          }).then(async (res) => {
          setallblogs(res.data)
         setloader(false)

          setisdata(true)
          }).catch((err) => {
            console.trace(err)
          })

        }).catch(() => {

        })
    }
    else {
      navigate('/login')
    }
  }
  return (
    <React.Fragment>   
      <NewsSeo location={location.pathname.substring(1)} ></NewsSeo>
      <div>
         <div className='p-md-0 p-2 d-md-flex  justify-content-between align-items-center'>   
         <div className='col-lg-3'>
            <h1 className='section_main_title'>  { location.pathname.substring(1)==='blogs' ? "Blogs" :" Latest news "}   </h1>
          </div> 
            <SearchBar value={searchtext}  onChange={(e)=>Searchbar(e)} style={{ background: "#FFFFF", border: "1px solid #31B665" }} width={"100%"} placeholder="Search Menu" />
          </div>
          { 
           isdata ? <div className='blogListWrapper'>
            {
              allblogs?.reverse().map((items, index) => {
           
                return (

                  <div className='row blogListCard mx-0' key={index}>
                    <div className='col-3 p-0 d-flex align-items-center'>
                      <div className='blogCardImg'>
                        <Link to={`/${location.pathname.substring(1)}/${items.Url_slug === ("" || null || undefined) ?  modifystr(items.Title) : modifystr(items.Url_slug)}/${items.id}`} key={index}>
                          <LazyLoadImage
                            onError={event => {
                              event.target.src = "/image/blog.jpg"
                              event.onerror = null
                            }}
                            src={`${items.Image}`} alt={items.Alt_Text} title={items.Alt_Text} />
                        </Link>
                      </div>
                    </div>
                    <div className='col-9'>
                      <div className='blogcardText'>
                        <div className='blogDate'> <span>{items.Publish_Date.slice(0, 10)}</span></div>
                        <Link to={`/${location.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}`} key={index}>
                          <h2 className='blogcardHeading'>{items.Title}</h2>
                        </Link>
                        <Link to={`/${location.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}`} key={index}>
                          <p className='blogcardDescription'>   <div dangerouslySetInnerHTML={{ __html: items?.Description.split('</p>')[0]}} /></p>
                        </Link>
                        {/* <p onClick={handlechmnag}>click</p>  */}
                        <div className='row extra_function extra_function_destop '>
                          <div className='col-3'>
                            <span className='action_icons'><AiFillEye /></span>
                            <span>{items.ViewCount} Views</span>
                          </div>
                          <div className='col-3'>
                            <span className='action_icons'><BiCommentDetail /></span>
                            <span>{items.commentCount}</span>
                          </div>
                          <div className='col-3'>
                        
                                
                                   <span onClick={(() => { PostLike(items) })} className='action_icons'> {(state?.login && items.Liked )? <AiFillHeart color={"#31B655"}></AiFillHeart> : <FaRegHeart color="#31B655" /> }</span>
                                
                            <span>{items.likeCount}</span>
                          </div>
                          <div className='col-3'>
                            <span className='action_icons'>
                              <RWebShare
                                data={{ url: `https://www.weedx.io/${location.pathname.substring(1)}/${modifystr(items.Title)}/${items.id}` }}
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
                    <div className='col-12'>
                      <div className='row extra_function extra_function_mobile '>
                        <div className='col-3'>
                          <span className='action_icons'><AiFillEye /></span>
                          <span className=''>{items.ViewCount}</span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'><BiCommentDetail /></span>
                          <span>{items.commentCount} </span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'>
                        
                                        {(state?.login && items.Liked )? <AiFillHeart color={"#31B655"} onClick={()=>{ PostLike(items)}}></AiFillHeart> : <FaRegHeart onClick={()=>{ PostLike(items)}} color="#31B655" /> }
                                   
                                        <span>{items.likeCount}</span>
                            </span>
                        </div>
                        <div className='col-3'>
                          <span className='action_icons'>

                          <RWebShare
                                data={{ url: window.location.href }}
                                sites={["facebook", "twitter", "whatsapp", "telegram", "linkedin", 'mail', 'copy']}
                                onClick={() => console.info("share successful!")}
                                color="#31B665"
                              >
                              <BsShareFill />
                            </RWebShare>
                            </span>

                        </div>
                      </div>
                    </div>
                  </div>

                )



              })
            }

            </div>
            : <DeliveryItemsCardSkeleton></DeliveryItemsCardSkeleton>
          }
          { 
            loader && <Loader/>
          }

      </div>
    </React.Fragment>
  )
}

export default Allblogs




