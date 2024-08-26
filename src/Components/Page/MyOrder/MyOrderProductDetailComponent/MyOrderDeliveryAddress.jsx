import React from "react"
const MyOrderDeliveryAddress = ({props}) => {
    return (
        <React.Fragment>
            <div className="col-xl-7 col-lg-10 col-md-12 MyOrderDeliveryAddress_Container mt-4 px-0">
               <section className="MyOrderDeliverSection">
               <div className="w-100 px-2 MyOrderDeliveryAddress_head_cont">
                    <h1 className="MyOrderDeliveryAddress_headingss">Delivery Address</h1>
                </div>
                <div className="w-100 MyOrderDeliveryAddress_head_cont">
                    <h2 className="MyOrderDeliveryAddress_subHeading">{props[0]?.Address}</h2>
                </div>
               </section>

            </div>

        </React.Fragment>
    )
}
export default MyOrderDeliveryAddress