import React from "react"
const MyOrderProductDetailStoreName=({props})=>{
    return(
        <React.Fragment>
            <div className="col-xl-7 col-lg-10 col-md-12 MyOrderProductDetailStoreName_container mt-4">
                <div className="MyOrderProductDetailStoreName_innercontainer">
                    <div className="MyOrderProdDeta_storeNamediv">
                       <h1 className="MyOrderProdDeta_storeNamediv_head">Store Name</h1>
                    </div>
                    <div className="MyOrderProdDeta_storeNamediv">
                        <h3 className="MyOrderProdDeta_storeNamediv_head_name">{props[0]?.SellerName}</h3>
                    </div>

                </div>

            </div>

        </React.Fragment>
    )
}
export default MyOrderProductDetailStoreName