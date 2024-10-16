import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import useStyles from "@/styles/style";
import Createcontext from "@/hooks/context";
import DeliverAutoCompleteAddress from "./DeliverAutoCompleteAddress";
import newclases from '@/styles/customstyle.module.scss';
import PromoCode from "./Promocode";
import { Menuintegration_login } from "@/component/Login/menu-integration_login";
const AddToCartSummary = ({ SubmitData, CheckOut_Loading, SetLoading, SetDetails, Details }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = React.useContext(Createcontext);
  const [anyoutstock, setanyoutstock] = React.useState([])
  const navigate = useRouter()
  const [OpenDelivery, SetOpenDelivery] = React.useState(false);
  const [OpenPickup, SetOpenPickup] = React.useState(false);
  const [InputValues, SetInputValues] = React.useState({
    delivery: "",
    contact: "",
  });

  const InputFieldHandler = (e) => {
    const { name, value } = e.target;
    SetInputValues({ ...InputValues, [name]: value });
  };
  const HandlePickupAndDelivery = (e) => {
    SetOpenPickup(!OpenPickup);
    SetOpenDelivery(false);
    if (e === "pickup_btn") {
      SetOpenPickup(!OpenPickup);
      SetOpenDelivery(false);
      if (state.AllProduct[0]?.StoreCurbsidePickup) {
        dispatch({
          type: "selectDeliveryoptions",
          selectDeliveryoptions: "CurbsidePickup",
        });
      } else {
        dispatch({
          type: "selectDeliveryoptions",
          selectDeliveryoptions: "pickup_btn",
        });
      }

    } else if (e === "delivery_btn") {
      SetOpenDelivery(!OpenDelivery);
      SetOpenPickup(false);
      dispatch({
        type: "selectDeliveryoptions",
        selectDeliveryoptions: "delivery_btn",
      });
    }
  };
  const CheckoutProcess = (event, j) => {
    if (!state.login) {
      if (navigate.pathname === '/carts') {
        setOpen(true);
      } else {
        navigate.push({
          pathname: '/login',
          query: { referer:  'cart'  }
      })
      }
      return;
    }
  
    const isCartPage = navigate.pathname === "/cart" || navigate.pathname === "/carts";
    const isCheckoutPage = navigate.pathname === "/checkout" || navigate.pathname === "/menu-integration/checkout";
  
    if (state.selectDeliveryoptions === "delivery_btn") {
      if (!state.DeliveryAddress) {
        alert("Select Delivery address");
        return;
      }
  
      if (isCartPage) {
       
        navigate.push(navigate.pathname === "/carts" ? '/menu-integration/checkout' : "/checkout", undefined, { shallow: true, state:  { InputValues, abc: state.Cart_subTotal, orderBtn: state.selectDeliveryoptions } });
      } else if (!state.DeliveryOption || !state.DeliveryInformation) {
        alert("First fill the form");
        return;
      }
  
      if (isCheckoutPage) {
        SubmitData();
      }
    } else if (["pickup_btn", "CurbsidePickup"].includes(state.selectDeliveryoptions)) {
      if (isCartPage) {

        navigate.push({
          pathname: navigate.pathname === "/carts" ? '/menu-integration/checkout' : "/checkout",
          query: { InputValues, abc: state.Cart_subTotal, orderBtn: state.selectDeliveryoptions },
        });
        // navigate.push(location.pathname === "/carts" ? '/menu-integration/checkout' : "/checkout",{ state:   { InputValues, abc: state.Cart_subTotal, orderBtn: state.selectDeliveryoptions } });
      } else if (!state.DeliveryOption || !state.DeliveryInformation) {
        alert("First fill the form");
        return;
      }
  
      if (isCheckoutPage) {
        SubmitData();
      }
    } else {
      alert("Select Delivery address");
    }
  };  
  React.useEffect(() => {
    if (navigate.pathname === "/cart") {
      if (state.selectDeliveryoptions === "pickup_btn") {
        SetOpenDelivery(false);
        SetOpenPickup(true);
      } else if (state.selectDeliveryoptions === "delivery_btn") {
        SetOpenDelivery(true);
        SetOpenPickup(false);
      }
    }
  }, [state.selectDeliveryoptions]);
  function ChnageDeliveryAddress() {
    navigate.push("/cart");
  }
  useEffect(() => {
    let nss = state?.AllProduct?.map((ele) => {
      if (ele?.Price?.Stock !== "IN Stock") {
        return 'oos'
      } else {
        return 'ins'
      }
    })
    setanyoutstock(nss)
  }, [state?.AllProduct])
   useEffect(()=>{
      if(state.AllProduct[0]?.StoreCurbsidePickup && state.AllProduct[0]?.StorePickup){
        HandlePickupAndDelivery('delivery_btn')
      }else if(!state.AllProduct[0]?.StoreDelivery){
        HandlePickupAndDelivery('pickup_btn') 
      }
  } , [state.AllProduct[0]])
  return (
    <div className={newclases.Add_product_cart_right_container_summary}>
        <h5 className={newclases.AddProdCartFont_weight}>Order Summary</h5>
       
      {(Boolean(navigate.pathname !== "/checkout") || Boolean(navigate.pathname !== "/checkout")) ? (
        <div className="w-100 d-flex align-items-center py-2 ">
          {state.AllProduct[0]?.StoreDelivery && (
            <div className="col-6">
              <Box
                className={`px-1   ${classes.loadingBtnTextAndBack}`}
              >
                <LoadingButton
                  style={{
                    backgroundColor: OpenDelivery && "#d8d8d8",
                    color: OpenDelivery && "#000",
                  }}
                  onClick={()=>HandlePickupAndDelivery('delivery_btn')}
                  id="delivery_btn"
                  variant="outlined"
                >
                  {`Delivery`}
                </LoadingButton>
              </Box>
            </div>
          )}

          <div className="col-6">
            {((state.AllProduct[0]?.StoreCurbsidePickup ||
              state.AllProduct[0]?.StorePickup)) && (
                <Box
                  className={`px-1  ${classes.loadingBtnTextAndBack}`} >
                  <LoadingButton
                    style={{
                      backgroundColor: OpenPickup && "#d8d8d8",
                      color: OpenPickup && "#000",
                    }}
                    variant="outlined"
                    id="pickup_btn"
                    onClick={()=>HandlePickupAndDelivery('pickup_btn')}
                  >
                    {state.AllProduct[0]?.StoreCurbsidePickup
                      ? "Curbside Pickup"
                      : "Store Pickup"}
                  </LoadingButton>
                </Box>
              )}
          </div>
        </div>
      ) : ( Boolean(((state.AllProduct[0]?.StoreCurbsidePickup +
        state.AllProduct[0]?.StorePickup) + state.AllProduct[0]?.StoreDelivery) !==1) &&
        <Box  className={`py-2  ${classes.loadingBtnTextAndBack}`}  >
          <LoadingButton
            sx={{
              color: "#00b96a",
              "&:hover": {
                color: "white",
              },
            }}
            variant="outlined"
            id="pickup_btn"
            onClick={ChnageDeliveryAddress}
          >
            Change Method
          </LoadingButton>
        </Box>
      )}
        {OpenDelivery && (
          <div className="my-3">
            <div className=" w-xl-50 w-lg-75 w-100 mt-2">
              <label htmlFor="name-field">{`MY STREET ADDRESS`}</label>
              <DeliverAutoCompleteAddress
                OpenDelivery={OpenDelivery}
                className={classes.textFieldcartsummeryPage}
                Store={state.AllProduct[0].Store_id}
              ></DeliverAutoCompleteAddress>
            </div>
            <div className="  w-xl-50 w-lg-75 w-100 mt-3">
              <label htmlFor="name-field">
                {`APARTMENT OR SUITE NUMBER`}
                <TextField
                  className={classes.textFieldcartsummeryPage}
                  name="contact"
                  value={InputValues.contact}
                  onChange={InputFieldHandler}
                  id="outlined-basic"
                  placeholder="APARTMENT OR SUITE NUMBER"
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              </label>
            </div>
          </div>
        )}
        {OpenPickup && (
          <div className={newclases.pickup_div} >
            <h3 className={newclases.addresHeading}> {`Pickup Address`}</h3>
            <p>{state.AllProduct[0]?.StoreAddress}</p>
          </div>
        )}
      <div className={newclases.order_summary_flex}>
          <p className={newclases.add_prod_cart_summary_p}>{`Subtotal`}</p>
          <p>${state.Cart_subTotal}</p>
      </div>
      <div className={newclases.order_summary_flex}>
          <p className={newclases.add_prod_cart_summary_p}>{`Est. excise tax`}</p>
          <p>$0</p>
      
      </div>
      <div className={newclases.order_summary_flex}>
      
          <p className={newclases.add_prod_cart_summary_p}>{`State tax`}</p>
    
          <p>$0</p>
      </div>
      <div className={newclases.order_summary_flex}>
          <p className={newclases.add_prod_cart_summary_p}>{`Delivery fee`}</p>
          <p>${state.DeliveryPrice || "0"}</p>
      </div>
      <div className={newclases.order_Summary_total_container}>
        <div className={newclases.order_summary_flex}>
          <div >
            <p className={`m-0  ${newclases.add_prod_cart_summary_p}`}>{`Total Amount`}</p>
            {Boolean(state.CoupounAmount) && <p className="m-0 ">{`Discount Amount`}</p>}
          </div>
          <div>
            {Boolean(state.CoupounAmount) ? <del className=""  ><span className="m-0 " >${state.Cart_subTotal}</span></del> : <p className="m-0 ">${state.Cart_subTotal}</p>}
            {Boolean(state.CoupounAmount) && <p className="m-0 ">${state.Cart_subTotal - state.CoupounAmount}</p>}
          </div>
        </div>

      </div>
      <div className={newclases.add_prod_cart_p}>
        {
           state.DeliveryPrice === 0 ?
            <p className="mb-0">{`Taxes are Shows`}</p>
            :
            <p style={{ color: "#e78d8d" }}>{` Minimum order card value`} {state.MinimumOrderPrice}</p>
        }
      </div>
      <PromoCode />
      <div className="">
        {navigate.pathname === "/cart" ? (
          (OpenDelivery || OpenPickup) && (

            <Box className={`  floatingbtn  `}>
              <LoadingButton
                variant="outlined"
                loading={CheckOut_Loading}
                disabled={anyoutstock.includes('oos') ? true : false}
                onClick={(e) => {
                  CheckoutProcess(e);
                }}
                className={classes.flotchceckoutbtn}
              >
                {" "}
                proceed to checkout{" "}
              </LoadingButton>
            </Box>
          )
        ) : (
          <Box
            className={`  floatingbtn `}
          >
            <LoadingButton
              loading={CheckOut_Loading}
              onClick={(e) => {
                CheckoutProcess(e);
              }}
              className={classes.flotchceckoutbtn}

              type="submit"
            >
              checkout
            </LoadingButton>
          </Box>
        )}
      </div>
      {
        open && <Menuintegration_login open={open} setOpen={setOpen}></Menuintegration_login>
      }
    </div>
  );
};
export default AddToCartSummary;
