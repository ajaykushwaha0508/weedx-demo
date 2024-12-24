import Layout1 from '@/layout/layout1';
import React from 'react'
import AddToCartReview from "@/component/Addtocard/AddToCartReview";
import AddToCartSummary from "@/component/Addtocard/AddToCartSummary";
import Createcontext from "@/hooks/context";
import Link from "next/link";
import { useRouter } from "next/router";
import EmptyCard from "@/component/Addtocard/EmptyCard";
import { Cart } from "@/component/ScoPage/CommenpageSeo";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import { modifystr } from "@/hooks/utilis/commonfunction";
export default function cart(){
    const { state } = React.useContext(Createcontext)
    const location = useRouter()
    console.log( state.AllProduct[0]?.Store_id , state.Embedded_StoreID  , 'addtocart')    
    return(
        <div className="container py-lg-2 py-4">
            {state.permission === false && <Currentlocation></Currentlocation>}
            <Cart></Cart>
            { ( ( !location.asPath.includes('embedded') && state?.AllProduct?.length !== 0) || (location.asPath.includes('embedded') && state.AllProduct[0]?.Store_id === Number(state.Embedded_StoreID) ))?
               
                <div className="row mt-sm-4">
                    <div className="col-12">
                        {
                            location.pathname !== '/carts' && <div className={`col-12 addtoCart_headingss`}>
                                <p className="mb-0">{`Your Cart from`}</p>
                                <Link href={`${state.AllProduct[0].Store_Type === "dispensary" ? "/weed-dispensaries" : "/weed-deliveries"}/${modifystr(state.AllProduct[0]?.StoreName)}/${state.AllProduct[0]?.Store_id}`}>        
                                    <h1 className={'addToCartHeadingss'}> {state.AllProduct[0]?.StoreName} </h1>
                                </Link>
                            </div>
                        }
                        <div className="row ">
                            <div className="col-lg-8 col-12 d-block mb-2">
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
cart.getLayout = function getLayout(page){
    return <Layout1>{page}</Layout1>;
}