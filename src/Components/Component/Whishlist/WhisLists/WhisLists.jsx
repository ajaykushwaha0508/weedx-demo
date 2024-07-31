import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IconButton } from "@mui/material";
import WhisListCard from "./WhisListComponent/WhisListCards";
import Createcontext from "../../../../Hooks/Context"
import { useNavigate } from "react-router-dom";
import { WhislistSeo } from "../../ScoPage/CommenpageSeo";
const WhisLists = () => {
    const { state } = React.useContext(Createcontext)
    const Navigate = useNavigate()
    return (
        <div className="container-fluid">
            <WhislistSeo></WhislistSeo>
            <div className="row">
                <div className="col-12 whislistBackBtn_Container px-0">
                    <span><IconButton onClick={() => Navigate('/products')}><MdOutlineKeyboardArrowLeft color="#000000"/></IconButton></span><span onClick={() => Navigate(-1)} className="BackPageBtn">Back</span>

                </div>
              
                <WhisListCard/>
            </div>
        </div>
    )
}
export default WhisLists