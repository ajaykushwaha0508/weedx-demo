import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = (props) => {
    // console.log(urlcscr)


    return (
        <div className="row">
        {
          props.faq?.map((item, index) => {
            return <div key={index} className="col-lg-12 my-1"> <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h3
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "14px"
                  }}
                >{item.title}</h3>
              </AccordionSummary>
              <AccordionDetails >
                <span style={{ margin: "0" }}>{item.answer}</span>
              </AccordionDetails>
            </Accordion></div>
          })
        }

      </div>
    )
}

export default Faq