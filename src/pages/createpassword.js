import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style"
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { RxCross2 } from "react-icons/rx";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { CiLock } from "react-icons/ci"
import axios from 'axios';

function ConfirmPassword(Email,password) {
    let data = axios.post(`https://api.cannabaze.com/UserPanel/VerifyOtpForgetPassword/ `,
        {
            email:Email,
            password :password
        }
    );
    return data;
}
const CreatePassword = () => {
    const router = useRouter();
    const { Email } = router.query;
    // console.log(router , 'email')
    const classes = useStyles()
    const method = useForm()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, SetShowConfirmPassword] = React.useState(false)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickConfirmShowPassword = () => SetShowConfirmPassword((show) => !show);
    const NewPassword = React.useRef({});
    NewPassword.current = method.watch("NewPassword", "");
    const onSubmit = async data => {
        alert(JSON.stringify(data));
    };
    const Submit = (password) => {
        ConfirmPassword(Email,password.ConfirmPassword  ).then((res)=>{
            if(res.status === 202){
                router.push('/login')
            }
        }).catch((error)=>{
            console.error(error)
        })
    }
    return (
        <div className="login_signup_reset_container">
            <form onSubmit={method.handleSubmit(Submit)}>
           
                    <div className='signup_head'>
                        <h1>{` Create a New Password`}</h1>
                    </div>
    
             
                <div className='row'>
                    <label htmlFor='NewPassword'>{`New Password`}</label>

                    <div className='col-lg-12 mt-1 '>
                        <TextField
                            className={`${classes.textFieldFocusBorderColor}`}
                            type={showPassword ? 'text' : 'password'}
                            id="NewPassword"
                            name='NewPassword'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CiLock />
                                    </InputAdornment>
                                ),
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            inputRef={method.register({
                                required: "password  is required*.",
                                minLength: {
                                    value: 8,
                                    message: 'Password must be more than 8 characters'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
                                    message: "At least one uppercase,lowercase,number,one special character"
                                }
                            },
                            )}
                            helperText={method.errors?.NewPassword?.message}
                            error={Boolean(method.errors?.NewPassword)}
                            placeholder="Enter Your New Password"
                            variant="outlined"
                            fullWidth
                            size='small'
                        />

                    </div>
                </div>
                <div className='row mt-4'>
                    <label htmlFor='ConfirmPassword'>Confirm Password</label>

                    <div className='col-lg-12 mt-1 '>
                        <TextField
                            defaultValue={''}
                            className={`${classes.textFieldFocusBorderColor}`}
                            type={showConfirmPassword ? "text" : "password"}
                            id="ConfirmPassword"
                            name='ConfirmPassword'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CiLock />
                                    </InputAdornment>
                                ),
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickConfirmShowPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            inputRef={method.register({
                                validate: value => value === NewPassword.current || "The passwords do not match"

                            },

                            )}

                            helperText={method.errors?.ConfirmPassword?.message}
                            error={Boolean(method.errors?.ConfirmPassword)}
                            placeholder="Enter Confirm Password"
                            variant="outlined"
                            fullWidth
                            size='small'
                        />

                    </div>
                
                </div>



                <div className='row mt-3'>
                    <div className=' col-lg-12 '>
                        <Box
                            className={` ${classes.loadingBtnTextAndBack}`}
                        >
                            <LoadingButton variant="outlined" type={"submit"}>Save</LoadingButton>
                        </Box>
                    </div>

                </div>
                <div className='row mt-3'>
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
                    <IconButton>  <RxCross2 color={'#000'} size={22}  onClick={()=>{navigate(-1)}}/> </IconButton>
                </Tooltip>
            </div>


        </div>
    )
}
export default CreatePassword