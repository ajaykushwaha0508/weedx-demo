
import StoreDetailMenuItem from "./StoreDetailComponent/StoreDetailMenuItem"
import React from "react"
import ComponentStoreDetails from "./ComponentStoreDetails"
const StoreDetail = () => {
    return (
        <React.Fragment>
            <div className="container-fluid">
                <StoreDetailMenuItem />
              <ComponentStoreDetails></ComponentStoreDetails>


            </div>
        </React.Fragment>
    )
}
export default StoreDetail