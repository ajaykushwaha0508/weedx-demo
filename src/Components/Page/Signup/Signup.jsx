import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "../../../Style"
import TextField from '@mui/material/TextField';
import { Link, useNavigate , useLocation} from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import Createcontext from "../../../Hooks/Context"
import LoginWithGoogle from '../Login/LoginWithGoogle'
import React,{useState} from 'react';
import Axios from 'axios'
import { SignupSeo } from '../../Component/ScoPage/CommenpageSeo';
const Signup = () => {
    const { state } = React.useContext(Createcontext)
    const [emailvalid,setemailvalid]=useState(false)
    const navigate = useNavigate()
    const location =useLocation()
    const method = useForm()
    const classes = useStyles()
    function Submit(State) {
      
      Axios.post('https://apiv2.cannabaze.com/UserPanel/UserAlreadyExist/',{
        email:State.email
      }).then((res)=>{
        if(res.data.email !== "Email is already Registered"){
            // navigate("/signupwithemail", { state: { State } })
            if(location.pathname==='/menu-integration/signup'){
                navigate("/menu-integration/signupwithemail", { state: { State } })

            }else{
                navigate("/signupwithemail", { state: { State } })

            }
        }else{
            setemailvalid(true)
        }
      }).catch((error)=>{

      })
     
      
    }
    React.useEffect(()=>{
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    },[])

    return (
        <React.Fragment>
                    <SignupSeo></SignupSeo>
                    <div className="login_signup_reset_container ">
                        <div className='row'>
                            <div className='col-12 signup_head'>
                                <h1>Sign Up</h1>

                            </div>
                        </div>
                        <form onSubmit={method.handleSubmit(Submit)}>
                            <div className='row'>
                                {/* <label htmlFor='Email'>Email</label> */}

                                <div className='col-lg-12  mt-2'>
                                    <TextField
                                        id="Email"
                                        className={`${classes.textFieldFocusBorderColor}`}
                                        placeholder="Enter Your Email"
                                        name='email'
                                        variant="outlined"
                                        onChange={()=>{setemailvalid(false)}}
                                        fullWidth
                                        size='small'
                                        inputRef={method.register({
                                            required: "email is required*.",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "invalid email address"
                                            }
                                        }
                                        )}
                                        helperText={method.errors?.email?.message}
                                        error={Boolean(method.errors?.email)}

                                    />
                                    {emailvalid && <p className='errorPara'>Email is already Registered</p>}
                                </div>
                            </div>
                            <div className='row  signup_margins_top'>
                                <div className='col-lg-12 '>
                                    <Box
                                        className={`  ${classes.loadingBtnTextAndBack}`}
                                    >
                                        <LoadingButton variant="outlined" loading={false} type={'submit'}>Signup</LoadingButton>
                                    </Box>
                                </div>

                            </div>
                        </form>
                  
                        <div className='w-100 d-flex mt-4 center'>
                            <div className='signupHorizontalLine'></div> <span className='px-2 login_OR'>OR</span> <div className='signupHorizontalLine'></div>
                        </div>
                        <div className='signup_margins_top'>
                            <div className='col-lg-12 '>
                               <LoginWithGoogle/>
                            </div>

                        </div>

                        <div className='w-100 text-center my-2 '>
                            <h2 className='login_bottom'>New To weedx ?</h2> 
                           <span onClick={()=>{  navigate("/login", { state: { lastlocation:'signin' } })}}>Already a member? Login</span>
                        </div>
                        <div className='crosslogin'>
                              <Tooltip title="Back">
                                 <IconButton>
                                    <RxCross2 color={'#000'} size={22}  onClick={()=>{navigate(-1)}}/>
                                 </IconButton>
                               </Tooltip>
                            </div>
                    </div>
        </React.Fragment>
    )
}
export default Signup