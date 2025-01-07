import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style";
import { Post_Comment } from "@/hooks/apicall/api";
// import BlogPaginate from "@/component/BlogComponent/BlogPaginate.jsx";  
// import { IconButton } from "@material-ui/core";
// import { BlogLike, Get_Comment, Post_BlogLike } from "@/hooks/apicall/api"
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Createcontext from "@/hooks/context"
// import _ from "lodash"
const RecentPostComment = ({  scrolltocomment, id, GetUserComment, SetUserComment,Get }) => {
    const [ShowCards, SetShowCards] = React.useState(false)
    const [GetComment, SetComment] = React.useState('')
    const classes = useStyles()
    const { state } = React.useContext(Createcontext)
    // const [CommentCardArrays, SetCommentCardArray] = React.useState()
    // let currentPosts = CommentCardArrays?.slice(indexOfFirstPost, indexOfLastPost);
    function WriteComment(e) {
        if (state?.login) {

            SetComment(e.target.value)
        }
        else{
            alert("Please first login")
        }
    }
    const PostComment = async () => {
        
        await Post_Comment(id, GetComment).then((res) => {
                  SetUserComment({ ...GetUserComment, "CommentCounts": res.data.CommentCounts })
                  Get(id)
                  SetComment('')
                  scrolltocomment()
        }).catch((error) => {
           
        })

    }
    // let usercomment = currentPosts?.filter((item) => {
    //     return item.user === state?.Profile.id
    // })
    // let newdata = currentPosts?.filter((item, index) => {
    //     return item.user !== state.Profile.id
    // })
    // const paginate = (pageNumber) => {
    //     setCurrentPage(pageNumber);
    // };
    // const previousPage = () => {
    //     if (currentPage !== 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };
    // const nextPage = () => {
    //     if (currentPage !== Math.ceil(CommentCardArrays?.length / postsPerPage)) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };
    //  async function GetCommentfun(id) {
    //         Get_Comment(id).then((res) => {
    //             console.log(res.data.Comments , "res.data.Comments")
    //             Setcommnet({ ...Getcommnet, "CommentCounts": res.data.CommentCounts, 'UserComment': res.data.Comments })
    //         }).catch((error) => {
    //             console.error(error)
    //         })
    // }
    // React.useEffect(() => {
    //     SetComment( _.find(GetUserComment.UserComment, (o) => { return o?.user === state?.Profile?.id })?.comment  === undefined ? "" : _.find(GetUserComment.UserComment, (o) => { return o?.user === state?.Profile?.id })?.comment)
    // }, [GetUserComment ,state])
    return (
        <React.Fragment>
            <div className="col-12 recentPost_comment_container px-0">
                <div className="recentPost_commentInner_cont">
                    <div className="mt-2 recentPostComment_head_cont">
                        <h2 className="recentPostComment_head">{'Comment'}</h2>
                    </div>
                    <div className="recentPostComment_editor_cont mt-2">
                        <textarea type="text" value={GetComment} onChange={WriteComment} className="BolgCommentBOx" rows="4" cols="50"></textarea>
                    </div>
                    <div className="col-12 p x-0  recentPostBtnCenter mt-4">
                        <Box className={`recentPostBox_width1 ${classes.recentPostCancelBtn}`}>
                            <LoadingButton variant="outlined">{'Cancel'}</LoadingButton>
                        </Box>
                        <Box className={`recentPostBox_width2 ${classes.recentPostCancelBtn2}`} >
                            <LoadingButton disabled={state?.login === false ?true :false} onClick={PostComment} variant="outlined">{'Post'}</LoadingButton>
                        </Box>
                    </div>
                </div>
            </div>
           
            <section className="px-0" id="blodComment">
                {/* <div className="col-12 blogsCommentCountCol">
                    <div className="col-6">
                        <h2 className="blogsCommentheadings">{'Comments'} ({CommentCardArrays?.length})</h2>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        {ShowCards ? (
                            <IconButton onClick={() => SetShowCards(!ShowCards)}><IoIosArrowUp /></IconButton>
                        ) : (
                            <IconButton onClick={() => SetShowCards(!ShowCards)}><IoIosArrowDown /></IconButton>
                        )}
                    </div>
                </div> */}


                {
                    ShowCards && (
                        <section>
                            {/* {  
                                (state?.login && Boolean(usercomment?.length)) &&
                                GetUserComment.UserComment?.map((val, index) => {

                                    const CommentDate = val.created_at.slice(0, 10).split("-").reverse().join("-")
                                    return (
                                        <div className="border blogCommentEachCards" key={index}>
                                            <div className="col-12 blogsCommentCardDateCol">
                                                <span className="blogsCommentCardDate">{CommentDate}</span>
                                            </div>
                                            <div className="col-12 d-flex align-items-center">
                                                <div className="commentCardImages">
                                                    <div className="imageContainer">
                                                        <Image    onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={500} height={500} src={`${val.image}`} className="blogsCommentImages" alt={val.username} title={val.username} />
                                                    </div>
                                                </div>
                                                <div className="commentCradContentSection">
                                                    <h2 className="blogCommentName">{val.username}</h2>
                                                    <div className="col-12">
                                                        <p className="blogUserComments">{val.comment}</p>
                                                    </div>

                                                </div>
                                                {state?.login && state?.Profile?.id === val.user && (
                                                    <div className="col d-flex justify-content-center align-items-center">
                                                        <span className='userreviewaction'> {
                                                            <Select

                                                                IconComponent={BsThreeDotsVertical} labelId="demo-simple-select-error-label"
                                                                sx={{
                                                                    boxShadow: "none",
                                                                    padding: '0',

                                                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                                    {
                                                                        border: 0,
                                                                        outline: "none"

                                                                    },
                                                                    "& .MuiSelect-select": {
                                                                        padding: '0 10px !important'
                                                                    },
                                                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                                    {
                                                                        border: 0,
                                                                        outline: "none"
                                                                    },
                                                                    "&.Mui-focused .MuiSelect-icon": { color: "#31B665" },
                                                                    "&:hover": {
                                                                        ".MuiSelect-icon": {
                                                                            color: "#31B665"
                                                                        }
                                                                    },
                                                                }}
                                                            >
                                                                <List className={classes.orderEditList}>
                                                                    <ListItem button className={classes.orderEditListitem} onClick={() => handleDelete(val.id)}>
                                                                        <AiFillDelete color='31B665' />
                                                                        Delete
                                                                    </ListItem>
                                                                    <ListItem button className={classes.orderEditListitem}>

                                                                        <FaEdit color='31B665' />
                                                                        Edit
                                                                    </ListItem>
                                                                </List>
                                                            </Select>

                                                        }</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })   
                            } */}
                            {/* {GetUserComment.UserComment?.map((val, index) => {

                                const CommentDate = val.created_at.slice(0, 10).split("-").reverse().join("-")
                                return (
                                    <div className="border blogCommentEachCards" key={index}>

                                        <div className="col-12 blogsCommentCardDateCol">
                                            <span className="blogsCommentCardDate">{CommentDate}</span>

                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="commentCardImages">
                                                <div className="imageContainer">
                                                    <Image   onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={500} height={500}
                                                        src={`${val.image}`} className="blogsCommentImages" alt={val.username} title={val.username} />
                                                </div>
                                            </div>
                                            <div className="commentCradContentSection">
                                                <h2 className="blogCommentName">{val.username}</h2>
                                                <p className="blogUserComments">{val.comment}</p>
                                            </div>
                                            {state?.login && state?.Profile?.id === val.user && (
                                                <div className="col d-flex justify-content-center align-items-center">
                                                    <IconButton> <BsThreeDotsVertical color="#31B665" size={20} /></IconButton>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })} */}
                            {/* <BlogPaginate postsPerPage={postsPerPage} totalPosts={CommentCardArrays?.length}  paginate={paginate} previousPage={previousPage}  nextPage={nextPage} /> */}
                        </section>
                    )
                    // GetUserComment.UserComment?.map((val, index) => {
                    //     const CommentDate = val.created_at.slice(0, 10).split("-").reverse().join("-")
                    //     return (
                    //         <div className="border blogCommentEachCards" key={index}>

                    //             <div className="col-12 blogsCommentCardDateCol">
                    //                 <span className="blogsCommentCardDate">{CommentDate}</span>

                    //             </div>
                    //             <div className="col-12 d-flex justify-content-center">
                    //                 <div className="commentCardImages">
                    //                     <div className="imageContainer">
                    //                         <Image   onError={(e) => (e.target.src = '/blankImage.jpg')} priority width={500} height={500}
                    //                             src={`${val.image}`} className="blogsCommentImages" alt={val.username} title={val.username} />
                    //                     </div>
                    //                 </div>
                    //                 <div className="commentCradContentSection">
                    //                     <h2 className="blogCommentName">{val.username}</h2>
                    //                     <p className="blogUserComments">{val.comment}</p>
                    //                 </div>
                    //                 {state?.login && state?.Profile?.id === val.user && (
                    //                     <div className="col d-flex justify-content-center align-items-center">
                    //                         <IconButton> <BsThreeDotsVertical color="#31B665" size={20} /></IconButton>

                    //                     </div>
                    //                 )}
                    //             </div>
                    //         </div>
                    //     )
                    // })
                }
            </section>
            
        </React.Fragment> 
    )
}
export default RecentPostComment