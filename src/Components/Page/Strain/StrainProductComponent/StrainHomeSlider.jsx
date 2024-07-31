import { ScrollContainer } from 'react-indiana-drag-scroll';
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from 'react';
import { Link } from 'react-router-dom';
const StrainHomeSlider = ({ StrainProduct }) => {
    return (
        <React.Fragment>
            <div className="col-lg-10 col-12 strainHomeSlider px-0">
                <ScrollContainer className="StrainHomeSlider_scrollContainerRelative">
                    {StrainProduct.map((items, index) => {
                        return (
                            <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-4  strainHomeSlider_container" key={index}>
                                <div className="strainHomeSlider_Inner_cont">
                                    <Link to={`/NewProductDetails/${items.id}`}>  <LazyLoadImage className="strainHomeSlider_image" src={`${items.images[0]?.image}`} alt='imgNotFound' title='imgNotFound'  /></Link >
                                </div>
                            </div>
                        )
                    })}
                </ScrollContainer>
            </div>
        </React.Fragment>
    )
}
export default StrainHomeSlider