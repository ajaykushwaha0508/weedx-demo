import React from "react"
import LawStateContent from "./LawStateDescriptionComponent/LawStateContent"
import IsWeedLegalState from "./LawStateDescriptionComponent/IsWeedLegalState"
import LawStateDecriptionBanner from "./LawStateDescriptionComponent/LawStateDecriptionBanner"
import { useLocation, useParams } from 'react-router-dom';
import Content from "../LawContentsJson"
import _ from "lodash"
import { useRef ,useState} from 'react';
import { LawState } from "../../../../Component/ScoPage/LearnSeo";
import axios from "axios";
const LawStateDescription = () => {
    const params = useParams()
    const location = useLocation()
    const [GetContant, SetContant] = React.useState([])
    const ref = useRef(null);
    const [allHeigths,setallheight] = useState([])
  React.useEffect(()=>{
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
    }); 
  },[])
    React.useEffect(()=>{
      
       
       
    
        if(GetContant?.content !== undefined){
            let data =[]
            ref.current.childNodes.forEach((item , index)=>{
        
                data.push({
                    topheigth: item.offsetTop,
                    id : item.classList.value,
                    height : item.clientHeight
                })   
            })
            setallheight(data)
        }
      },[GetContant])
   
    React.useEffect(() => {
         let divElement = document.getElementById('Navbar_box')?.clientHeight
          
           allHeigths.forEach((item)=>{
           
           if(location.hash === `#${item.id}`){
           
             window.scroll(0 , item.topheigth - divElement)
           }
        })
      }, [location,allHeigths])

   
 

   
    React.useEffect(() => {
        Content.filter((data, index) => {
            return (
                data.state.map((d) => {
                    if (d.id === parseInt(params?.id)) {
                        return SetContant(d)
                    }
                    return d
                })
            )
        })
        axios.post(`https://api.cannabaze.com/UserPanel/Update-SiteMap/13`,
            {
                j:'https://www.weedx.io' + location.pathname
            },
        ).then((res) => {
        }).catch((err) => {
        })
    
    }, [params.id])

    return (
        <React.Fragment>
            <LawState Title={`Cannabis Law in ${GetContant?.name}`} State={GetContant?.Country} location={useLocation().pathname}></LawState>
            <div className="container-fluid">
                <div className="row">
                    <LawStateDecriptionBanner cityname={GetContant?.name} />
                     <div className="law_contertn"> 
                        <div className="col-12 lawStateDescriptionHeadings">
                            <h1 className="LawStateDescriptionHeading">Cannabis Law in {GetContant?.name}</h1>
                            <hr />
                        </div>
                        <div className="col-12 d-flex">
                            <div className={"col-xl-8 col-md-12"}  ref={ref}>
                                {
                                    GetContant?.content?.map((data1, index) => {
                                    
                                        return (
                                            <React.Fragment key={index}>
                                                <IsWeedLegalState head={data1.title} description2={data1.content} />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                            <div className={"col-4 hidiingBLog "}>
                                <LawStateContent head={GetContant?.content}  />
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </React.Fragment >
    )
}
export default LawStateDescription