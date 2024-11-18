import ProgressBar from "./ProgressBar"
import { AiFillStar } from "react-icons/ai"
import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useStyles from "../../../styles/style"
import newclases from "@/styles/customstyle.module.css"
import WriteReviewPopup from "../ReviewPopup/WriteReviewPopup"
const OverAllReview = ({ Rating, api,noReview,AllReview, SetApi  ,onSubmit,reviewloading,  GetProductReview, SetGetProductReview}) => {
    const classes = useStyles()
    const testData = [
        { starValue: 5, bgcolor: "#31B665", completed: Rating?.FiveStar },
        { starValue: 4, bgcolor: "#31B665", completed: Rating?.FourStar },
        { starValue: 3, bgcolor: "#31B665", completed: Rating?.ThreeStar },
        { starValue: 2, bgcolor: "#31B665", completed: Rating?.TwoStar },
        { starValue: 1, bgcolor: "#31B665", completed: Rating?.OneStar },

    ];
    return (
        <div className="w-100 ">
            <div className={newclases.overall_review_container}>
                <div className="">
                    <div className="m-2 text-end">
                        <WriteReviewPopup onSubmit={onSubmit}   GetProductReview={GetProductReview} reviewloading={reviewloading} SetGetProductReview={SetGetProductReview}  api={api} SetApi={SetApi} />                           
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className={`col-lg-3 col-12  ${newclases.left_circularbar_container}`}>
                        
                                <div className={newclases.left_circularbar}>
                                    <div className="w-100">
                                        <CircularProgressbar 
                                            value={( Rating?.AverageReview *100 /5).toFixed(1) } text={Rating?.AverageReview.toFixed(1)}     styles={{
                                            
                                                path: {
                                                
                                                stroke: `#31B665`,
                                                strokeLinecap: 'butt', 
                                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                                transform: 'rotate(0.25turn)',
                                                transformOrigin: 'center center',
                                                },
                                                trail: {
                                                stroke: '#8F8F8F',
                                                strokeLinecap: 'butt',
                                                transform: 'rotate(0.25turn)',
                                                transformOrigin: 'center center',
                                                },
                                                text: {
                                                
                                                fill: '#000',
                                                
                                                fontSize: '22px',
                                                },
                                                background: {
                                                fill: '#31B665',
                                                },
                                            }} />
                                    </div>
                                    <p className="mb-0">{AllReview?.length} Review</p>
                                </div>
                        
                        </div>
                        <div className={`col-lg-9 col-12 ${newclases.right_horizontal_bar}`}>
                            {testData.map((item, idx) => {
                                return (
                                    <div className="row align-items-center  mt-2 px-4" key={idx}>
                                        <div className={`col-2 ${newclases.overall_flex}`}>
                                            <span>{item.starValue}</span> <span><AiFillStar className={classes.disp_star_color} /></span>
                                        </div>
                                        <div className="col-10 ">
                                            <ProgressBar    bgcolor={item.bgcolor} completed={item.completed} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OverAllReview