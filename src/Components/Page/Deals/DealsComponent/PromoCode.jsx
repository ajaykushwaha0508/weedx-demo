import { LazyLoadImage } from "react-lazy-load-image-component";
import { ScrollContainer } from 'react-indiana-drag-scroll';
import * as React from 'react';
const PromoCode = ({CardDataArray,Heading}) => {
    const ref = React.useRef(null);


    return (
        <React.Fragment>
      
          <div className="col-12  px-0">
            <h3 className="promocode_headings">{Heading}</h3>

          </div>
       
        <div className="col-lg-12 col-12   recentViewProductSlider" id="width" ref={ref}>
        <ScrollContainer className="ScrollContainerRelative">


            {CardDataArray.map((items, index) => {
                return (
                    <div className="col-xl-3 col-lg-4  col-sm-6 col-12 mb-4  promoCode_card_Outer_container" key={index}>
                        <div className="row promoCode_card_inner_container mx-1 my-2">
                            <div className="col-12 promocode_image_container px-0">
                              <LazyLoadImage className="promocode_image" src={items.imgUrl} alt="image" title="image"/>
                            </div>
                        </div>
                    </div>
                )
            })}
            </ScrollContainer>
        </div>
        </React.Fragment>
    )
}
export default PromoCode