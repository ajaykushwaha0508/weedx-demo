import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "../../../Style"
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { RxCross2 } from "react-icons/rx";
import React from 'react';
import { useForm } from "react-hook-form";
import { Forget_password } from "./ForgetApi"
import ForgetOtp from './ForgetOtp';
import { Forgot } from '../../Component/ScoPage/CommenpageSeo';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
    const [Otppopup, Setotppopup] = React.useState(false)
    const [Email, SetEmail] = React.useState()
    const classes = useStyles()
    const method = useForm()
    const navigate = useNavigate();
    const Submit = (data) => {
        Forget_password(data).then((res) => { 
            SetEmail(res?.data.data.Otp_Sent_To)
            Setotppopup(true)
        }).catch((error) => { alert("Somthing Wrong") })
    }
    React.useEffect(() => {
        window.scroll(0, 0)
    })
    return (
        <React.Fragment>
            <Forgot></Forgot>
            <div className="login_signup_reset_container">
                <form onSubmit={method.handleSubmit(Submit)}>
                    <div className='row'>
                        <div className='col-12 fontStyle signup_head'>
                            <h1>Forgot Password</h1>

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 fontStyle resetPassword_paragraph'>
                            <p>Enter your email address and we’ll send you instructions to reset your password.</p>

                        </div>
                    </div>
                    <div className='row'>
                        {/* <label htmlFor='EmailUser'>Email</label> */}
                        <div className='col-lg-12 signup_margins_top_textfield '>
                            <TextField
                                id="EmailUser"
                                name="email"
                                inputRef={method.register({
                                    required: "Email is required*",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "invalid email address"
                                    }
                                })}
                                helperText={method.errors?.email?.message}
                                error={Boolean(method.errors?.email)}
                                className={`${classes.textFieldFocusBorderColor}`}

                                placeholder="Enter Your Email" variant="outlined" fullWidth size='small' />
                        </div>

                    </div>
                    <div className='row  signup_margins_top'>
                        <div className=' col-lg-12 '>
                            <Box
                                className={` ${classes.loadingBtnTextAndBack}`}
                            >
                                <LoadingButton variant="outlined" type={"submit"}>Send email</LoadingButton>
                            </Box>
                        </div>

                    </div>
                    <div className='row  signup_margins_top'>
                        <div className='col-lg-12 '>
                            <Box
                                className={`  ${classes.Reset_password_canel_loading_btn}`}
                            >
                                <LoadingButton variant="outlined">Cancel</LoadingButton>
                            </Box>
                        </div>

                    </div>
                </form>
                <div className='crosslogin'>
                    <Tooltip title="Back">
                        <IconButton>
                            <RxCross2 color={'#000'} size={22}  onClick={()=>{navigate(-1)}}/>
                        </IconButton>
                    </Tooltip>
                </div>


            </div>

            {Otppopup && <ForgetOtp Otppopup={Otppopup} Setotppopup={Setotppopup} Email={Email} setLoading={false}></ForgetOtp>}

        </React.Fragment>

    )
}
export default ForgotPassword