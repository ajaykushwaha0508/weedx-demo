import DeliveryOption from "@/component/Checkout/DeliveryOption";
import { DeliveryInformation } from "@/component/Checkout/DeliveryInformation";
import Payment from "@/component/Checkout/Payment";
import React from "react";
import Layout from '@/layout/layout';
import AddToCartReview from "@/component/Addtocard/AddToCartReview";
import AddToCartSummary from "@/component/Addtocard/AddToCartSummary";
import Cookies from 'universal-cookie';
import Createcontext from "@/hooks/context";
import { useRouter } from "next/router";
import newcalses from '@/styles/customstyle.module.css';
import Axios from "axios";
import ProtectRout from "@/hooks/utilis/ProtectRout";
import newclases from '@/styles/customstyle.module.css';
import Layout1 from "@/layout/layout1";
export default function Checkout (){
    const { state, dispatch } = React.useContext(Createcontext)
    const cookies = new Cookies();
    const navigate = useRouter()
    let token_data = cookies.get('User_Token_access')
    let accessToken
    if (typeof window !== 'undefined') {
         accessToken = localStorage.getItem('User_Token_access');
    }
    if(  Boolean(accessToken) ){ token_data  =  accessToken}
        const [ShowData, SetShowData] = React.useState(false)
        const [ShowDeliveryInformation, SetShowDeliveryInformation] = React.useState(false)
        const [DeliveryOptionData, SetDeliveryOptionData] = React.useState([])
        const location = useRouter();
        const { InputValues, abc , orderBtn } = location?.query
        const [image, setImage] = React.useState()
        const [DefalutImage, SetDefalutimage] = React.useState(false)
        const [Dataimage, setDataImage] = React.useState()
        const [Time, SetTime] = React.useState('');
        const [Details, SetDetails] = React.useState({
            FirstName: '',
            LastName: "",
            DateOfBirth: "",
            MobileNo: "",
            MedicalMarijuanaNumber: "",
            Address: "",
            Email: "",
            Ordertype: '',
        })
        const [CheckOut_Loading, SetLoading] = React.useState(false)
        React.useEffect(() => {
            window.scroll(0, 0)
        }, [ShowData, ShowDeliveryInformation, DeliveryOptionData])
        const config = {
            headers: { Authorization: `Bearer ${token_data}` }
        };
        async function SubmitData() {
                let asdsd = 'Delivery'
                if (state.selectDeliveryoptions === "pickup_btn") {
                    asdsd = "Pickup"
                }else if (state.selectDeliveryoptions === "CurbsidePickup") {
                    asdsd = 'Delivery and Pickup'
                }else if (state.selectDeliveryoptions === "delivery_btn") {
                    asdsd = 'Delivery'
                }
                const formdata = new FormData();
                Boolean(Dataimage)  && formdata.append('IdCard', Dataimage);
                formdata.append('FirstName', Details.FirstName);
                formdata.append('LastName', Details.LastName);
                formdata.append('DateOfBirth', Details.DateOfBirth);
                formdata.append('MobileNo', Details.MobileNo);
                Boolean(Details.MedicalMarijuanaNumber)  &&    formdata.append('MedicalMarijuanaNumber', Details.MedicalMarijuanaNumber);
                formdata.append('subtotal', state?.Cart_subTotal);
                formdata.append('Product', JSON.stringify(state.AllProduct));
                formdata.append('Store', state.AllProduct[0]?.Store_id);
                formdata.append('Address', state.selectDeliveryoptions === "pickup_btn" ? state.AllProduct[0]?.StoreAddress : state.DeliveryAddress);
                formdata.append('DeliveryTime', Time);
                formdata.append('Email', Details.Email)
                formdata.append('Order_Type', asdsd)
                formdata.append('Country', asdsd === "Delivery" ? state.DeliveryCountry : state.AllProduct[0]?.Country);
                formdata.append('State', asdsd === "Delivery" ? state.DeliveryState : state.AllProduct[0]?.State)
                formdata.append('City', asdsd === "Delivery" ? state.DeliveryCity : state.AllProduct[0]?.City)
                Boolean(state.CoupounAmount)&&   formdata.append('DiscountedAmount',   state?.Cart_subTotal - state.CoupounAmount)
                await Axios.post('https://api.cannabaze.com/UserPanel/Add-Order/',
                    formdata,
                    config,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    },
                    SetLoading(true)
                ).then(response => {
                    SetLoading(false)
                
                    let datanew = { orterbtn: orderBtn,  ...response.data.data }

                    navigate.push({
                        pathname:location.pathname === '/menu-integration/checkout' ?"/menu-integration/order-placed":`/order-placed/${response.data.data.OrderId}`,
                        query: datanew
                    }, `/order-placed/${response.data.data.OrderId}`);
                
                    dispatch({ type: 'ApiProduct', ApiProduct: !state.ApiProduct })
                }).catch(
                    function (error) {
                        SetLoading(false)
                })
        }
        React.useEffect(() => {
            state?.login && Axios.get(`https://api.cannabaze.com/UserPanel/Get-UserProfileOrderDetails/`, config).then((data) => {
                if (data.data.length !== 0) {
                    data.data.map((user, key) => {

                        SetDetails({
                            ...Details, MobileNo: user.MobileNo, Email: user.Email, "DateOfBirth": user.DateOfBirth, "FirstName": user.FirstName, "LastName": user.LastName, "MedicalMarijuanaNumber": user.MedicalMarijuanaNumber, "MobileNo": user.MobileNo
                        });

                    })


                }

            })

        }, [])
  return (
    <ProtectRout>
                <div className="row">
                    <div className="col-md-8 col-xl-8 col-lg-7 col-sm-12 col-12">
                                <div className={newclases.DeliveryOption_container}>
                                    <DeliveryOption Time={Time} SetTime={SetTime} Hours={state?.AllProduct[0]?.StoreHours} DeliveryOptionData={DeliveryOptionData} address={InputValues} SetShowData={SetShowData} />
                                    <DeliveryInformation SetShowDeliveryInformation={SetShowDeliveryInformation}
                                        image={image}
                                        DefalutImage={DefalutImage}
                                        SetDefalutimage={SetDefalutimage}
                                        setImage={setImage}
                                        Dataimage={Dataimage}
                                        setDataImage={setDataImage}
                                        Details={Details}
                                        SetDetails={SetDetails}  />
                                    <Payment SetShowPlaceOrder={SetShowDeliveryInformation} />
                                </div>
                    
                            <div className={newclases.DeliveryOption_container}>
                          
                                <div>
                                    <p className={newcalses.font_size_paragraph}>{`Review`}</p>
                                    <AddToCartReview />
                                </div>
                          
                        </div>
                    </div>
                    <div className="col-md-8 col-xl-4 col-lg-5 col-sm-12 col-12">
                            <AddToCartSummary 
                                SetDeliveryOptionData={SetDeliveryOptionData} 
                                Total={abc} SubmitData={SubmitData}
                                CheckOut_Loading={CheckOut_Loading}
                                SetLoading={SetLoading}
                                Details={Details}
                                SetDetails={SetDetails}
                            />
                    </div>
                </div>
            </ProtectRout>
  )
}

 Checkout.getLayout = function getLayout(page){
    return <Layout1>{page}</Layout1>;
}