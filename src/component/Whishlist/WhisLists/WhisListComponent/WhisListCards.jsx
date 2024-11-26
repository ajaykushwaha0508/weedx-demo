import ProductSearchResult from "@/component/productcard/ProductSearchResult";
import React from "react";
import axios from "axios";
import { WishListget,WishListPost } from "@/component/Whishlist/WishListApi_";
import Createcontext from "@/hooks/context"
import Cookies from 'universal-cookie'; 
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style"
import {AiFillHeart} from "react-icons/ai"
import { useRouter } from "next/router";
import _ from "lodash"
const WhisListCard = () => {
    const classes = useStyles()
    const Navigate = useRouter()
    function ShopNow (){
        Navigate.push("/products")
    }
    const cookies = new Cookies();
    const { state, dispatch } = React.useContext(Createcontext)
    const [GetApiData, SetGetApiData] = React.useState([])
    React.useEffect(() => {
        if(state.login){
            WishListget().then((val) => {
                SetGetApiData(val.data)
            }).catch((error) => {
            
            })
        }
    }, [state.WishList])

   
    return (                                                                                                                            
        <div className="whislistCard_wrapper1">
            {
                GetApiData.length ? <ProductSearchResult RelatedProductResult={GetApiData} title={"Wishlist"} /> : <div className="container-fluid Empty_container_margin_top">
                    <div className="row">
                        <div className="col-12 EmtyCard_container">
                            <div className="row">
                                <div className="col-12 image_container">
                                    <div className="Empty_card_image">
                                    
                                        <Box className={classes.muiIcons}>
                                        <AiFillHeart size={50} color={"#31B665"}/>
                                        </Box>
                                    </div>

                                </div>
                                    <h2 className="height_empty_div_heading">{`You have no favorites.`}</h2>
                                    <p className="height_empty_div_paragraph ellipsis">{`Don't wait to bake. Add items to your favorites  and enjoy`}</p><br/>
                                    <p className=" height_empty_div_paragraph ellipsis"> {`your weed today.`}</p>

                              
                                    <Box className={`  ${classes.loadingBtnTextAndBack}`} >
                                        <LoadingButton onClick={ShopNow} style={{width:"100%",height:"100%"}} variant="outlined" loading={false} type={'submit'}>Shop now</LoadingButton>
                                    </Box>
                              
                            </div>
                        </div>

                    </div>
                </div>
            }
             
        </div>
    )
}
export default WhisListCard