import "./AddToCart.css";
import React from "react";
import AddToCartReview from "./AddToCartReview"
import AddToCartSummary from "./AddToCartSummary"
import Createcontext from "../../../../Hooks/Context"
import { Link, useLocation } from "react-router-dom";
import EmptyCard from "../EmptyCard/EmptyCard"
import { Cart } from "../../../Component/ScoPage/CommenpageSeo";
const AddToCart = () => {
    const { state } = React.useContext(Createcontext)
    // React.useEffect(()=>{
    //     document.documentElement.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: "instant", // Optional if you want to skip the scrolling animation
    //     });
    
    // },[])
    const location = useLocation()
    return (

        <div className="container">
            <Cart></Cart>
            {
                state?.AllProduct?.length !== 0
                 ?
                    <div className="row mt-4">
                        <div className="col-12 addTocard_main_container_height">
                            {   location.pathname !== '/carts' && <div className="col-12 addtoCart_headingss">
                                <p className="mb-0">Your Cart from</p>
                                <Link to={`/weed-deliveries/${state.AllProduct[0]?.StoreName.replaceAll(' ' ,'-')}/${state.AllProduct[0]?.Store_id}`}>          <h1 className="addToCartHeadingss"> {state.AllProduct[0]?.StoreName} </h1> </Link>
                                                  </div>
                            }
                            <div className="row  AddProductCartContainer">

                                <div className="col-lg-8 col-12 AddProductCartContainerinner">

                                    <AddToCartReview />

                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <AddToCartSummary />
                                </div>




                            </div>
                        </div>

                    </div>
                    :
                    <EmptyCard></EmptyCard>
            }
        </div >
    )
}
export default AddToCart

