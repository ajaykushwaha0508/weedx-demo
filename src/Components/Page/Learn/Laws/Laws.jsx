import LearnBanner from "../LearnComponent/LearnBanner"
import LawsOptions from "./LawsComponent/LawsOptions"
import { Law } from "../../../Component/ScoPage/LearnSeo"
import { useLocation } from "react-router-dom"
const Laws = () => {
  return (
    <div className="">
      <Law location={useLocation().pathname}></Law>
      <div className="row ">
        <h1 className="canabisLawMainHeadings">{`Cannabis Law in USA, Canada & Internationals`}</h1>
        <LearnBanner  heading="Law"/>
        <LawsOptions />
      </div>
    
    </div>
  )
}
export default Laws