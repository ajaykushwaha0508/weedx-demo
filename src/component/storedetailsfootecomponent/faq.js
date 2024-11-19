import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from "@/styles/style";
import Typography from '@mui/material/Typography';

const Faq = (props) => {
    // console.log(urlcscr)
const classes = useStyles()

    return (
        <div className="row">
        {
          props.faq?.map((item, index) => {
            return <div key={index} className="col-lg-12 my-1"> <Accordion className={classes.faqbox}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
               <Typography >{item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails >
              
                <Typography className={classes.faqParagraph} >
                    {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion></div>
          })
        }

      </div>
    )
}

export default Faq