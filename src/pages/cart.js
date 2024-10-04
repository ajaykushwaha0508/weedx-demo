
import React from "react";
import AddToCartReview from "@/component/Addtocard/AddToCartReview"
import AddToCartSummary from "@/component/Addtocard/AddToCartSummary"
import Createcontext from "@/hooks/context"
import Link from "next/link";
import { useRouter } from "next/router";
import EmptyCard from "@/component/Addtocard/EmptyCard"
import { Cart } from "@/component/ScoPage/CommenpageSeo";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import { modifystr } from "@/hooks/utilis/commonfunction";
const AddToCart = () => {
    const { state } = React.useContext(Createcontext)
    const location = useRouter()


    return (

        <div className="container">
            {state.permission === false && <Currentlocation></Currentlocation>}
            <Cart></Cart>
            {
                state?.AllProduct?.length !== 0
                    ?



                    <div className="row mt-4">
                        <div className="col-12 addTocard_main_container_height">
                            {location.pathname !== '/carts' && <div className="col-12 addtoCart_headingss">
                                <p className="mb-0">{`Your Cart from`}</p>
                                <Link href={`${state.AllProduct[0].Store_Type === "dispensary" ? "/weed-dispensaries" : "/weed-deliveries"}/${modifystr(state.AllProduct[0]?.StoreName)}/${state.AllProduct[0]?.Store_id}`}>          <h1 className="addToCartHeadingss"> {state.AllProduct[0]?.StoreName} </h1> </Link>
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

