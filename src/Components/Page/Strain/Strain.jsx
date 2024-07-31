import React from "react"
import StrainType from "./StrainComponent/StrainType"
import PopularStrain from "./StrainComponent/PopularStrain"
import {StrainSeo} from "../../Component/ScoPage/LearnSeo"
import { useLocation } from "react-router-dom"
import Createcontext from "../../../Hooks/Context"
const Strain = () => {
  const { state } = React.useContext(Createcontext)
  const PopularStrainArray = [{ imgUrl: "/image/glass.png", name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Galeto", secName: "Indica" },
  { imgUrl: state?.StaticImage.Sativa, name: "0G Runtz", secName: "Sativa" },
  { imgUrl: state?.StaticImage.Hybrid, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.CBD, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Kush", secName: "Hybrid" },
  { imgUrl: state?.StaticImage.Indica, name: "0G Kush", secName: "Hybrid" }

  ]

  const popularStrainHeading = "Popular strain"
  return (
    
      <div className="container-fluid">
        <StrainSeo location={useLocation().pathname}></StrainSeo>
        <PopularStrain SliderDataArray={PopularStrainArray} Heading={popularStrainHeading} />
        <StrainType/>
        {/* <div className="row">
          <div className="col-12">
            <h2 className="strainPopular_heading">Popular strains products</h2>
          </div>

        </div> */}
      </div>
     
  )
}
export default Strain