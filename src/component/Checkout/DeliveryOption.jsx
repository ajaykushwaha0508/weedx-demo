
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useStyles from "@/styles/style"
import Createcontext from "@/hooks/context"
import { FiEdit } from "react-icons/fi";
import Link from 'next/link';
import newclases from '@/styles/customstyle.module.scss';
const DeliveryOption = ({ SetShowData, DeliveryOptionData, address  , Hours  ,Time, SetTime}) => {

    const { state, dispatch } = React.useContext(Createcontext)
    const method = useForm()
    const classes = useStyles()
    const [ShowDeliveryRestData, SetShowDeliveryRestData] = React.useState(true)


    const handleChange = (event) => {
        SetTime(event.target.value);
    };
    const ShowHideDeliveryOptions = async () => {
        SetShowData(true)
        SetShowDeliveryRestData(false)
        dispatch({ type: 'DeliveryOption', DeliveryOption: true })
    }
    const AddDeliveryInstruction = () => {
        SetShowDeliveryRestData(true)
    }
    React.useEffect(()=>{
        if(Time === ""){
            if(Hours !== null  && Hours !== undefined){

                    const h  =  Hours?.map((data)=>data?.day)
                    const t1 =  Hours?.map((data)=>data?.Open.map((data)=> data?.Time1))
                    const t2 =  Hours?.map((data)=>data?.Open.map((data)=> data?.Time2))
                    SetTime(h[0] + " " +t1[0][0]+"-"+t2[0][0])
            }else{
                SetTime(`Monday 00:30-23:30`)
            }
        }
      
   
    },[ Hours])
    return (
        <div>
            <div className="col-12 d-flex justify-content-end align-items-center">
               
                {
                    ShowDeliveryRestData ? null :  <Button  variant="outlined" sx={{
                    color: '#31B665',
                    borderColor:'#31B665',
                    fontSize:'12px',
                    textTransform:'capitalize',
                    '&:hover': {
                        color: "white",
                        backgroundColor:'#31B665',
                        borderColor:'#31B665',
                    },
                    }} onClick={()=>{SetShowDeliveryRestData(true)}}>{`Edit`}</Button>
                }
            </div>
            <div className="col-12" >
                <h3 className={`mb-0 ${newclases.height_for_delivery_instruction_div}`}>{state.selectDeliveryoptions === "delivery_btn" ? "Delivery" : "Pickup" }    {`Address`}</h3>
                {DeliveryOptionData?.map((ele, index) => {
                    return (
                        <div key={index}>
                            <p className='text-break'>Your {ele?.address}  </p>
                        </div>

                    )

                })}

            </div>
            <div className="col-12   d-flex aling-item-center ">
                    <p className='text-break'>{state.selectDeliveryoptions === "pickup_btn" ? state.AllProduct[0]?.StoreAddress : <>{ state.DeliveryAddress} <Link href={'/cart'}><FiEdit  color='#31B665' /></Link> </>   }  </p>
            </div>
            {
                state.selectDeliveryoptions === "delivery_btn" ?
                    ShowDeliveryRestData ? "" : <div className='showagain' onClick={AddDeliveryInstruction}>
                        <p className='font-weight-bold'>{`Add delivery instructions`}</p>
                    </div>
                : 
                ShowDeliveryRestData ?
                        <div className="col-12 height_for_inner_div ">
                            <h3 className={newclases.height_for_delivery_instruction_div}>{state.selectDeliveryoptions === "delivery_btn" ? "Delivery" : "Pickup" }  {`time`}</h3>
                        </div>
                    :
                        <React.Fragment>
                            <h3 className={newclases.height_for_delivery_instruction_div}> Pickup Time </h3>
                            <p className='m-0'> {Time}</p>
                        </React.Fragment>
                
            }

            {ShowDeliveryRestData &&

                <div>                    
                    <div className="col-12 height_for_time_div">
                        <div className="col-12 col-lg-12 height_for_time_div">
                            <FormControl className={`${classes.muiSelectTime}`} >
                                <InputLabel id="demo-select-small">{`Time`}</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={Time}
                                    label="Time"
                                    onChange={handleChange}
                                >
                            
                                    {
                                        Hours?.map((data , index)=>{
                                            return(
                                                <MenuItem key={index}  value={data?.day + " " + data?.Open?.map((time)=>time.Time1) +"-"+ data?.Open?.map((time)=>time.Time2)}>
                                                    <div className=''> <span className='col-5'><b> { data?.day[0].toUpperCase() + data?.day.slice(1)} : </b></span> <span className='col-5'>  {data?.Open?.map((time)=>time.Time1)} - {data?.Open?.map((time)=>time.Time2)}</span></div>
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>


                    </div>
                    <h3 className={newclases.height_for_delivery_instruction_div}>{state.selectDeliveryoptions === "delivery_btn" ? "Delivery" : "Pickup" } {` Instruction`}</h3>
                    <div className="col-12 height_for_delivery_instruction_textarea_div ">
                        <div className='col-12 height_for_delivery_instruction_textarea_div'>
                            <textarea className="textAreaDeliveryOptions"  id="textAreaExample4" placeholder={ ` Please specify any additional ${state.selectDeliveryoptions === "delivery_btn" ?"delivery" : "Pickup "} instructions here....`}></textarea>
                        </div>
                    </div>
                    <form onSubmit={method.handleSubmit(ShowHideDeliveryOptions)} >                    
                        <div className='col-12 col-lg-4 height_delivery_option_buttton'>
                            <Box className={`  ${classes.loadingBtnTextAndBack}`}  >
                                <LoadingButton type='submit' variant="outlined">Save</LoadingButton>
                            </Box>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}
export default DeliveryOption