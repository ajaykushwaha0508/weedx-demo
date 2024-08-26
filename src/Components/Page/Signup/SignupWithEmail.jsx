import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "../../../Style"
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CiLock } from "react-icons/ci"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { RxCross2 } from "react-icons/rx";
const SignupWithEmail = () => {
    const Navigate = useNavigate()
    const location = useLocation();
    let state  = location.state;
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, Setloading] = React.useState(false)
    const [EmailDisabled, SetEmailDisabled] = React.useState(true)
    const [dulicate, Setduplicate] = React.useState([])
    const [Email, SetEmail] = React.useState(state?.State?.email)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const method = useForm()
    const classes = useStyles()
    function Submit(data) {
        Setloading(true)
        axios.post("https://apiv2.cannabaze.com/UserPanel/RegisterAPI/", {

            username: data.Name,
            email: Email,
            password: data.password,
            user_type: "Customer"
        },
        ).then(response => {
            if(location.pathname==='/menu-integration/signupwithemail'){
                Navigate("/menu-integration/login")
            }else{
                Navigate("/login", { state: { lastlocation:'signin' } })
            }
            Setloading(false)
        }).catch(
            function (error) {
                Setloading(false)
                if (error.response.data.username) {

                    Setduplicate(error.response.data)
                }
                if (error.response.data.email) {
                    SetEmailDisabled(false)
                    Setduplicate(error.response.data)
                }
            }
        )
    }
    return (
       
                    <div className="login_signup_reset_container">
                        <div className='row'>
                            <div className='col-12 signup_head'>
                                <h1>Signup With Email</h1>

                            </div>
                        </div>
                        <div className='row'>
                            <label>Email</label>

                            <div className='col-lg-12 signup_margins_top_textfield '>
                                <TextField
                                    value={Email}
                                    disabled={EmailDisabled}
                                    onChange={(e) => {
                                        SetEmail(e.target.value)
                                    }}
                                    // onClick={(e)=>{Setduplicate('')}}
                                    name='email'
                                    placeholder="Enter Your Email"
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    inputRef={method.register({
                                        required: "email  is required*.",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    },
                                    )}
                                    helperText={method.errors?.email?.message || dulicate?.email}
                                    error={Boolean(method.errors?.email) || (Boolean(dulicate?.email))}
                                />
                            </div>
                        </div>
                        <form onSubmit={method.handleSubmit(Submit)}>
                           
                            <div className='row signup_margins_top'>
                                <label>Enter your username</label>

                                <div className='col-lg-12 signup_margins_top_textfield '>
                                    <TextField
                                        placeholder='Enter your Username'
                                        variant="outlined"
                                        fullWidth
                                        type="text"
                                        name='Name'
                                        size='small'
                                        className={`${classes.textFieldFocusBorderColor}`}
                                        inputRef={method.register({
                                            required: "Name  is required*.",
                                            minLength: {
                                                value: 8,
                                                message: 'Name must be more than 8 characters'
                                            }
                                        },
                                        )}
                                        helperText={method.errors?.Name?.message || dulicate?.username}
                                        error={Boolean(method.errors?.Name) || Boolean(dulicate?.username)}
                                    />
                                </div>
                            </div>
                            <div className='row signup_margins_top'>
                                <label>Password using minimum 8 character</label>

                                <div className='col-lg-12 signup_margins_top_textfield '>
                                    <TextField
                                        autoComplete="on"
                                        className={`${classes.textFieldFocusBorderColor}`}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter Your Password"
                                        variant="outlined"
                                        fullWidth
                                        name='password'
                                        size='small'
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
                                        helperText={method.errors?.password?.message}
                                        error={Boolean(method.errors?.password)}
                                    />
                                </div>
                            </div>
                            <div className='row  signup_margins_top'>
                                <div className='col-lg-12 '>
                                    <Box
                                        className={`  ${classes.loadingBtnTextAndBack}`}
                                    >
                                        <LoadingButton variant="outlined" loading={loading} type='submit'>Signup</LoadingButton>
                                    </Box>
                                </div>

                            </div>

                        </form>

                      
                        <div className='crosslogin'>
                              <Tooltip title="Back">
                                 <IconButton>
                                    <RxCross2 color={'#000'} size={22}  onClick={()=>{Navigate(-1)}}/>
                                 </IconButton>
                               </Tooltip>
                            </div>

                    </div>
       
    )
}
export default SignupWithEmail