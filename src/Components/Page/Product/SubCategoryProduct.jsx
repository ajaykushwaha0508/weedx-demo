import React from "react"
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import ProductSearchResult from "./ProductSearchResult/ProductSearchResult";
import Loader from "../../Component/Loader/Loader";
const SubcategoryProduct = () => {
    const Params = useParams()
    const Id = Params.id
    const [Product, SetProduct] = React.useState([])
    const [Loading, SetLoading] = React.useState(true)
    const [CategoryName, SetCategoryName] = React.useState([])

    React.useEffect(() => {
        SetLoading(true)

        Axios(`https://api.cannabaze.com/UserPanel/Get-ProductBySubCategory/${Id}`, {
        }

        ).then(response => {
            SetProduct(response.data)
            SetCategoryName(response.data[0].category_name)
            SetLoading(false)
        }).catch(
            function (error) {
                SetLoading(false)

            })
    }, [Id])
    return (

        <div className="col-12 center">
            {
                Loading ?
               <Loader/>
                    :
                    <div className="col-12 mt-4">
                        <ProductSearchResult RelatedProductResult={Product} CategoryName={CategoryName} />


                    </div>
            }
        </div>

    )
}



export default SubcategoryProduct 