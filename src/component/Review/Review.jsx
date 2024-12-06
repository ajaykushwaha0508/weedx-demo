import OverAllReview from "./ReviewComponent/OverAllReview"
import RelatedReview from "./ReviewComponent/RelatedReview"
import { AiFillLike } from "react-icons/ai";
import sortBy from "lodash/sortBy";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useRouter } from "next/router";
import style from "../../styles/style"
import newclases from '@/styles/customstyle.module.css'
import Select from '@mui/material/Select';
import React,{useEffect, useState} from "react"
import WriteReviewPopup from "./ReviewPopup/WriteReviewPopup"
const Review = ({ reviewloading, handleEdit, delBtn,reviewtype, setReviewtype, type, Rating, handleDelete, onSubmit, api, SetApi, GetProductReview, SetGetProductReview, AllReview, SetReview, HellFull }) => {
    const [short,setSort] = useState('highrate')
    const location = useRouter()
    const [sorteddata , setsorteddata] = useState([])
    let noofreview = AllReview.length
    const classes = style()
    useEffect(()=>{
       if(short === "helpful"){
        setsorteddata(sortBy(AllReview, [function(o) { return o.count; }]).reverse())
       }else if(short === "newest"){
        setsorteddata(sortBy(AllReview, [function(o) { return o.created_at; }]).reverse())
       
       }else if(short === "highrate"){
        setsorteddata(sortBy(AllReview, [function(o) { return o.rating; }]).reverse())
       }else if(short === "lowrate"){
        setsorteddata(sortBy(AllReview, [function(o) { return o.rating; }]))
       }
    },[short , AllReview])
    console.log(sorteddata ,'short')
    return (
        <div className={newclases.review_secton}>
            <h2 className={newclases.section_main_title}>{location.pathname.slice(1, 9) === "products" ?"products Review" : `${reviewtype} Reviews`}</h2>
            <div className="row">
                    <div className="col-12">
                            <div className="my-3 gap-3 d-flex justify-content-end">
                                { type === "store" &&
                                    <FormControl className={`${classes.reviewFilter}`} >
                                        <Select value={reviewtype}   onChange={(e)=>{setReviewtype(e.target.value)}} >
                                            <MenuItem value={'All'}>{`All Review`}</MenuItem>
                                            <MenuItem value={"product"}>{`Product Review`}</MenuItem>
                                            <MenuItem value={"store"}>{`Store Review`}</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                                        
                                {   
                                    noofreview !== 0 && <FormControl className={`${classes.reviewFilter}`} >
                                        <Select value={short} onChange={(e)=>{setSort(e.target.value)}}  >
                                            <MenuItem value={' '}><span>{`Short By`}</span></MenuItem>
                                            <MenuItem value={'helpful'}>{`Most Relevant`}</MenuItem>
                                            <MenuItem value={'newest'}>{`Newest Rating`}</MenuItem>
                                            <MenuItem value={'highrate'}>{`Highest Rating`}</MenuItem>
                                            <MenuItem value={'lowrate'}>{`Lowest Rating`}</MenuItem>
                                        </Select>
                                    </FormControl>
                                }
                            </div>
                    </div>
            </div>
            {
                noofreview !== 0 ?
                    <div className="row">
                        <div className={`col-md-5 col-12 ${newclases.reviews_description}`}>
                            <OverAllReview
                                Rating={Rating}
                                noReview={noofreview}
                                GetProductReview={GetProductReview}
                                SetGetProductReview={SetGetProductReview}
                                onSubmit={onSubmit}
                                api={api}
                                SetApi={SetApi}
                                reviewloading={reviewloading}
                                AllReview={AllReview}
                            />
                        </div>
                        <div className="col-md-7 col-12">
                            <RelatedReview
                                HellFull={HellFull}
                                storeDetails={delBtn}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                AllReview={sorteddata?.length !== 0 ? sorteddata : AllReview } 
                                SetReview={SetReview}
                                GetProductReview={GetProductReview}
                                SetGetProductReview={SetGetProductReview}
                            />
                        </div>
                    </div>
                    :
                    <div className={newclases.noReview}>
                        <div className={newclases.noreviewicon}>
                            <div className={newclases.iconcircl}><AiFillLike size={70} color="gray" /></div>
                        </div>
                        <h3 className={newclases.noreview_title}>{`Be the first to review`}</h3>
                        <p className={newclases.noreview_description}>{`Share your experience with the weedx community.`}</p>
                        <WriteReviewPopup onSubmit={onSubmit} button className={'noReviewBtn'} GetProductReview={GetProductReview} SetGetProductReview={SetGetProductReview} api={api} SetApi={SetApi} />
                    </div>
            }

        </div>
    )
}
export default Review