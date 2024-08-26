import { LazyLoadImage } from "react-lazy-load-image-component";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import * as React from 'react';

const BestDealCards = ({CardDataArray,Heading}) => {
    const ref = React.useRef(null);
    return (
        <React.Fragment>
       
                <div className="col-12  mt-2 px-0">
                    <h3 className="ellipsis bestDealsCard_Heading_offers">{Heading}</h3>
                </div>

     
            <div className="col-lg-12 col-12   recentViewProductSlider" id="width" ref={ref}>
            <ScrollContainer className=" bestDealsCard_ScrollContainerRelative">
                {
                    CardDataArray.map((items, index) => {
                        return (
                            <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-4  bestDealCards" key={index}>
                                <div className="row bestDealsCardContainer mx-1 my-2">
                                    <div className="col-12 BestDeals_image_container px-0">
                                        <LazyLoadImage className="bestDeals_imageHeight" src={items.imgUrl} alt={items.head1} title={items.head1} />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-12  ">
                                        <h4 className="bestDealsHead_container ellipsis mx-2">{items.head1}</h4>
                                    </div>
                                    <div className="col-12 bestDeal_subHeading ">
                                        <p className="ellipsis mx-2">{items.sub_head}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </ScrollContainer>

            </div>
        </React.Fragment>
    )
}
export default BestDealCards