
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingButton from "@mui/lab/LoadingButton"
import useStyles from "../../../Style";
import Box from '@mui/material/Box';

const FiveZeroThree = () => {
    const classes = useStyles()
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 fiveZeroThree_container">
                    <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-12">
                        <section className="FiveZero_Image_section ">
                            <LazyLoadImage src="https://selnoxmedia.s3.amazonaws.com/media/BlankImage/FiveZeroThree.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAS4WSA6KJNP6NPPES%2F20231017%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231017T091414Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=385f7276b9d5a8305a5bab834d5a4a82fd9f071e4436f2d2532435156ec816cb"
                             className="fiveZero_image" 
                             alt="503"
                             title="503"
                             />
                        </section>
                        <section className="fiveZero_content_section mt-2">
                            
                            <div className="fiveZeroThree_div_width">
                                <h2 className="fiveZero_sub_heading">Sorry we're under maintenance!</h2>
                            </div>
                            <div className="fourZeroThree_div_width_sec">
                                <h2 className="five_zero_three_message">Hang on till we get the error fixed.
                                </h2>

                            </div>
                            <div className="fourZeroThree_div_width_sec">
                                <h1 className="five_zero_three_message">
                                    You may also refresh the page or try again later
                                </h1>
                            </div>

                        </section>
                        <Box className={`center mt-4 ${classes.fiveZero_Three}`}>
                            <LoadingButton>Go To Home Page</LoadingButton>
                        </Box>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default FiveZeroThree