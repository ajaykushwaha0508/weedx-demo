
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingButton from "@mui/lab/LoadingButton";
import useStyles from "../../../Style";
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import { Context } from "../../../Hooks/Context";
import React from "react";
const FourZeroThree=()=>{
    const classes=useStyles()
    
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 FourZeroThree_container">
                    <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">
                    <section className="FourZeroThree_Image_section ">
                            <LazyLoadImage src="https://selnoxmedia.s3.amazonaws.com/media/BlankImage/FourZeroThree.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS4WSA6KJNP6NPPES%2F20231017%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231017T091443Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f4081279d43cd879d0c757fd7731ca8f01430cfe063a7ec226a7a267e7e81b5"
                             className="fourZeroThree_image"
                             alt="503"
                             title="503"
                              />
                        </section>
                        <section className="fourZeroThree_content_section mt-2">
                            
                            <div className="fourZeroThree_div_width_sec">
                                <h1 className="fourZero_Three_sub_heading">403 ERROR FORBIDDEN</h1>
                            </div>
                            <div className="fourZeroThree_div_width_sec">
                                <h2 className="four_zero_three_message">You dont have permission to access this resource.
                                </h2>

                            </div>
                            

                        </section>
                        <Box className={`center mt-4 ${classes.fourZero_Three}`}>
                        <Link to={'/'} >     <LoadingButton >Go To Home Page</LoadingButton></Link>
                        </Box>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default FourZeroThree