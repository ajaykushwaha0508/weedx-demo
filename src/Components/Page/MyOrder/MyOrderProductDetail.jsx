import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import AllOrder from "./MyOrderComponent/AllOrder";
import MyOrderProductRating from "./MyOrderProductDetailComponent/MyOrderProductRating";
import OrderTracking from "./MyOrderProductDetailComponent/OrderTracking";
import OrderDetails from "./MyOrderProductDetailComponent/OrderDetails";
import MyOrderDeliveryAddress from "./MyOrderProductDetailComponent/MyOrderDeliveryAddress";
import MyOrderProductDetailStoreName from "./MyOrderProductDetailComponent/MyOrderProductDetailStoreName";
import MyOrderProductDetailCustomerName from "./MyOrderProductDetailComponent/MyOrderProductDetailCustomerName";
import Rating from "@mui/material/Rating";
import { IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { OrderBYID, PendingOrder, Cancel } from "../MyOrder/MyorderApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsFillCircleFill } from "react-icons/bs";
import { useNavigate, useParams,Link } from "react-router-dom";
import useStyles from "../../../Style";
import { MyOrderSeoDetail } from "../../Component/ScoPage/CommenpageSeo";
const MyOrderProductDetail = () => {
  const params = useParams();
  const [loading, SetLoading] = React.useState(false)
  const classes = useStyles();
  const [AllOrder_data, SetAllOrder_data] = React.useState([]);
  const [statuscolor, Setstatuscolor] = React.useState("#31B655");
  const navigate = useNavigate();
  React.useEffect(() => {
    OrderBYID(params.id)
      .then((res) => {
        SetAllOrder_data(res.data.reverse());

        if (AllOrder_data[0]?.Order_Status === "Cancel") {
          Setstatuscolor("#d33");
        } else if (AllOrder_data[0]?.Order_Status === "Delivered") {
          Setstatuscolor("gold");
        }
      })
      .catch();
  }, [params]);
  React.useEffect(()=>{
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    }); 
    if (AllOrder_data[0]?.Order_Status === "Cancel") {
      Setstatuscolor("#d33");
    } else if (AllOrder_data[0]?.Order_Status === "Delivered") {
      Setstatuscolor("gold");
    }
  },[])
  const Swal = require('sweetalert2')

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

              OrderBYID(params.id)
              .then((res) => {
             
                SetAllOrder_data(res.data.reverse());
        
                if (AllOrder_data[0]?.Order_Status === "Cancel") {
                  Setstatuscolor("#d33");
                } else if (AllOrder_data[0]?.Order_Status === "Delivered") {
                  Setstatuscolor("gold");
                }
              })




            }).catch(SetLoading(false))
            SetLoading(false)

        }
    });

  }
  return (
    <div className="container-fluid">
      <MyOrderSeoDetail></MyOrderSeoDetail>
      <div className="row ">
        <div className="col-12 d-flex px-0  productDetails_heading_container">
          <IconButton onClick={() => navigate(-1)}>
            {" "}
            <AiOutlineLeft color="#000000" size={20} />{" "}
          </IconButton>
          <span
            onClick={() => navigate(-1)}
            className="productDetails_headings"
          >
            Product Details
          </span>
        </div>
       
        <div className="p-2 mt-4">
          <div className="col-12 allOrderCard_container border p-3 ">
            <div className="imageSectionWrapper">
              <section className="allOrder_Card_Image_section">
                <div className="Allorder_img_container">
                  <LazyLoadImage
                    className="Allorder_img"
                    onError={(event) => {
                      event.target.src = "/image/blankImage.jpg";
                      event.onerror = null;
                    }}
                    src={`${AllOrder_data[0]?.Product[0]?.Image}`}
                    alt={AllOrder_data[0]?.Product[0]?.ProductName}
                    title={AllOrder_data[0]?.Product[0]?.ProductName}
                  />
                </div>
              </section>
              <section className="allOrder_Card_Content_section">
                <div className="col-12">
                  <h1 className="AllOrder_heading">
                    {AllOrder_data[0]?.Product[0]?.ProductName}
                  </h1>
                </div>
                <div className="w-100  allOrder_span_quantity_div">
                  <span className="allOrder_span_quantity">
                    Quantity : {AllOrder_data[0]?.Product[0]?.Cart_Quantity}
                  </span>
                  <span className="allOrder_span_quantity">
                    Brand : {AllOrder_data[0]?.Product[0]?.Brand_Name}
                  </span>
                </div>
                <div className="w-100 allOrder_icons_container">
                  <span className="allOrder_spanName">
                    Amount :
                    <span className="Amount_price">
                      {" "}
                      {AllOrder_data[0]?.Product[0]?.Price.SalePrice}
                    </span>
                  </span>
                  <div className="allOrder_icons_div">
                    <BsFillCircleFill color={AllOrder_data[0]?.Order_Status === "Cancel" ? "#d33": "#31B655"} size={20} />
                    <span className="allOrder_spanName">
                      {AllOrder_data[0]?.Order_Status}
                    </span>
                  </div>
                </div>
              {  AllOrder_data[0]?.Order_Status !== "Cancel" &&
                <div><LoadingButton className={classes.cncelbtnorder} onClick={()=>{CencelOrder(params.id)}}>Cancel</LoadingButton></div>
              }


              </section>
            </div>
          </div>
        </div>
        {/* <AllOrder props={AllOrder_data} /> */}
        {/* <MyOrderProductRating  props={AllOrder_data}/> */}
      </div>
     <div className="row">
     <div className="col-12 d-lg-flex orderdetailscontainer d-block "> 
            <OrderTracking AllOrder_data={AllOrder_data} />
            <div className="col ">
          
            <div className="orderTracking_container">
                <section className="">
                <span className="customerNameFontss">Delivery Address : </span>

                <span className="MyOrderDeliveryAddress_subHeading">
                    {" "}
                    {AllOrder_data[0]?.Address}
                </span>
                </section>
                <div className="">
                <span className="customerNameFontss">Store Name :</span>

                <span className=""> {AllOrder_data[0]?.SellerName}</span>
                </div>
                <div className=" ">
                <span className="customerNameFontss">Customer Name : </span>
                <span className="customerName">
                    {" "}
                    {AllOrder_data[0]?.username}
                </span>
                </div>
                <div className=" ">
                <span className="customerNameFontss">Customer Number : </span>
                <span className="customerNumber">
                    {" "}
                    {AllOrder_data[0]?.MobileNo}
                </span>
                </div>
                <div className=" ">
                <span className="customerNameFontss">Order ID : </span>
                <span className="customerNumber">
                    {" "}
                    {AllOrder_data[0]?.OrderId}
                </span>
                </div>
                <div className=" ">
                <span className="customerNameFontss">Payment Method : </span>
                <span className="customerNumber"> Cash On Delivery </span>
                </div>

                <section className="orderDetails_innerSection1">
                <div className="ordetailAmount_container">
                    <span className="amount_spanss">Amount</span>
                    <span className="amount_spanss">
                    $ {AllOrder_data[0]?.subtotal}
                    </span>
                </div>
                </section>
                <section className="orderDetails_innerSection2">
                <div className="ordetailAmount_container">
                    <span className="amount_spanss">Total</span>
                    <span className="totalAmounts">
                    $ {AllOrder_data[0]?.subtotal}
                    </span>
                </div>
                </section>
            </div>
            </div>
        </div>
     </div>

    
    </div>
  );
};
export default MyOrderProductDetail;
