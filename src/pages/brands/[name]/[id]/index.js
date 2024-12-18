import RelatedVerifyBanner from "@/component/Brand/RelatedVerifyBrand/RelatedVerifyComponent/RelatedVerifyBrandBanner"
import SearchBar from '@mkyy/mui-search-bar';
import { useRouter } from "next/router";
import Layout from "@/layout/layout";
import React from "react";
import useStyles from "@/styles/style";
import Createcontext from "@/hooks/context"
import { BrandDetailsSeo } from "@/component/ScoPage/BrandsSeo";
import ProductSearchResult from "@/component/productcard/ProductSearchResult";
import Currentlocation from "@/component/currentlocation/CurrentLocation";
import { modifystr } from "@/hooks/utilis/commonfunction";
export default function RelatedVerifyBrand (props){
    const classes = useStyles()
    const { pathname, asPath } = useRouter()
    const { state } = React.useContext(Createcontext)
    let { id, Name } = props.params;
    const navigate = useRouter()
    const [BrandProduct, SetBrandProduct] = React.useState([])
    const [searchval, Setsearchval] = React.useState("")
    const [BrandDetails, GetBrandDetails] = React.useState([])

    // React.useEffect(() => {
    //     if (searchval?.length !== 0) {
    //         const getData = setTimeout(() => {
    //             Axios.post(`https://api.cannabaze.com/UserPanel/SearchProductbyBrand/`, {
    //                 "brand": id,
    //                 "search": searchval,
    //             }).then((response) => {
    //                 SetBrandProduct(response.data);
    //             });
    //         }, 1000)

    //         return () => clearTimeout(getData)
    //     } 
    // }, [searchval])

    return (
      <div className="container pt-3">
            {state.permission && <Currentlocation></Currentlocation>}
            <BrandDetailsSeo brandname={props.params.brand[0].name.toLowerCase()} location={asPath} image={props.params.brand[0].Brand_Logo}></BrandDetailsSeo>
            <RelatedVerifyBanner BrandDetails={props.params.brand[0]} />
            <div className="row  center mx-0 mt-4 mb-4">
                <div className="col-md-9">
                    <div> 
                         {/* <SearchBar style={{ background: "#FFFFF", border: "1px solid #31B665" }}

                        value={searchval} onChange={(e) => { Setsearchval(e) }}
                        className={classes.strainTypSearchBar}
                        width={"100%"} placeholder="Search Menu"
                        closeIcon={<button onClick={() => Setsearchval("")}>clear</button>}
                    /> */}
                    </div>
                </div>

            </div>
            <ProductSearchResult RelatedProductResult={props.params.product} />
        </div>
    )  
}
RelatedVerifyBrand.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
export async function getServerSideProps(context) {

    let product = []
    let brand = []
    try {
        const brandresponse = await (await fetch(`https://api.cannabaze.com/UserPanel/Get-BrandById/${context.params.id}`)).json();
        if (modifystr(context.params.name) === modifystr(brandresponse[0].name) && parseInt(brandresponse[0].id) === parseInt(context.params.id)) {
            brand =  brandresponse
            const response = await fetch(`https://api.cannabaze.com/UserPanel/Get-ProductbyBrand/${context.params.id}`);
            if (response.ok) {
                product = await response.json();
            } else {
                product =  []
            }
        }
        else {
            return {
                notFound: true, // Redirect to 404 if no data found
            };
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return {
        props: {
            params: {
                id: context.params.id,
                Name: context.params.name ,  
                product: product,
                brand:brand
            }
        }
    };
}