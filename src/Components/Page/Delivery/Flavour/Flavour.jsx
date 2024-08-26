
import LoadingButton from '@mui/lab/LoadingButton';
import { AiFillStar } from "react-icons/ai";
import useStyles from "../../../../Style"
import Box from '@mui/material/Box';
import React from 'react';
const Flavour = (Deta) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <div className="container-fluid" >
                <div className='row'>
                    <div className=' flavour_New_container'>

                        <div className='col-lg-1  col-md-2 col-sm-2 flav_img_height_div_container'>
                            <img className='flav_img_height' src={"image/cat_pro_img1.png"} alt="img_not_found" title="img_not_found" style={{ pointerEvents: "none" }} />

                        </div>
                        <div className='col-lg-10 col-md-8 col-sm-8 flav_content_right_side fontStyle'>
                            <p>{Deta.delBtn[0]?.Store_Name}</p>

                        </div>
                        <div className='col-lg-12 mx-2 flav_new_cont_rat_star'>
                            <span>Rating</span>
                            <span> <AiFillStar className={classes.disPen_Icons} id='flav_star' /></span>
                        </div>
                        <div className='col-lg-12 mx-2'>
                            <p>{Deta.delBtn[0]?.city_name}</p>
                        </div>

                        <div className='row flav_new_btn_div'>
                            <div className='col-lg-12 col-md-8 col-sm-8 col-12 d-flex'>
                                <Box
                                    className={`flav_new_btn ${classes.loadingBtnTextAndBack}`}
                                >
                                    <LoadingButton variant="outlined">Mobile no</LoadingButton>

                                </Box>
                                <Box
                                    className={`flav_new_btn ${classes.loadingBtnTextAndBack}`}
                                >
                                    <LoadingButton variant="outlined">email Id</LoadingButton>
                                </Box>

                            </div>



                        </div>


                    </div>

                </div>



            </div>
        </React.Fragment>
    )
}
export default Flavour