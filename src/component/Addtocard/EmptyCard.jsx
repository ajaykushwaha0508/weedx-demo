
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style"
import {BsCartXFill} from "react-icons/bs"
import { useRouter } from 'next/router';
import CreateContext from '@/hooks/context';
const EmptyCard = () => {
    const {state} = React.useContext(CreateContext)
    const classes = useStyles()
    const Navigate = useRouter()
    const location = useRouter()
    function ShopNow (){
        if(location.pathname === '/carts'){
            Navigate.push(-1)
        }
        else {
            if(state.Embedded_Store.StoreID ===""){
                Navigate.push("/products")

            }else{
                Navigate.push(`/embedded-menu/${state.Embedded_Store.StoreName}/${state.Embedded_Store.StoreID}`)
            }
        }
    }
    
    return (
        <div className=" Empty_container_margin_top">
            <div className="EmtyCard_container">
                    <div className="image_container">
                        <div className="Empty_card_image">
                            <Box className={classes.muiIcons}>
                            <BsCartXFill size={40}/>
                            </Box>
                        </div>

                    </div>
                    <div className="height_empty_div_heading">
                        <h1>{`Your cart is empty`}</h1>
                    </div>
                    <p className="height_empty_div_paragraph ellipsis">{`Don't wait to bake. Add items to your cart and enjoy`}</p><br/>
                    <p className="height_empty_div_paragraph ellipsis">{` your weed today.`}</p>
                    {   
                        <div className="height_Empty_btnDiv mt-2">
                            <Box className={`  ${classes.loadingBtnTextAndBack}`}>
                                    <LoadingButton onClick={ShopNow} style={{width:"100%",height:"100%"}} variant="outlined" loading={false} type={'submit'}>{`Shop now`}</LoadingButton>
                            </Box>
                        </div>
                    }
            </div>
        </div>
    )
}
export default EmptyCard