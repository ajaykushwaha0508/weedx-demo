import { AiFillHeart } from "react-icons/ai"
import { LazyLoadImage } from "react-lazy-load-image-component"
import StrainHome from "./StrainProductComponent/StrainHome"
import React from "react"
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
const StrainProduct = () => {
    const location = useLocation();
    const { type } = useParams();
    const [StrainProduct, SetStrainProduct] = React.useState([])

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        axios.post("https://apiv2.cannabaze.com/UserPanel/Get-StrainType/",
            {
                type: type
            }
        ).then(response => {
            SetStrainProduct(response.data)

        }).catch(
            function (error) {
                // SetLoading(false)
            })

    }, [type])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-10 col-12 strainProduct_container mt-4">
                    <div className="strainProduct_inner_container">
                        <div className="w-100 text-end strainProduct_heart_div">
                            <AiFillHeart color="#31B665" size={22} />
                        </div>
                        <div className="col-lg-10 col-12  strainProduct_img_content_section">
                            <section className="strainProduct_img_section">
                                <LazyLoadImage src={'/image/social.png'}
                                 className="strainProduct_images" 
                                 alt={type}
                                 title={type}
                                 />
                            </section>
                            <section className="strainProduct_content_section">
                                <div className="w-100 strainProduct_content_head_div">
                                    <h1 className="strainProduct_content_head">{type}</h1>
                                </div>
                            </section>
                        </div>
                    </div>

                </div>

            </div>
            <StrainHome StrainProduct={StrainProduct} />

        </div>
    )
}
export default StrainProduct