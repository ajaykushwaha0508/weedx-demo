
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "../../../../Style"
import {BsCartXFill} from "react-icons/bs"
import { useLocation, useNavigate } from "react-router-dom";
const EmptyCard = () => {
    const classes = useStyles()
    const Navigate = useNavigate()
    const location = useLocation()
    function ShopNow (){
        if(location.pathname === '/carts'){
            Navigate(-1)
        }
        else {

            Navigate("/products")
        }

    }

    return (
        <>
            <div className="container-fluid Empty_container_margin_top">
                <div className="row">
                    <div className="col-12 EmtyCard_container">
                        <div className="row">
                            <div className="col-12 image_container">
                                <div className="Empty_card_image">
                                    <Box className={classes.muiIcons}>
                                    <BsCartXFill size={40}/>
                                    </Box>
                                </div>

                            </div>
                            <div className="col-12 center height_empty_div_heading">
                                <h1>Your cart is empty</h1>
                            </div>
                            <div className="col-12 center height_empty_div_paragraph ellipsis">
                                <p>Don't wait to bake. Add items to your cart and enjoy</p><br/>

                            </div>
                            <div className="col-12 center height_empty_div_paragraph ellipsis">
                            <p> your weed today.</p>

                            </div>
                           {   <div className="col-12 center height_Empty_btnDiv mt-2">
                                <Box className={`  ${classes.loadingBtnTextAndBack}`}>
                                     <LoadingButton onClick={ShopNow} style={{width:"100%",height:"100%"}} variant="outlined" loading={false} type={'submit'}>Shop now</LoadingButton>
                                </Box></div>
                            }
                        </div>
                    </div>

                </div>

            </div >
        </>
    )
}
export default EmptyCard