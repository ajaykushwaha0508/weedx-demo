import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link,useLocation } from "react-router-dom";

const AllProductCategory = ({ flowerArray }) => {
    const location = useLocation();    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12  px-4  fontStyle">
                        <h2 className="section_main_title">{location.pathname.slice(17).replace(/%20/g, " ")}</h2>
                    </div>

                        {flowerArray.map((items, index) => {
                            return (

                                <div className="col-xxl-2 col-xl-3  col-md-4 col-sm-6 col-4 allProductCategoryContainer_height" key={index}>
                                    <div className="row ">
                                        <div className="col-12  center">
                                            <div className="allProductCategory_image_container">
                                                <Link to={`/Product/${items.name}`} state={items.id}>

                                                    <LazyLoadImage
                                                        onError={event => {
                                                            event.target.src = "/image/blankImage.jpg"
                                                            event.onerror = null
                                                        }}
                                                        className="allProduct_imageHeight" src={`${items?.SubCategoryImage}`} alt={items.name} title={items.name} />
                                                </Link>

                                            </div>
                                        </div>
                                        <div className="col-12 center">
                                            <p className="ellipsis allProductCategoryParagraph">{items.name}</p>
                                        </div>

                                    </div>

                                 
                                </div>


                            )
                        })}
     

                </div>
            </div>
        </>
    )
}
export default AllProductCategory