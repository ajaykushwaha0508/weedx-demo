'use client'  
import React from "react"
import { AiOutlineLeft } from "react-icons/ai"
import AllOrder from "@/component/Myorder/allorder";
import useStyles from "@/styles/style";
import { IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetCancelOrder, PendingOrder, Cancel, order, GetDeliveredOrder } from "../hooks/utilis/orderapi";
import axios from "axios"
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'universal-cookie';
import Swal  from'sweetalert2'
import Select from '@mui/material/Select';
import Layout from "@/layout/layout";
import styled from "@/styles/customstyle.module.css";
import Loader from '@/component/Loader/Loader';
import CreateContext from "@/hooks/context";
export default function  MyOrder(){
    const cookies = new Cookies();
    let token_data = cookies.get('User_Token_access');
    if (typeof window !== 'undefined') {  token_data = localStorage.getItem('User_Token_access'); }
    const [Getsearch, SetSearch] = React.useState("");
    const navigate = useRouter();
    const {state} = React.useContext(CreateContext)
    const classes = useStyles();
    const [AllOrder_data, SetAllOrder_data] = React.useState([]);
    const [showabledata, setShowabledata] = React.useState([]);
    const [ordertype, Setordertype] = React.useState('');
    const [searchitem, setsearchitem] = React.useState([]);
    const [GetFilter, SetFilter] = React.useState(' ');
    const [loading, SetLoading] = React.useState(false);
    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
        SetLoading(true)
        axios.get(`https://api.cannabaze.com/UserPanel/Get-Order/` , {
            headers: { Authorization: `Bearer ${token_data}` }
        }).then((res) => {
            SetFilter(" ")
            SetAllOrder_data(res?.data?.reverse())
            setShowabledata(res?.data?.reverse())
            SetLoading(false)
        }).catch()
    
    }, [])
    function CencelOrder(id) {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        
            imageUrl: "/image/warning.png",
            imageClass: "loginsweetimg",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#31B655",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                SetLoading(true)
                Cancel(id).then((res) => {

                    PendingOrder().then((res) => {
                        SetAllOrder_data(res.data)
                        SetLoading(false)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }).catch((error) => {
                   
                        SetLoading(false)
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                            footer: '<a href="#">Why do I have this issue?</a>'
                        });
                    })





                }).catch(SetLoading(false))
                SetLoading(false)

            }
        });

    }
    const top100Films = []
    React.useEffect(() => {
        if(GetFilter === 'Cancelled Order'){
            setShowabledata(  AllOrder_data.filter((item , index)=>{
               return item.Order_Status === "Cancel"
            } ))
        }else if(GetFilter === 'Pending Order'){
            setShowabledata(  AllOrder_data.filter((item , index)=>{
                return item.Order_Status === "Pending"
             } ))
        }else if(GetFilter === 'Shipped Order'){
            setShowabledata(  AllOrder_data.filter((item , index)=>{
                return item.Order_Status === "Processing"
             } ))
        }else if(GetFilter === 'Delivered Order'){
            setShowabledata(  AllOrder_data.filter((item , index)=>{
                return item.Order_Status === "Delivered"
             } ))
        }else{
            setShowabledata(AllOrder_data)
        }
    }, [GetFilter])
    React.useEffect(()=>{
        SetLoading(true)
        const getData = setTimeout(() => {
            if(Getsearch.length !== 0 ){
                axios.post(`https://api.cannabaze.com/UserPanel/OrderSearch/`,
                {
                    search: Getsearch
                },
                {
                    headers: { Authorization: `Bearer ${token_data}` }
                },
            ).then((response) => {
                setsearchitem(response.data)
        SetLoading(false)

            });}else{
                SetSearch('')
                setsearchitem([])
                SetLoading(false)

            }
        }, 1000)
        return () => clearTimeout(getData)
    },[Getsearch])
    return (
        <React.Fragment>
                <div className="row px-2 center">
                    <div className={`col-md-10 col-12 myOrderPAge`}>
                     
                        <h1 className="d-flex align-items-center gap-2">
                            <IconButton > <AiOutlineLeft onClick={() => navigate.push(-1)} size={20} color="#000000" style={{ marginLeft: "-6px" }} /></IconButton>
                            <span onClick={(() => navigate.push(state.Embedded_Store.StoreID ===""? '/' :`/embedded-menu/${state.Embedded_Store.StoreName}/${state.Embedded_Store.StoreID}`))} className="My_order_span_name">{`Back`}</span>
                        </h1>
                        <div className="d-flex mt-4 " style={{ padding: "0" }}>
                            <div className="col-8 col-lg-6">
                            
                                <Autocomplete
                                    freeSolo
                                    id="free-solo-2-demo"
                                    placeholder="Search order by ID"
                                    disableClearable
                                    options={top100Films.map((option) => option.title)}
                                    className={classes.orderListSearch}
                                    onInputChange={(e)=>SetSearch(e.target.value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search Order..."
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                            }}
                                        />
                                    )}
                                />
                                {/* SetSearch */}
                            </div>
                            <div className="col-4 col-lg-6 text-end">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={GetFilter}
                                    className={classes.texttoselect}
                                    onChange={(e)=>{
                                        SetFilter(e.target.value);
                                    }}
                                >
                                    <MenuItem value={" "}> {`All Order`}</MenuItem>
                                    <MenuItem value={"Pending Order"}>{`Pending Order`}</MenuItem>
                                    <MenuItem value={"Shipped Order"}>{`Shipped Order`}</MenuItem>
                                    <MenuItem value={"Delivered Order"}>{`Delivered Order`}</MenuItem>
                                    <MenuItem value={"Cancelled Order"} >{`Cancelled Order`}</MenuItem>
                                </Select>
                            </div>

                        </div>
                        <div className={`${styled.Order_Text} mt-4`}>
                                <p >  {` Welcome to your personalized order hub! Easily track and manage your purchases with the convenience of organized sections. Explore the status of your orders under the following categories`}</p>
                                <h5 style={{ color: "black" }}> {`Keep tabs on every purchase journey seamlessly.`} </h5>
                        </div>
                        { 
                            Boolean(AllOrder_data[0]) ? 
                            <AllOrder AllOrder_data={showabledata} loading={loading} CencelOrder={CencelOrder} ordertype={ordertype} searchitem={searchitem} />:
                            <div className={styled.NODataInOrderPage}>
                                <div className={styled.nodataAlie}>
                                    <p className={styled.nodatainOderText}>{GetFilter}</p>
                                    <p className={styled.nodatainOderTextp}> {`No orders to display at the moment. Start shopping to see your order history here!`}</p>
                                    <button onClick={()=>navigate.push(state.Embedded_Store.StoreID === "" ? "/products" : `/embedded-menu/${state.Embedded_Store.StoreName}/${state.Embedded_Store.StoreID}`)} className="noorderbtn"> {`Shop Now`} </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>  
        </React.Fragment>
    )
}
MyOrder.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};