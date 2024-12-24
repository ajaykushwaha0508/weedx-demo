import React from 'react'
import { AiFillHeart, AiFillEye } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import Link from 'next/link';
import axios from "axios";
import { useRouter } from 'next/router';
import { Post_BlogLike } from "@/hooks/apicall/api.js"
import { FaRegHeart } from "react-icons/fa";
import { BsShareFill } from "react-icons/bs";
import { NewsSeo } from "@/component/ScoPage/NewsSeo";
import _ from "lodash";
import Image from 'next/image';
import Createcontext from '@/hooks/context.js';
import { RWebShare } from "react-web-share";
import Cookies from 'universal-cookie';
import Blogheaders from '@/component/Pageheaders/Blogheaders';
import { modifystr } from "@/hooks/utilis/commonfunction"
import Layout from "@/layout/layout";
import Currentlocation from '@/component/currentlocation/CurrentLocation';
import Styled from '@/styles/customstyle.module.css';
export default function Allblogs(props){
  const router = useRouter()
  const { state } = React.useContext(Createcontext)
  const cookies = new Cookies();
  let token_data = cookies.get('User_Token_access')
  let accessToken
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('User_Token_access');
  }
  if (Boolean(accessToken)) { token_data = accessToken }
  function PostLike(item) {

    if (state?.login) {
      Post_BlogLike(item?.id, !item.Liked).then((res) => {

        axios.get('https://api.cannabaze.com/UserPanel/GetNewsbyUser/', {

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
      router.push('/login')
    }
  }

  return (
    <div>
      <NewsSeo location={router.pathname.substring(1)} />
      {state.permission && <Currentlocation />}
      <div>
        <Blogheaders title="Latest news" />
        <div className={Styled.blogListWrapper}>
          {props?.initialData.map((items, index) => {
            const modifiedSlug = items.Url_slug ? modifystr(items.Url_slug) : modifystr(items.Title);
            const blogUrl = `/${router.pathname.substring(1)}/${modifiedSlug}/${items.id}`;
            return (
              <div className={`row ${Styled.blogListCard} mx-0`} key={index}>
                <div className='row'>
                  <div className="col-4">
                    <Link href={blogUrl} className='d-sm-block d-flex justify-content-center align-items-center h-100'>
                      <Image className={Styled.imageBlogSection}
                        width={100}
                        height={100}
                        // priority
                        quality={100}
                        src={items.Image}
                        alt={items.Alt_Text}
                        title={items.Alt_Text}
                        onError={(e) => (e.target.src = '/blankImage.jpg')}
                      />
                    </Link>

                  </div>
                  <div className="col">
                    <div className={Styled.blogcardText}>
                      <div className={Styled.blogDate}>
                        <span>{items?.Publish_Date?.slice(0, 10)}</span>
                      </div>
                      <Link href={blogUrl}>
                        <h2 className={Styled.blogcardHeading}>{items.Title}</h2>
                      </Link>
                      <div
                        onClick={() => { router.push(blogUrl) }}
                        className={Styled.blogcardDescription}
                        dangerouslySetInnerHTML={{ __html: items.Description?.split('</p>')[0] }}
                      />
                      <div className={`row d-md-flex d-none ${Styled.extra_function} `}>
                        <div className="col-3">
                          <span className={Styled.action_icons}><AiFillEye /></span>
                          <span>{items.ViewCount} Views</span>
                        </div>
                        <div className="col-3">
                          <span className={Styled.action_icons}><BiCommentDetail /></span>
                          <span>{items.commentCount}</span>
                        </div>
                        <div className="col-3">
                          <span
                            onClick={() => PostLike(items)}
                            className={Styled.action_icons}
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
                          <span className={Styled.action_icons}>
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
                <div className="col-12 d-md-none d-block mt-1">
                  <div className={`row ${Styled.extra_function} ${Styled.extra_function_mobile}`}>
                    <div className="col-4">
                      <span className={Styled.action_icons}><AiFillEye   color="#31B655"/></span>
                      <span>{items.ViewCount}</span>
                    </div>
                    <div className="col-4">
                      <span className={Styled.action_icons}><BiCommentDetail  color="#31B655" /></span>
                      <span>{items.commentCount}</span>
                    </div>
                    <div className="col-4">
                      <span
                        className={Styled.action_icons}
                        onClick={() => PostLike(items)}
                      >
                        {state?.login && items.Liked ? (
                          <AiFillHeart color="#31B655" />
                        ) : (
                          <FaRegHeart color="#31B655" />
                        )}    </span>
                        <span>{items.likeCount}</span>
                  
                    </div>
                  
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  )
}

 Allblogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// export async function getStaticPaths() {
//   const paths = []; // Return an empty array to generate no pages at build time

//   return {
//       paths,
//       fallback: 'blocking', // Set to 'blocking' to generate pages on-demand
//   };
// }


export async function getStaticProps(context) {
  try {
    const res = await fetch('https://api.cannabaze.com/UserPanel/Get-GetNewsbycategory/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "category": 1,
        "limit": 1000
      })
    }).catch(() => null);
    const json = await res.json()
    const data = _.orderBy(json, ['created'], ['desc']); // Assuming 'created' is a date field  
    // console.log(data)
    return {
      props: {
        initialData: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        initialData: [],
      },
      revalidate: 60,
    };
  }
}