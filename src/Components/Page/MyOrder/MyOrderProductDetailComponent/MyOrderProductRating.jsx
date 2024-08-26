import  Rating from "@mui/material/Rating"
import useStyles from "../../../../Style"
const MyOrderProductRating=()=>{
    const classes=useStyles()
    return(
        <div className="col-xl-7 col-lg-10 col-md-12 MyOrderProductRating mt-4 border">
            <div className="w-100 MyOrderProductRating_innerContainer">
                <h1 className="productRating_heading">How was the product?</h1>
                <Rating name="read-only" className={classes.myOrderRatingStarIcons} color="#31B665" value={4} readOnly />
            </div>

        </div>
    )
}
export default MyOrderProductRating