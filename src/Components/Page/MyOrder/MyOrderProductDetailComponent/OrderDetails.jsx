import React from "react"
const OrderDetails = ({props}) => {
  
    return (
        <React.Fragment>
            <div className="col-xl-7 col-lg-10 col-md-12 orderDetails_container  mt-4">
                <section className="orderDetails_innerSection1">
                    <div className="w-100 orderDetail_heading_container">
                        <h1 className="orderDetails_headings">Order  Details</h1>
                    </div>
                    <div className="ordetailAmount_container">
                        <span className="amount_spanss">Amount</span><span className="amount_spanss">$ {props[0]?.subtotal}</span>
                    </div>
                </section>
                <section className="orderDetails_innerSection2">
                    <div className="ordetailAmount_container">
                        <span className="amount_spanss">Total</span><span className="totalAmounts">$ {props[0]?.subtotal}</span>
                    </div>

                </section>

            </div>

        </React.Fragment>
    )
}
export default OrderDetails