import SearchBar from '@mkyy/mui-search-bar';
import * as React from 'react';
import StrainTypeCards from "./StrainTypeCards";
import useStyles from '../../../../Style';
import Createcontext from "../../../../Hooks/Context"
const StrainType = () => {
 const classes=useStyles()
 const { state } = React.useContext(Createcontext)

    const StrainTypeCardArray = [
        { imgUrl: state?.StaticImage.Indica, head1: "Indica" },
        { imgUrl:state?.StaticImage.Hybrid , head1: "Hybrid" },
        { imgUrl:state?.StaticImage.Sativa , head1: "Sativa" },
        { imgUrl: state?.StaticImage.CBD , head1: "CBD" },
        // { imgUrl: "./image/Leafly Promo.png", head1: "Hybrid" },
        // { imgUrl: "./image/Leafly Promo.png", head1: "Sativa" },
    ]
    // React.useEffect(() => {
    //     Axios.post("https://apiv2.cannabaze.com/UserPanel/Get-StrainType/",
    //     {"type":"Indica"})
    //     .then((response)=>{
    //     })
    //     .catch((error)=>{
    //     })
    // }, [])
    return (
        <React.Fragment>
            <div className="row my-3 mx-0 px-0">
                <div className="col-sm-4  px-0">
                    <h2 className="strainType_heading">Strain Type</h2>
                </div>
                <div className="col-sm-8 px-0">
                    <SearchBar style={{ background: "#FFFFF", border: "1px solid #31B665" }}  width={"100%"} className={`${classes.strainTypSearchBar} ${classes.strainTyleRemove}`} placeholder="Serch Strain Type" />

                </div>

            </div>
            <StrainTypeCards ArrayData={StrainTypeCardArray} />
        </React.Fragment>
    )
}
export default StrainType