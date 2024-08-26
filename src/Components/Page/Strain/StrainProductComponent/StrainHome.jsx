import React from "react"
import StrainHomeSlider from "./StrainHomeSlider"
const StrainHome = ({StrainProduct}) => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-lg-10 col-12 px-0 mt-4">
                    <h1 className="StrainHomeDes_heading">Strain Home</h1>
                </div>
                   <StrainHomeSlider StrainProduct={StrainProduct}/>
                <div className="descriptionContainer col-lg-10 col-12 px-0">
                   <div className="descriptionContainer">
                   <span className="StrainHomeDes_heading">Description</span>
                    <p className="StrainHome_decription_paragraph mt-2">OG Kush is a world-famous strain first propagated by Matt Berger in Florida. The strain was later popularized after Josh Del Rosso, aka JoshD, was able to
                        perfect the growing conditions and introduce the variety into the Los Angeles market. JoshD Farms reports OG Kush users can expect long-lasting, heavy,
                        yet versatile euphoria and skunky-citrus flavor and aroma. The company is now focused exclusively on developing OG Kush-derived strains and products.
                    </p>

                   </div>

                </div>

            </div>

        </React.Fragment>
    )
}
export default StrainHome