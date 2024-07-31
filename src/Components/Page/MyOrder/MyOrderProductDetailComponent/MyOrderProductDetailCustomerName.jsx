import React from "react"
const MyOrderProductDetailCustomerName=({props})=>{
    return(
        <React.Fragment>
            <div className="col-xl-7 col-lg-10 col-md-12 MyOrderProductDetailCustomerName_cont mt-4">
                <div className="MyOrderProductDetailCustomerName_inner_cont">
                    <div className="w-100 MyOrderProductDetailCustomerName_div">
                        <span className="customerNameFontss">Customer Name</span><span className="customerName">{props[0]?.username}</span>

                    </div>
                    <div className="w-100 MyOrderProductDetailCustomerName_div">
                        <span className="customerNameFontss">Customer Number</span><span className="customerNumber">{props[0]?.MobileNo}</span>

                    </div>

                </div>

            </div>

        </React.Fragment>
    )
}
export default MyOrderProductDetailCustomerName