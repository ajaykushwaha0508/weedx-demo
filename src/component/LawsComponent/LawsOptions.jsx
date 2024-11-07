import React from "react"
import Image from "next/image"
import Link from "next/link"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { modifystr } from "@/hooks/utilis/commonfunction";
import weedleaf from '../../../public/image/weedleaf.webp'
import useStyles from "@/styles/style";

const LawsOptions = (props) => {
    const clasess = useStyles()
    return (
        <div className="lawsContainer">
            
                {props.data?.map((items ,index) => {
                    return (
                        <Accordion key={index} className={clasess.LawAccordions}>
                            <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                <span className="listCountryName">{items.name}</span>
                            </AccordionSummary>
                            <AccordionDetails>
                                {(
                                
                                        <ol className="law_Inner_OPtionList_Ol">
                                            {items?.state?.map((val, index) => {
                                                return (
                                                    <Link href={{  pathname: `/learn/laws-and-regulation/${'cannabis-law-in-'+modifystr(val.name)}/${val.id }`,
                                                        }}   key={index} >
                                                        <li> <Image src={weedleaf.src} className="lawOPtionListImage"   width={100}  unoptimized={true}  height={100} onError={(e) => (e.target.src = '/image/blankImage.jpg')}   alt={val.name}   title={val.name} />
                                                            <span className="lawOptionCountry_state_List">{val.name}</span>
                                                        </li>
                                                    </Link>
                                                )
                                            })}
                                        </ol>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
        </div>
    )
}
export default LawsOptions