import { LazyLoadImage } from "react-lazy-load-image-component";
import React from "react"
const Media = () => {
    const PromoCardArray = [
        { imgUrl: "/image/LeaflyMarchPromo.png" },
        { imgUrl: "/image/LeaflyMarchPromo.png" },
        { imgUrl: "/image/social.png" },
        { imgUrl: "/image/LeaflyPromo.png" },
        { imgUrl: "/image/LeaflyPromo.png" },
        { imgUrl: "/image/LeaflyPromo.png" },
    ]
    return (
            <div className="row mx-0">
                <h2 className="mediaHeadingss mt-3">Media</h2>
                {PromoCardArray.map((items, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="col-lg-4  col-sm-6 col-12 media_outer_container">
                                <div className="row media_row mx-1 mt-2">
                                    <div className="col-12 media_image_container px-0">
                                        <LazyLoadImage className="media_image"
                                         src={items.imgUrl} 
                                         alt={'image'}
                                         title={'image'}
                                         />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })}


            </div>

    )
}
export default Media