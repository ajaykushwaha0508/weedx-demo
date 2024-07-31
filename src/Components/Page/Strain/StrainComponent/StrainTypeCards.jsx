import * as React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from 'react-router-dom';
const StrainTypeCards = ({ ArrayData}) => {
    const ref = React.useRef(null);
   
    return (
        <React.Fragment>
            <div className="straintype_card_wrapper" ref={ref}>
                    {ArrayData?.map((items, index) => {
                        return (
                            <div className="strainType_container" key={index}>
                                <div className="strainTypeInner_container ">
                                    <Link to={`/StrainProduct/${items.head1}`}  state={{ data: items.imgUrl }}>  <LazyLoadImage  alt={items.head1} title={items.head1} className="strainType_image" src={items.imgUrl}  /></Link>
                                </div>
                                <h3 className="ellipsis strainTypeCaption ">{items.head1}</h3>
                            </div>
                        )
                    })}
            </div>
        </React.Fragment>
    )
}
export default StrainTypeCards