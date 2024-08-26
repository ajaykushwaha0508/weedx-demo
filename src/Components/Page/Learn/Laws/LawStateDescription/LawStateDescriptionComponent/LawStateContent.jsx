import React, { useEffect } from "react"
import '../../../../../../styles/termconditions.css';
import {Link, useLocation } from "react-router-dom"
const LawStateContent = ({ head }) => {
  let location = useLocation()
    const [Selected, SetSelected] = React.useState(1)
    const divElement = document.getElementById('Navbar_box')?.clientHeight  
    return (
      
            <div className="col-lg-11 col-md-12 LawStateContentsContainer " style={{top : divElement}}>
                <div className="heading_box socialIconsContainer"> <h3 className='text-white m-0 sideTableHeading'>Table of Contents</h3> </div>
                <div className="col-12 LawStateContentOlsCol">
                    <ol className="LawStateContentOls" >{head?.map((items, index) => {
                      
                        return (
                            <React.Fragment key={index}>
                               
                                <Link to={{ hash:`#${items.title.replaceAll(' ','_')}`,}} >
                                     <li className={location.hash === `#${items.title.replaceAll(' ','_')}` ? 'tableListActive py-3 tableList ' : "py-3 tableList  "}  id={items.title.replaceAll(' ','_')} style={{ color: Selected === items.id ? "#31B665" : "" }} >{items.title}</li>
                                </Link>
                            </React.Fragment>
                        )
                    })}

                    </ol>
                </div>
            </div>
    
    )
}
export default LawStateContent