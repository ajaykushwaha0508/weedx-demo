import TextField from "@material-ui/core/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import useStyles from "@/styles/style"
import React from 'react';
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AiTwotoneQuestionCircle } from "react-icons/ai";

import { RxCross2 } from "react-icons/rx";
import { FaCamera } from "react-icons/fa";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Createcontext from "@/hooks/context";
import { BsExclamationCircleFill } from "react-icons/bs";
import Button from '@mui/material/Button';
import { FaRegIdCard } from "react-icons/fa";
import newclases from '@/styles/customstyle.module.css';
const DeliveryInformation = ({ SetShowDeliveryInformation, image, setImage, setDataImage, Details, SetDetails , DefalutImage , SetDefalutimage }) => {
    const { dispatch } = React.useContext(Createcontext)
    const method = useForm()
    const [ShowRestDeliveryInformation, SetShowRestDeliveryInformation] = React.useState(true)
    const classes = useStyles()
    const HandleDeliveryInformation = (data) => {
      
            SetShowDeliveryInformation(true)
            SetShowRestDeliveryInformation(false)
            dispatch({ type: 'DeliveryInformation', DeliveryInformation: true })
            SetDetails({
                ...Details, ["DateOfBirth"]: data.DateOfBirth
            });
        
    }
    const ShowAgainDeliverInformation = () => {
        SetShowRestDeliveryInformation(true)
    }
   
    function SelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setDataImage(event.target.files[0])
        }
        SetDefalutimage(false)

    }

    function handleChange(event) {

        SetDetails({
            ...Details, [event.target.name]: event.target.value
        });
    }
  
      function maxagelimit(){
         let date = new Date()
         let y = date.getFullYear() -18
         return `${y}-01-01`
      }
    return (
      

            <div className="my-5">
              
              
                    <div className=" d-flex justify-content-between align-items-center">
                        <h1 className={newclases.font_size_paragraph} >{` Customer Information`}</h1>
                        {
                            ShowRestDeliveryInformation ? null :  
                            <Button     variant="outlined" sx={{
                                color: '#31B665',
                                borderColor:'#31B665',
                                fontSize:'12px',
                                textTransform:'capitalize',
                                '&:hover': {
                                    color: "white",
                                    backgroundColor:'#31B665',
                                    borderColor:'#31B665',
                                },
                            }} onClick={ShowAgainDeliverInformation}>{`Edit`}</Button>
                        }
                    </div>
                    {    
                        ShowRestDeliveryInformation &&
                            <div>
                             
                             
                                <form onSubmit={method.handleSubmit(HandleDeliveryInformation)} >
                                    <div className='row my-2'>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                value={Details.FirstName }
                                                label="First name *"
                                                variant="standard"
                                                fullWidth
                                                onChange={((e)=>handleChange(e))}
                                                name='FirstName'
                                                inputRef={method.register({
                                                    required: "First name is required*.",
                                                }
                                                )}
                                                // helperText={method.errors?.FirstName?.message}
                                                error={Boolean(method.errors?.FirstName)}
                                            />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                label="Last name *"
                                                variant="standard"
                                                value={Details.LastName}
                                                onChange={((e)=>handleChange(e))}
                                                fullWidth
                                                name='LastName'
                                                inputRef={method.register({
                                                    required: "Last name is required*.",
                                                }
                                                )}
                                                // helperText={method.errors?.LastName?.message}
                                                error={Boolean(method.errors?.LastName)}
                                            />
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <Box
                                                sx={{
                                                    ".MuiFormControl-marginNormal": {
                                                        marginTop: "8px",
                                                    },
                                                    ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline ": {

                                                    },
                                                    "& .MuiOutlinedInput-notchedOutline.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        borderColor: "#31B665"
                                                    }

                                                }}>
                                                <TextField
                                                    className={classes.deliveryInformationTextFildColor}
                                                    name="DateOfBirth"
                                                    fullWidth
                                                    value={Details.DateOfBirth}
                                                    onChange={handleChange}
                                                    label="Birth date"
                                                    inputProps={{
                                                        max: maxagelimit(),
                                                        min: "1960-01-01"
                                                    }}
                                                    InputLabelProps={{ shrink: true, required: true }}
                                                    type="date"
                                                    inputRef={method.register({
                                                        required: "Birthdate is required*.",
                                                    }
                                                    )}
                                                
                                                    helperText={method.errors?.Birthdate?.message}
                                                    error={Boolean(method.errors?.Birthdate)}
                                                />
                                            
                                            </Box>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                label="Email *"
                                                value={Details.Email}
                                                onChange={((e)=>handleChange(e))}
                                                variant="standard"
                                                fullWidth
                                                name='Email'
                                                inputRef={method.register({
                                                    required: "Email is required*.",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "invalid email address"
                                                    }
                                                }
                                                )}
                                                // helperText={method.errors?.Email?.message}
                                                error={Boolean(method.errors?.Email)}
                                            />
                                        </div>
                                    </div>
                                    <div className='row my-4'>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                type='tel'
                                                onChange={((e)=>handleChange(e))}
                                                value={Details.MobileNo}
                                                label="Mobile phone *"
                                                variant="standard"
                                                fullWidth
                                                name='MobileNo'
                                                inputRef={method.register({
                                                    required: "Email is required*.",
                                                    minLength: {
                                                        value: 10,
                                                        message: "enter valid number"
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: "enter valid number"
                                                    }
                                                }
                                                )}
                                                // helperText={method.errors?.MobileNo?.message}
                                                error={Boolean(method.errors?.MobileNo)}
                                            />


                                        </div>

                                    </div>
                                      <h3 className={`mb-0 ${newclases.height_for_delivery_instruction_div}`}>{`Medical Marijuana`}   
                                        <Tooltip title="If you're purchasing medical cannabis, please enter your Medical Marijuana ID.">
                                                <IconButton>
                                                {/* <BsExclamationCircleFill size={18} color="gray" /> */}
                                                <AiTwotoneQuestionCircle size={12} />

                                                </IconButton>
                                                </Tooltip>
                                                </h3>           
                                      {/* <p className={newclases.height_for_delivery_instruction }>{`Please enter the ID number from your valid Medical Marijuana ID. Include all dashes and special characters.`}</p>
                               */}
                                    <div className='row'>
                                     <div className="col-12">
                                            <TextField
                                                className={classes.deliveryInformationTextFildColor}
                                                onChange={handleChange}
                                                value={Details.MedicalMarijuanaNumber}
                                                label="Medical Marijuana ID (If Applicable)"
                                                variant="standard"
                                                fullWidth
                                                name="MedicalMarijuanaNumber"
                                                // inputRef={method.register({
                                                //     required: "Enter valid Id Number is required*.",
                                                // }
                                                // )}
                                                // helperText={method.errors?.MedicalMarijuanaNumber?.message}
                                                // error={Boolean(method.errors?.MedicalMarijuanaNumber)}  
                                                />
                                                </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-12">
                                            <h3 className={newclases.height_for_delivery_instruction_div}>{`Photo ID  (Optional)`} <Tooltip title="Upload your ID to verify your age. If not uploaded, please bring a valid ID for verification during pickup or upon delivery.">
                                            <IconButton>
                                        
                                            <AiTwotoneQuestionCircle size={12} />
                                            </IconButton>
                                            </Tooltip></h3>
                                           <input accept="image/*" type='file'  id='idcardimage' className="d-none" onChange={SelectImage} />
                                            { image === undefined &&
                                            <label htmlFor="idcardimage" className={newclases.iamgelabelbox}>
                                                <FaRegIdCard /> <span>{`Upload your ID card`}</span>
                                            </label>}
                                            { !(image === undefined) &&
                                    
                                                <div className={newclases.checkoutIdImage}>
                                                    <Image  priority width={100} height={100} style={{border:DefalutImage && "1px solid red" }} className='delivery_option_image' src={image} title={'Delivery info'} alt={'Delivery info'} />
                                                    <label htmlFor="idcardimage" ><FaCamera /> {`change Image`}</label>
                                                    <span><RxCross2 size="22" color="#2d2d2d" onClick={()=>{setImage(undefined)}} />                                            </span>
                                                </div>
                                            }
                                            </div>
                                  </div>
                                    <div className='row my-4'>
                                        <div className='col-12 col-lg-4 '>
                                            <Box  className={`  ${classes.loadingBtnTextAndBack}`} >
                                                <LoadingButton type='submit' variant="outlined">{`Save`}</LoadingButton>
                                            </Box>
                                        </div>

                                    </div>

                                </form>
                            </div>
                    }
            </div>
    )
}
export  {DeliveryInformation}