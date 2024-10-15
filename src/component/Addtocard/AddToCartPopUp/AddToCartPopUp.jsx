import React from 'react';
import Modal from '@mui/material/Modal';
import useStyles from '@/styles/style';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Createcontext from "../../../hooks/context"
import { GiShoppingCart } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Cookies from 'universal-cookie';
import axios from "axios";
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { Dialog } from '@mui/material';
const AddToCartPopUp = ({ CartClean, SetCartClean, NewData, SetAddToCard }) => {
    console.log(CartClean)
    const classes = useStyles()
    const Navigate = useRouter()
    const cookies = new Cookies();

    let token_data = cookies.get('User_Token_access')
    let accessToken 
    if (typeof window !== 'undefined') {

        accessToken = localStorage.getItem('User_Token_access');

    }

    if(  Boolean(accessToken) ){ token_data  =  accessToken}
    const { state ,dispatch } = React.useContext(Createcontext)
    const [Loading, SetLoading] = React.useState(false)
    function CleanData() {
        if (state.login) {
            SetLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${token_data}` }
            };
            axios.post("https://api.cannabaze.com/UserPanel/ClearAddtoCart/",
            NewData,
            config,
            ).then(response => {
                dispatch({ type: 'ApiProduct' })
                SetLoading(false)
                SetCartClean(false)
            }).catch(
                function (error) {
                    SetLoading(false)
                })
        }
        else {
            
            SetLoading(true)
            setTimeout(function () {
                localStorage.clear();
                dispatch({ type: 'ApiProduct' , ApiProduct:!state.ApiProduct })
                SetAddToCard([NewData])
                SetLoading(false)
                SetCartClean(false)
            }, 2000)

        }

    }
    function Redirect (){
    SetCartClean(false)
    Navigate.push("/cart")
    
    }

    const handleClose = () => {
        console.log("#31B665")
        SetCartClean(false)
    };
    return (
    <React.Fragment>    
        <Dialog 
        open={CartClean} 
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >
            <Box>
            <div className='differentstorepopup'>
                {/* <ClickAwayListener onClickAway={()=>{SetCartClean(false)}}> */}
                    <div className='popupbox'>
                        <div className='col-12 AddToCartImageContainer'>
                            <div className='addToCartPopUpImage_background mx-auto'>
                            <GiShoppingCart size={72} color='#31B655' />
                            </div>


                        </div>
                        <div className='col-12 AddToCartHeading'>
                            <p>Start a new Cart</p>

                        </div>
                        <div className='col-12 AddToCartParagraphHeight'>
                            <p>You have currently have a items in  you cart from other menu.You may  only add items from one menu. <br/>
                                Would you like to finish your previous order,or start a new cart
                            </p>
                        </div>
                        <div className='col-12'>
                            <Box
                                className={`  ${classes.differstoreaddtocartbtn}`}
                            >
                                <LoadingButton 
                                  loadingIndicator={
                                    <CircularProgress size={16} sx={{ color: 'white' }} />  // Change 'red' to any color you want
                                  }
                                className={Loading && 'loading' } variant="outlined" loading={Loading} onClick={CleanData} type={'submit'}>Start a new cart</LoadingButton>
                            </Box>
                        </div>
                        <div className='col-12 my-2'>
                            <Box
                                className={`  ${classes.differstoreaddtocartbtn}`}
                            >
                                <LoadingButton variant="outlined" loading={false} onClick={Redirect} type={'submit'}>Complete  previous order</LoadingButton>
                            </Box>
                        </div>
                        <span className='popupctrossbtn' onClick={()=>{SetCartClean(false)}}><RxCross2 size={22} color='red' /></span>
                    </div>
                {/* </ClickAwayListener> */}
            </div>
            </Box>
        </Dialog>
        </React.Fragment>
    )
}
export default AddToCartPopUp