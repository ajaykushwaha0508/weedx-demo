import React from "react";
import BestDealCards from "./DealsComponent/BestDealCards"
import PromoCode from "./DealsComponent/PromoCode"
import NewProductSearchResult from "../Product/NewProductDetails/NewProductDetailsComponent/NewProductSearchResult"


const RelatedDeals=()=>{
    const NewProductSearchRseultArray = [{ imgUrl: "./image/social.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" },
    { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }, { imgUrl: "./image/sativa.png" }
    ]
    const heading="Best deals near by you"
    const BestDealsCardArray = [
        { imgUrl: "./image/Leafly March Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/social.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly March Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },

        { imgUrl: "/image/Leafly March Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },

    ]
    const bestDealsHeading="Offers"
    const PromoCardArray = [
        { imgUrl: "./image/Leafly March Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/social.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly March Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
        { imgUrl: "./image/Leafly Promo.png", head1: "25% off all products", sub_head: "claims deals & percent" },
    ]
    const promoCodeHeading="Promo code use"


   
    return(
        <div className="container-fluid">
            <NewProductSearchResult NewProductSearchRseultArray={NewProductSearchRseultArray} heading={heading}/>
            <BestDealCards CardDataArray={BestDealsCardArray} Heading={bestDealsHeading}/>
            <PromoCode CardDataArray={PromoCardArray} Heading={promoCodeHeading}/>
        </div>
    )
}
export default RelatedDeals