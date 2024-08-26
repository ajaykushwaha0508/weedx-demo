import React from "react";
import CategoryProduct from "../Home/Dashboard/ComponentDashboard/CategoryProduct"
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import AllProductCategory from "./AllProductCategory";
import { ProductCategorySeo } from "../../Component/ScoPage/ProductSeo";
import Loader from "../../Component/Loader/Loader";
const AllCategory = () => {
    const navigate = useNavigate();
    const Params = useParams()
    const { id, categoryname } = Params
    const [Category, SetCategory] = React.useState([])
    const [category, setCategory] = React.useState([])
    const [Loading, SetLoading] = React.useState(true)
    React.useEffect(() => {
        SetLoading(true)

        Axios(`https://apiv2.cannabaze.com/UserPanel/Get-SubCategoryByCategory/${id}`, {
        }

        ).then(response => {
            SetCategory(response.data.data)
            SetLoading(false)
        }).catch(
            function (error) {
                SetLoading(false)

            })
    }, [id])
    function ShowCategoryProduct(id, name) {
        navigate(`/products/${name.toLowerCase()}/${id}`);
    }
    React.useEffect(() => {
        const fetchData = async () => {
            const apidata = await fetch("https://apiv2.cannabaze.com/UserPanel/Get-Categories/");
            const data = await apidata.json()
            setCategory(data)

        }
        fetchData()

    }, [])

    React.useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [])
    return (
        <div>
            {/* <ProductCategorySeo categoryname={categoryname} ></ProductCategorySeo> */}
            <CategoryProduct Category={category} ShowCategoryProduct={ShowCategoryProduct}></CategoryProduct>
            <div className="col-12 center">

                {

                    Loading ? <Loader/> : <AllProductCategory flowerArray={Category}></AllProductCategory>
                }
            </div>
        </div>
    )
}



export default AllCategory; 
